import CustomDurationDropdown from "./CustomDurationDropdown.tsx";
import OpponentSearch from "./OpponentSearch.tsx";
import Tooltip from "../../../Generic/Tooltip.tsx";
import {FC, useEffect, useState} from "react";
import {IGameInvitation, UserFriend} from "../../../../types.ts";
import {gameDurations, GameDurationType} from "../../../../utils/constants/game.ts";
import useToast, {ToastPositions, ToastType} from "../../../../zustand/toastModalStore.tsx";
import {postFetch} from "../../../../utils/axios/fetcher.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {sendGameInvitation} from "../../../../websockets/socketConnection.ts";

interface CreateGameTab {
   setCurrentTab: (tab: 'create game' | 'waiting' | 'invitations') => void;
   setWaitingInvitation: (invitation: IGameInvitation) => void;
   sentInvitations: IGameInvitation[];
   setSentInvitations: (invitations: IGameInvitation[]) => void;
}

const CreateGameTab: FC<CreateGameTab> = ({
                                             setCurrentTab,
                                             setWaitingInvitation,
                                             sentInvitations,
                                             setSentInvitations
                                          }) => {
   const [chosenOpponent, setChosenOpponent] = useState<UserFriend | null>(null)
   const [selectedGameDuration, setSelectedGameDuration] = useState<GameDurationType>(gameDurations[0])
   const [chosenColor, setChosenColor] = useState<string>('random')
   const {openToast} = useToast();
   const location = useLocation()
   const navigate = useNavigate()
   const gameDurationOnChange = (option: GameDurationType) => {
      setSelectedGameDuration(option)
   }
   const handleSendGameInvitation = () => {
      if (chosenOpponent === null) {
         openToast({
            message: 'Please choose your opponent',
            type: ToastType.ERROR,
            position: ToastPositions.AUTH,
            duration: 3000
         })
         return
      }

      let userColor = '';
      if (chosenColor === 'random') {
         userColor = Math.random() <= 0.5 ? 'white' : 'black'
      } else {
         userColor = chosenColor
      }
      let requestData = {
         senderColor: userColor,
         gameDuration: selectedGameDuration.value.duration,
         gameIncrement: selectedGameDuration.value.increment,
         durationType: selectedGameDuration.type,
         receiverID: chosenOpponent._id,
      }

      postFetch('/game-invitation/invite', requestData).then((data) => {
         sendGameInvitation(data.receiverID)
         openToast({
            message: 'Game invitation has been sent',
            type: ToastType.SUCCESS,
            position: ToastPositions.AUTH,
            duration: 3800
         })
         setWaitingInvitation(data)
         setSentInvitations([...sentInvitations, data])
         setCurrentTab('waiting')
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 1800})
         console.log(error)
      })
   }


   useEffect(() => {
      if (location.state?.gameDuration !== null && location.state?.gameDuration !== undefined) {
         setSelectedGameDuration(location.state?.gameDuration)
      }
   }, []);

   return (
       <>
          <div className={'space-y-7 mb-12 '}>
             {/*Game Duration*/}
             <div className={'flex flex-col gap-2 mt-3 px-3.5 sm:px-5'}>
                <span className={'text-base sm:text-lg font-semibold sm:font-bold'}>Game Duration</span>
                <CustomDurationDropdown selectedGameDuration={selectedGameDuration} onChange={gameDurationOnChange}/>
             </div>

             {/*Opponent from friends*/}
             <div className={'flex flex-col gap-2 mt-4 px-3.5 sm:px-5'}>
                <span className={'text-base sm:text-lg font-semibold sm:font-bold'}>Choose Your Opponent</span>
                <OpponentSearch chosenOpponent={chosenOpponent} setChosenOpponent={setChosenOpponent}/>
             </div>

             {/* Choose Color */}
             <div className={'flex flex-col gap-2 mt-4 px-3.5 sm:px-5'}>
                <span className={'text-base sm:text-lg font-semibold sm:font-bold'}>Choose Your Color</span>
                <div className={'flex gap-3'}>
                   <Tooltip text={'White'} onClick={() => setChosenColor('white')}>
                      <div
                          className={`h-[36px] w-[36px] bg-white rounded-full cursor-pointer hover:outline hover:outline-3 ${chosenColor === 'white' ? 'outline outline-3 outline-primaryGreen' : 'outline-0'} hover:outline-primaryGreen`}/>
                   </Tooltip>
                   <Tooltip text={'Random'} onClick={() => setChosenColor('random')}>
                      <div
                          className={`flex rounded-full cursor-pointer hover:outline hover:outline-3 ${chosenColor === 'random' ? 'outline outline-3 outline-primaryGreen' : 'outline-0'} hover:outline-primaryGreen`}>
                         <div className={`h-[36px] w-[18px] bg-white rounded-l-full`}/>
                         <div className={`h-[36px] w-[18px] bg-black rounded-r-full`}/>
                      </div>
                   </Tooltip>
                   <Tooltip text={'Black'} onClick={() => setChosenColor('black')}>
                      <div
                          className={`h-[36px] w-[36px] bg-black rounded-full cursor-pointer hover:outline hover:outline-3 ${chosenColor === 'black' ? 'outline outline-3 outline-primaryGreen' : 'outline-0'} hover:outline-primaryGreen`}/>
                   </Tooltip>
                </div>
             </div>

          </div>
          <div className={'flex flex-col  gap-4 px-3.5 sm:px-5 mt-auto mb-6'}>
             <button onClick={handleSendGameInvitation}
                     className={'bg-secondaryGreen py-2 text-base px-5 w-full rounded-lg sm:py-2.5 sm:text-lg font-semibold'}>Create
                Game
             </button>
             <Tooltip text={'Train and compete against your own strategic moves.'}
                      onClick={() => navigate('/training')}>
                <button
                    className={'bg-yellow-600 py-2 text-base px-5 w-full rounded-lg sm:py-2.5 sm:text-lg font-semibold'}>Training
                </button>
             </Tooltip>

          </div>
       </>
   );
};

export default CreateGameTab;
