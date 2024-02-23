import {Link} from "react-router-dom";
import ProfileIcon from "../Generic/ProfileIcon.tsx";
import moment from "moment/moment";
import {FC} from "react";
import Tooltip from "../Generic/Tooltip.tsx";
import {FriendInvitation} from "../../types.ts";


interface MobileInvitationsProps {
   invitations: FriendInvitation[];
   handleAccept: (invitation: FriendInvitation) => void;
   handleReject: (invitation: FriendInvitation) => void;
}

const MobileInvitations: FC<MobileInvitationsProps> = ({invitations, handleAccept, handleReject}) => {

   if (invitations.length === 0) {
      return null
   }

   return (
       <div className={'lg:hidden'}>
          <div className={'flex items-center gap-3 sm:gap-5 mb-1 '}>
             <span className={'font-bold text-base sm:text-xl py-2'}>Friend Invitations</span>
             <span className={'bg-input rounded-md  text-sm sm:text-base px-1'}>{invitations.length} </span>
          </div>
          <div className={'flex flex-col gap-3'}>
             {invitations?.map((invitation) => (
                 <div className={'flex items-center justify-between gap-5'} key={invitation._id}>
                    <Link className={'flex flex-[1] items-center gap-2 sm:gap-5'}
                          to={`/profile/${invitation.sender._id}`}>
                       <ProfileIcon size={'lg'} textValue={invitation.sender.username} isMyProfile={false}
                                    iconStyles={'w-[36px] h-[36px] text-lg sm:w-[64px] sm:h-[64px] sm:text-3xl'}/>
                       <div className={'flex flex-col'}>
                          <span>{invitation.sender.username}</span>
                          <span
                              className={'text-sm hidden sm:inline-block'}>Joined {moment(invitation.sender.createdAt).format('ll')}</span>
                       </div>
                    </Link>

                    <div className={'flex gap-4'}>
                       <Tooltip text={'Accept'} onClick={() => handleAccept(invitation)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth={2}
                               className="w-7 h-7 rounded-sm cursor-pointer bg-primaryLight stroke-white">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                          </svg>
                       </Tooltip>
                       <Tooltip text={'Decline'} onClick={() => handleReject(invitation)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                               stroke="currentColor" className="w-7 h-7 cursor-pointer bg-primaryLight stroke-white">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                          </svg>
                       </Tooltip>

                    </div>
                 </div>
             ))}
          </div>
       </div>
   );
};

export default MobileInvitations;
