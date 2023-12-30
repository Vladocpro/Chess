import {FC} from "react";
import {UserFriend} from "./FriendType.ts";
import ProfileIcon from "../Generic/ProfileIcon.tsx";
import {Link} from "react-router-dom";

interface TopFriendsProps {
   friends: UserFriend[]
}

const TopFriends: FC<TopFriendsProps> = ({friends}) => {

      if(friends.length === 0 ) {
         return (
             <div className={'bg-primary py-5 px-5 rounded-md'}>
                <span className={'font-bold text-lg py-1'}>Top Friends</span>
                <div className={'flex flex-col mt-3'}>
                   <span>You have no friends</span>
                </div>
             </div>
             )
      }

   return (
       <div className={'bg-primary py-5 px-5 rounded-md'}>
          <span className={'font-bold text-lg py-1'}>Top Friends</span>
          <div className={'flex flex-col mt-3 gap-2'}>
             {friends.slice(0,5).sort((a, b) => b.rating - a.rating).map((friend, index) => (
                 <Link className={'flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer'} to={`/profile/${friend.username}`}>
                  <span className={'w-6'}>#{index+1}</span>
                       <ProfileIcon size={'sm'} withText={true} isMyProfile={false} textValue={friend.username} textStyles={'max-w-[143px] truncate'}/>
                    <span className={'ml-auto'}>{friend.rating}</span>
                 </Link>
             ))}
          </div>
       </div>
   );
};

export default TopFriends;
