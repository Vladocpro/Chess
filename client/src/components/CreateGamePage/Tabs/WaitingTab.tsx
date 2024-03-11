import {IGameInvitation} from "../../../types.ts";
import {FC, useEffect} from "react";
import GameDuration from "../../GameDuration/GameDuration.tsx";
import {postFetch} from "../../../utils/axios/fetcher.ts";
import useToast, {ToastPositions, ToastType} from "../../../zustand/toastModalStore.tsx";


interface WaitingTabProps {
   waitingInvitation: IGameInvitation;
   sentInvitations: IGameInvitation[];
   setCurrentTab: (tab: 'create game' | 'waiting' | 'invitations') => void;
   setWaitingInvitation: (param: IGameInvitation | null) => void;
   setSentInvitations: (invitations: IGameInvitation[]) => void;
}

const WaitingTab: FC<WaitingTabProps> = ({
                                            waitingInvitation,
                                            sentInvitations,
                                            setWaitingInvitation,
                                            setCurrentTab,
                                            setSentInvitations
                                         }) => {
   const {openToast} = useToast()

   const handleUnsendGameInvitation = () => {
      postFetch('/game-invitation/reject', {invitationID: waitingInvitation?.invitationID}).then((data) => {
         setWaitingInvitation(null)
         setSentInvitations(sentInvitations.filter((currentInvitation) => currentInvitation.invitationID !== data.invitationID))
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 1800})
      })
   }
   useEffect(() => {
      return () => {
         handleUnsendGameInvitation()
      }
   }, [])


   return (
       <div
           className={'flex flex-col self-center w-60 sm:w-80 justify-center my-auto bg-[rgba(0,0,0,0.9)] pt-6 mt-16 sm:mt-auto mb-12 sm:mb-auto animate-pulse hover:animate-none rounded-lg'}>
          <GameDuration type={waitingInvitation?.durationType}
                        iconStyles={'h-[44px] sm:h-[60px] w-[44px] sm:w-[60px]'}
                        labelStyles={'text-base sm:text-lg'} isWithLabel={true} isLabelBottom={true}
                        labelText={`${waitingInvitation?.gameDuration / 60} ${waitingInvitation.gameIncrement > 0 ? `| ${waitingInvitation.gameIncrement}` : ''} ${waitingInvitation?.gameDuration === 60 ? 'min' : 'mins'}`}/>
          <div className={'text-center whitespace-pre-wrap mt-3 text-sm sm:text-base'}>Waiting for opponent{'\n'}to
             accept invitation...
          </div>
          <button className={'py-6'} onClick={() => setCurrentTab('create game')}>Cancel</button>
       </div>
   );
};

export default WaitingTab;
