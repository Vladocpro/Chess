import {Link, useNavigate} from "react-router-dom";
import ProfileIcon from "../../Generic/ProfileIcon.tsx";
import Tooltip from "../../Generic/Tooltip.tsx";
import {IGameInvitation} from "../../../types.ts";
import { postFetch} from "../../../utils/axios/fetcher.ts";
import useToast, {ToastPositions, ToastType} from "../../../zustand/toastModalStore.tsx";
import {FC} from "react";


interface InvitationTabProps {
   sentInvitations: IGameInvitation[];
   receivedInvitations: IGameInvitation[];
   setReceivedInvitations: (inivtations : IGameInvitation[]) => void;
   setSentInvitations: (inivtations : IGameInvitation[]) => void;
}

const InvitationTab:FC<InvitationTabProps> = ({sentInvitations, receivedInvitations, setSentInvitations, setReceivedInvitations}) => {
   const navigate = useNavigate()
   const {openToast} = useToast()


   const handleAcceptGameInvitation = (invitation : IGameInvitation) => {
      postFetch('/game-invitation/accept', {invitationID: invitation.invitationID}).then((data) => {
         navigate(`/play/${data.gameID}`)
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 1800})
      })
   }
   const handleRejectGameInvitation = (category: string, invitation : IGameInvitation) => {
      postFetch('/game-invitation/reject', {invitationID: invitation.invitationID}).then((data) => {
         if(category === 'received') {
            setReceivedInvitations(receivedInvitations.filter((currentInvitation) => currentInvitation.invitationID !== data.invitationID))
         } else {
            setSentInvitations(sentInvitations.filter((currentInvitation) => currentInvitation.invitationID !== data.invitationID))
         }
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 1800})

      })
   }

   const handleUnsendGameInvitation = (category: string, invitation : IGameInvitation) => {
      postFetch('/game-invitation/reject', {invitationID: invitation.invitationID}).then((data) => {
         if(category === 'received') {
            setReceivedInvitations(receivedInvitations.filter((currentInvitation) => currentInvitation.invitationID !== data.invitationID))
         } else {
            setSentInvitations(sentInvitations.filter((currentInvitation) => currentInvitation.invitationID !== data.invitationID))
         }
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 1800})

      })
   }



   if(sentInvitations?.length === 0 && receivedInvitations?.length === 0) {
      return (
          <div className={'flex flex-col flex-1 justify-center items-center'}>
             <span className={'text-lg font-bold'}>You Have No Invitations</span>
          </div>
      )
   }
   console.log(sentInvitations)
   return (
       <div className={'flex flex-col mt-3 px-3.5 sm:px-5 gap-3'}>
          <div className={`${sentInvitations.length > 0  ? 'flex' : 'hidden'} flex-col gap-2`}>
             <span className={'text-base sm:text-lg font-semibold sm:font-bold'}>Sent Invitations</span>
             {sentInvitations?.map((gameInvitation) => (
                 <div className={'flex items-center justify-between gap-3 '} key={gameInvitation?.invitationID}>
                    <Link className={'flex items-center gap-2 sm:gap-3'} to={`/profile/${gameInvitation?.receiver?.username}`}>
                       <ProfileIcon  textValue={gameInvitation?.receiver?.username} isMyProfile={false} iconStyles={'w-[2.25rem] h-[2.25rem] text-lg sm:w-[2.5rem] sm:h-[2.5rem] sm:text-xl'}/>
                       <div className={'flex flex-col'}>
                          <span className={'w-[120px] truncate'}>{gameInvitation?.receiver?.username}</span>
                          <span className={'text-sm hidden sm:inline-block'}>{gameInvitation?.receiver?.rating} Elo</span>
                       </div>
                    </Link>
                    <div className={'hidden sm:flex flex-col items-center'}>
                       <span>{`${gameInvitation?.gameDuration / 60} ${gameInvitation.gameIncrement > 0 ? `| ${gameInvitation.gameIncrement}` : ''} ${gameInvitation?.gameDuration === 60 ? 'min' : 'mins'}`}</span>
                       <span className={'capitalize'}>Play As {gameInvitation?.playerColor}</span>
                    </div>
                    <div className={'flex gap-5'}>
                       <div className={'w-8 h-8'}>
                       </div>
                       <Tooltip text={'Unsend Invitation'} onClick={() => handleUnsendGameInvitation('sent',gameInvitation)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 cursor-pointer bg-primaryLight stroke-white">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                       </Tooltip>
                    </div>
                 </div>
             ))}
          </div>


                 <div className={`${receivedInvitations.length > 0  ? 'flex' : 'hidden'} flex-col gap-2 mt-3`}>
                    <span className={'text-base sm:text-lg font-semibold sm:font-bold'}>Received Invitations</span>
                    {receivedInvitations?.map((gameInvitation) => (
                        <div className={'flex items-center justify-between gap-3 '} key={gameInvitation?.invitationID}>
                           <Link className={'flex items-center gap-2 sm:gap-3'} to={`/profile/${gameInvitation?.sender?.username}`}>
                              <ProfileIcon  textValue={gameInvitation?.sender?.username} isMyProfile={false} iconStyles={'w-[2.25rem] h-[2.25rem] text-lg sm:w-[2.5rem] sm:h-[2.5rem] sm:text-xl'}/>
                              <div className={'flex flex-col'}>
                                 <span className={'w-[120px] truncate'}>{gameInvitation?.sender?.username}</span>
                                 <span className={'text-sm hidden sm:inline-block'}>{gameInvitation?.sender?.rating} Elo</span>
                              </div>
                           </Link>
                           <div className={'hidden sm:flex flex-col items-center'}>
                              <span>{`${gameInvitation?.gameDuration / 60} ${gameInvitation.gameIncrement > 0 ? `| ${gameInvitation.gameIncrement}`: ''} ${gameInvitation?.gameDuration === 60 ? 'min' : 'mins'}`}</span>
                              <span className={'capitalize'}>Play As {gameInvitation?.playerColor}</span>

                           </div>

                           <div className={'flex  gap-5'}>
                              <Tooltip text={'Accept Invitation'} onClick={() => handleAcceptGameInvitation(gameInvitation)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill='none'  viewBox="0 0 24 24" strokeWidth={2} className="w-8 h-8 rounded-sm cursor-pointer bg-primaryLight stroke-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                 </svg>
                              </Tooltip>
                              <Tooltip text={'Decline Invitation'} onClick={() => handleRejectGameInvitation('received',gameInvitation)}>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 cursor-pointer bg-primaryLight stroke-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                 </svg>
                              </Tooltip>
                           </div>
                        </div>
                    ))}
                 </div>

       </div>
   );
};

export default InvitationTab;
