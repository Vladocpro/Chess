import {useEffect, useState} from "react";
import Dropdown from "../Generic/Dropdown.tsx";
import {gameDurations, gameDurationType} from "../../utils/constants/game.ts";
import {Link} from "react-router-dom";
import ProfileIcon from "../Generic/ProfileIcon.tsx";
import Tooltip from "../Generic/Tooltip.tsx";
import {IGameInvitation} from "../../types.ts";
import {getFetch} from "../../utils/axios/fetcher.ts";

const CreateGamePanel = () => {
   const [isCreateGameTab, setIsCreateGameTab] = useState<boolean>(true)
   const [isWaitingForOpponent, setIsWaitingForOpponent] = useState<boolean>(false)
   const [gameDurationOption, setGameDurationOption] = useState<gameDurationType>()
   const [gameInvitations, setGameInvitations] = useState<IGameInvitation[]>([])

   const gameDurationOnChange = (option : gameDurationType) => {
   }
   const handleSendGameInvitation = () => {

   }
   const handleUnsendGameInvitation = () => {

   }
   const handleAcceptGameInvitation = () => {

   }
   const handleRejectGameInvitation = () => {

   }

   useEffect(() => {
      getFetch('/game-invitation/getGameInvitations').then((data) => {
         setGameInvitations(data.convertedInvitations)
      }).catch((error) => {
         console.log(error)
      })
      // convertedInvitations
   }, []);

   return (
       <div className={'flex flex-col bg-primary lg:w-[450px] rounded-t-lg ml-8'}>
          <div className={'flex justify-between rounded-t-lg'}>
             <div className={`flex-1 text-center cursor-pointer py-5 rounded-tl-lg ${isCreateGameTab ? 'bg-primary' : 'bg-[#0B1418]'} `} onClick={() => setIsCreateGameTab(true)}>Play</div>
             <div className={`flex-1 text-center cursor-pointer py-5 rounded-tr-lg ${isCreateGameTab ? 'bg-[#0B1418]' : 'bg-primary'}`} onClick={() => setIsCreateGameTab(false)}>Invitations</div>

          </div>

          { isCreateGameTab ? (
              <>


                 {/*Game Duration*/}
                 <div>
                    <Dropdown options={gameDurations} title={location?.state?.gameDurationLabel || '1 min'} onChange={gameDurationOnChange} dropdownStyles={'bg-primaryLight'} svgBox={'left-[100%]'} containerStyles={'bg-primaryLight w-full py-4 px-3'}  />
                    {/*   Custom option*/}
                 </div>

                 {/*Opponent from friends*/}
                 <div>
                    {/*<Dropdown/>*/}
                 </div>

                 {/*I play as white or black*/}
                 <div>
                    {/*<Dropdown/>*/}
                 </div>

                 {/*Game Duration*/}
                 <div>
                    <button className={'bg-primaryGreen'}>Create Game</button>
                    <button className={'bg-primaryGreen'}>Join by link</button>
                 </div>
              </>
          ) : (
              <div className={'flex flex-col mt-3 px-2 gap-3'}>
                 {gameInvitations?.slice(0,8).map((gameInvitation) => (
                     <div className={'flex items-center justify-between gap-3 '} key={gameInvitation.invitationID}>
                        <Link className={'flex items-center gap-2 sm:gap-3'} to={`/profile/${gameInvitation.sender.username}`}>
                           <ProfileIcon  textValue={gameInvitation.sender.username} isMyProfile={false} iconStyles={'w-[2.25rem] h-[2.25rem] text-lg sm:w-[2.5rem] sm:h-[2.5rem] sm:text-xl'}/>
                           <div className={'flex flex-col'}>
                              <span className={'w-[120px] truncate'}>{gameInvitation.sender.username}</span>
                              <span className={'text-sm hidden sm:inline-block'}>{gameInvitation.sender.rating} Elo</span>
                           </div>
                        </Link>
                        <div className={'flex flex-col items-center'}>
                           <span>{gameInvitation.gameDuration} mins</span>
                           <span>Color: {gameInvitation.playerColor}</span>

                        </div>

                        <div className={'flex  gap-4'}>
                           <Tooltip text={'Accept'} onClick={() => handleAccept(invitation)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill='none'  viewBox="0 0 24 24" strokeWidth={2} className="w-7 h-7 rounded-sm cursor-pointer bg-primaryLight stroke-white">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                           </Tooltip>
                           <Tooltip text={'Decline'} onClick={() => handleReject(invitation)}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 cursor-pointer bg-primaryLight stroke-white">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                           </Tooltip>
                        </div>
                     </div>
                 ))}
              </div>
          )}

       </div>
   );
};

export default CreateGamePanel;
