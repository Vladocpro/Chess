import useUser from "../../zustand/userStore.tsx";
import {useEffect, useState} from "react";
import debounce from "lodash.debounce"
import ProfileIcon from "../../components/Generic/ProfileIcon.tsx";
import TopFriends from "../../components/FriendsPage/TopFriends.tsx";
import moment from "moment";
import Tooltip from "../../components/Generic/Tooltip.tsx";
import {getFetch, postFetch} from "../../utils/axios/fetcher.ts";
import {FriendInvitation, UserFriend} from "../../components/FriendsPage/FriendType.ts";
import {Link} from "react-router-dom";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";
import FriendInvitations from "../../components/FriendsPage/Friendinvitations.tsx";

const Friends = () => {
   const user = useUser()
   const {openToast} = useToast();
   const [searchValue, setSearchValue] = useState<string>("")
   const [filteredFriends, setFilteredFriends] = useState<UserFriend[] | []>([])
   const [users, setUsers] = useState<UserFriend[] | []>([])
   const [invitations, setInvitations] = useState<FriendInvitation[] | []>([])


   const debouncedSearch = debounce((text) => {
      setSearchValue(text);
   }, 500);

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      debouncedSearch(e.target.value);
   }

   const handleAddFriend = (user: UserFriend) => {
      postFetch('/friend-invitation/invite', {receiverID: user._id})
          .then((response) => {
               openToast({message: response, type: ToastType.SUCCESS, position: ToastPositions.AUTH, duration: 3000})
          })
          .catch((error) => {
             openToast({message: error.response.data, type: ToastType.WARNING, position: ToastPositions.AUTH, duration: 3000})
          })
   }

   const handleRemoveFriend = (user: UserFriend) => {
      console.log(user)
   }
   const handleAcceptFriendInvitation = (invitation: FriendInvitation) => {
      console.log(invitation)
   }
   const handleRejectFriendInvitation = (invitation: FriendInvitation) => {
      postFetch('/friend-invitation/reject', {invitationID: invitation._id})
          .then((response) => {
             setInvitations(invitations.filter((friendInvitation) => friendInvitation._id !== invitation._id));
             openToast({message: response, type: ToastType.SUCCESS, position: ToastPositions.AUTH, duration: 3000})
          })
          .catch((error) => {
             openToast({message: error.response.data, type: ToastType.WARNING, position: ToastPositions.AUTH, duration: 3000})
          })
   }



   useEffect(() => {
      if(searchValue === '') {
         setFilteredFriends(user.friends);
         setUsers([])
      } else {
         postFetch('/friend-invitation/find', {searchedName: searchValue})
             .then((response) => {
                setFilteredFriends(response.friends)
                setUsers(response.users)
             })
             .catch((error) => {
                console.log(error)
             })
      }
   }, [searchValue]);


   useEffect(() => {
      setFilteredFriends(user.friends)
      if(user.userID !== '') {
         setFilteredFriends(user.friends)
      }
   }, [user.friends]);

   useEffect(() => {
      getFetch('/friend-invitation/getUserInvitations')
      .then((response) => {
         console.log(response.convertedInvitations)
         setInvitations(response.convertedInvitations)
      })
      .catch((error) => {
         console.log(error)
      })
   }, []);

   if(user.username === '') {
      return  null
   }

   return (
       <div className={'flex gap-6 justify-center'}>
          <div className={'bg-primary py-5 px-5 rounded-md flex-[2] max-w-[900px]'}>
             {/* Search */}
             <div className="relative mb-6">
                <svg aria-hidden="true" className="absolute left-2 top-3"  viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                   <path className={'stroke-[#ffffffd9]'} strokeWidth="2"
                         d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"></path>
                </svg>
                <input  type="text" onChange={(e) => handleChange(e)} className=" bg-input w-full  outline-none outline-offset-0 focus:outline-primaryGreen text-[#ffffffd9] placeholder-[#ffffff80]  pl-10 pr-5  py-3 rounded-lg mr-10 " placeholder="Search by username"/>
             </div>

             {/* Friend List  */}
             <div className={'flex flex-col'}>
                <div className={'flex items-center gap-5 mb-1'}>
                   <span className={'font-bold text-xl py-2'}>Friends</span>
                   <span className={'bg-input rounded-md text-base px-1'}>{filteredFriends.length} </span>
                </div>
                <div className={'flex flex-col gap-3'}>
                   {filteredFriends?.slice(0,5).map((friend) => (
                       <div className={'flex items-center justify-between gap-5'}>
                          <Link className={'flex flex-[1] items-center gap-5'} to={`/profile/${friend.username}`}>
                             <ProfileIcon size={'lg'} textValue={friend.username} isMyProfile={false} />
                             <div className={'flex flex-col'}>
                                <span>{friend.username}</span>
                                <span className={'text-sm'}>Joined {moment(friend.createdAt).format('ll')}</span>
                             </div>
                          </Link>

                          <div className={'flex gap-3'}>
                             <Tooltip text={'Challenge'}>
                                <img src={'chess-invite.png'} alt={'chess-invite'} height={28} width={28} className={'cursor-pointer'} />
                             </Tooltip>
                             <Tooltip text={'Remove Friend'} onClick={() => handleRemoveFriend(friend)}>
                                <img src={'friend-remove.png'} alt={'friend-remove'} height={28} width={28} className={'cursor-pointer'} />
                             </Tooltip>
                          </div>
                       </div>
                   ))}
                </div>
             </div>

             {/* Suggested List  */}
             <div className={'flex flex-col mt-2'}>
                <div className={'flex items-center gap-5 mb-1'}>
                   <span className={'font-bold text-xl py-2'}>Suggested</span>
                   <span className={'bg-input rounded-md text-base px-1'}>{users.length} </span>
                </div>
                <div className={'flex flex-col gap-3'}>
                   {users?.map((friend) => (
                       <div className={'flex items-center justify-between gap-5'} >
                          <Link className={'flex flex-[1] items-center gap-5'} to={`/profile/${friend.username}`}>
                             <ProfileIcon size={'lg'} withText={true} textValue={friend.username} isMyProfile={false} />
                             <div className={'flex flex-col'}>
                                <span>{friend.username}</span>
                                <span className={'text-sm'}>Joined {moment(friend.createdAt).format('ll')}</span>
                             </div>
                          </Link>
                          <div className={'flex gap-3'}>
                             <Tooltip text={'Challenge'}>
                                <img src={'chess-invite.png'} alt={'chess-invite'} height={28} width={28} className={'cursor-pointer'} />
                             </Tooltip>
                             <Tooltip text={'Add Friend'} onClick={() => handleAddFriend(friend)}>
                                <img src={'friend-add.png'} alt={'friend-add'} height={28} width={28} className={'cursor-pointer'} />
                             </Tooltip>
                          </div>
                       </div>
                   ))}
                </div>
             </div>
          </div>

          <div className={'flex flex-col gap-6 flex-[1] max-w-[300px]'}>

             <TopFriends friends={user.friends}/>
             <FriendInvitations invitations={invitations} handleAccept={handleAcceptFriendInvitation} handleReject={handleRejectFriendInvitation}/>
          </div>
       </div>
   );
};

export default Friends;
