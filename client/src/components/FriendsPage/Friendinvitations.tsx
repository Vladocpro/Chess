import {FC} from "react";
import {Link} from "react-router-dom";
import {FriendInvitation} from "./FriendType.ts";

interface TopFriendsProps {
   invitations: FriendInvitation[];
   handleAccept: (invitation: FriendInvitation) => void;
   handleReject: (invitation: FriendInvitation) => void;
}

const FriendInvitations: FC<TopFriendsProps> = ({invitations, handleAccept, handleReject}) => {

      if(invitations.length === 0 ) {
         return (
             <div className={'bg-primary py-5 px-5 rounded-md'}>
                <span className={'font-bold text-lg py-1'}>Friend Invitations</span>
                <div className={'flex flex-col mt-3'}>
                   <span>You have no invitations</span>
                </div>
             </div>
             )
      }

   return (
       <div className={'bg-primary py-5 px-5 rounded-md'}>
          <span className={'font-bold text-lg py-1'}>Friend Invitations</span>
          <div className={'flex flex-col mt-3 gap-2'}>
             {invitations.map((invitation) => (
                 <div className={'flex items-center justify-between text-gray-300 gap-2'}>
                  <Link to={`/profile/${invitation.sender.username}`} className={'max-w-[165px] truncate'}>{invitation.sender.username}</Link>
                    <div className={'flex gap-4'}>
                       <svg xmlns="http://www.w3.org/2000/svg" fill='none' onClick={() => handleAccept(invitation)}  viewBox="0 0 24 24" strokeWidth={2} className="w-7 h-7 rounded-sm cursor-pointer bg-primaryGreen stroke-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                       </svg>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={() => handleReject(invitation)} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 cursor-pointer bg-red-500 stroke-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                       </svg>
                    </div>

                 </div>
             ))}
          </div>
       </div>
   );
};

export default FriendInvitations;
