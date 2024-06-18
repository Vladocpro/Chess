import {Link} from "react-router-dom";
import ProfileIcon from "../Generic/ProfileIcon.tsx";
import Divider from "../Generic/Divider.tsx";
import {UserFriend} from "../../types.ts";
import {FC} from "react";

interface FriendListProps {
   friends: UserFriend[];
}

const FriendList: FC<FriendListProps> = ({friends}) => {

   if (friends.length === 0) {
      return (
          <Link to={'/friends'} className={'text-primaryGreen hover:underline pl-3 cursor-pointer'}>
             Fancy making new friend?
          </Link>
      )
   }

   if (friends.length === 1) {
      return (
          <div className={'flex flex-col rounded-md'}>
             <Link to={`/profile/${friends[0]._id}`}
                   className={`flex bg-primary  pl-3`}>
                <ProfileIcon size={'md'} withText={true} isMyProfile={false}
                             textValue={friends[0].username}/>
             </Link>
          </div>
      )
   }

   return (
       <div className={'flex flex-col rounded-md'}>
          {
             friends?.slice(0, 5).map((currentFriend, index) => {
                const roundedStyles = (): string => {
                   if (index === 0) return 'rounded-t-md'
                   if (index === friends.length - 1) return 'rounded-b-md pb-0'
                   return ''
                }
                return (
                    <div className={'overflow-x-hidden group'}>
                       <Link to={`/profile/${currentFriend._id}`}
                             className={`flex bg-primary py-1.5 pl-3 ${roundedStyles()}`}>
                          <ProfileIcon size={'md'} withText={true} isMyProfile={false}
                                       textValue={currentFriend.username} textStyles={'transition-all duration-300 group-hover:underline group-hover:text-primaryGreen'}/>
                       </Link>
                       {
                          index === friends.length - 1 ? null : (
                              <Divider styles={'h-[1.5px] w-full bg-primaryGreen'}/>
                          )
                       }
                    </div>
                )
             })
          }
       </div>
   );
};

export default FriendList;
