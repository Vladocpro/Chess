import useUser from "../../zustand/userStore.tsx";
import {useEffect, useState} from "react";
import debounce from "lodash.debounce"
import ProfileIcon from "../../components/Generic/ProfileIcon.tsx";
import TopFriends from "../../components/FriendsPage/TopFriends.tsx";
import moment from "moment";
import Tooltip from "../../components/Generic/Tooltip.tsx";
import {getFetch, postFetch} from "../../utils/axios/fetcher.ts";
import {Link, useNavigate} from "react-router-dom";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";
import FriendInvitations from "../../components/FriendsPage/Friendinvitations.tsx";
import MobileInvitations from "../../components/FriendsPage/MobileInvitations.tsx";
import SearchInput from "../../components/Generic/SearchInput.tsx";
import {FriendInvitation, UserFriend} from "../../types.ts";

const Friends = () => {
   const user = useUser()
   const {openToast} = useToast();
   const [searchValue, setSearchValue] = useState<string>("")
   const [filteredFriends, setFilteredFriends] = useState<UserFriend[] | []>([])
   const [users, setUsers] = useState<UserFriend[] | []>([])
   const [invitations, setInvitations] = useState<FriendInvitation[] | []>([])
   const navigate = useNavigate()

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
             openToast({
                message: error.response.data,
                type: ToastType.WARNING,
                position: ToastPositions.AUTH,
                duration: 3000
             })
          })
   }

   const handleRemoveFriend = (paramUser: UserFriend) => {
      postFetch('/friend-invitation/remove', {friendID: paramUser._id})
          .then((response) => {
             user.setFriends(user.friends.filter((friend) => friend._id !== paramUser._id))
             openToast({message: response, type: ToastType.SUCCESS, position: ToastPositions.AUTH, duration: 3000})
          })
          .catch((error) => {
             openToast({
                message: error.response.data,
                type: ToastType.WARNING,
                position: ToastPositions.AUTH,
                duration: 3000
             })
          })
   }
   const handleAcceptFriendInvitation = (invitation: FriendInvitation) => {
      postFetch('/friend-invitation/accept', {invitationID: invitation._id})
          .then((response) => {
             user.setFriends([...user.friends, invitation.sender])
             setInvitations(invitations.filter((friendInvitation) => friendInvitation._id !== invitation._id));
             openToast({message: response, type: ToastType.SUCCESS, position: ToastPositions.AUTH, duration: 3000})
          })
          .catch((error) => {
             openToast({
                message: error.response.data,
                type: ToastType.WARNING,
                position: ToastPositions.AUTH,
                duration: 3000
             })
          })
   }
   const handleRejectFriendInvitation = (invitation: FriendInvitation) => {
      postFetch('/friend-invitation/reject', {invitationID: invitation._id})
          .then((response) => {
             setInvitations(invitations.filter((friendInvitation) => friendInvitation._id !== invitation._id));
             openToast({message: response, type: ToastType.SUCCESS, position: ToastPositions.AUTH, duration: 3000})
          })
          .catch((error) => {
             openToast({
                message: error.response.data,
                type: ToastType.WARNING,
                position: ToastPositions.AUTH,
                duration: 3000
             })
          })
   }


   useEffect(() => {
      if (searchValue === '') {
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
      if (user.userID !== '') {
         setFilteredFriends(user.friends)
      }
   }, [user.friends]);

   // console.log(user)
   useEffect(() => {
      getFetch('/auth/getUser').then((response) => {
         user.setUser(response.userDetails)
      }).catch((error) => {
         console.log(error)
      })
      getFetch('/friend-invitation/getUserInvitations')
          .then((response) => {
             setInvitations(response.convertedInvitations)
          })
          .catch((error) => {
             console.log(error)
          })
   }, []);

   if (user.username === '') {
      return null
   }

   return (
       <div className={'flex gap-6 justify-center mt-0 sm:mt-10'}>
          <div className={'bg-primary py-5 px-5 rounded-md flex-[2] max-w-[900px]'}>
             {/* Search */}
             <SearchInput onSearch={handleChange} placeholder={'Search by username'}/>

             <div className={'flex flex-col mt-6'}>
                {/* Invitations List */}
                <MobileInvitations invitations={invitations} handleAccept={handleAcceptFriendInvitation}
                                   handleReject={handleRejectFriendInvitation}/>

                {/* Friend List  */}
                <div>
                   <div className={'flex items-center gap-3 sm:gap-5 mb-1 '}>
                      <span className={'font-bold text-base sm:text-xl py-2'}>Friends</span>
                      <span className={'bg-input rounded-md text-sm sm:text-base px-1'}>{filteredFriends.length} </span>
                   </div>
                   <div className={'flex flex-col gap-3'}>
                      {filteredFriends?.slice(0, 5).map((friend) => (
                          <div className={'flex items-center justify-between gap-5'} key={friend._id}>
                             <Link className={'flex flex-[1] items-center gap-2 sm:gap-5'}
                                   to={`/profile/${friend._id}`}>
                                <ProfileIcon textValue={friend.username} isMyProfile={false}
                                             iconStyles={'w-[36px] h-[36px] text-lg sm:w-[64px] sm:h-[64px] sm:text-3xl'}/>
                                <div className={'flex flex-col'}>
                                   <span>{friend.username}</span>
                                   <span
                                       className={'text-sm hidden sm:inline-block'}>Joined {moment(friend.createdAt).format('ll')}</span>
                                </div>
                             </Link>

                             <div className={'flex  gap-4'}>
                                <Tooltip text={'Remove Friend'} onClick={() => handleRemoveFriend(friend)}>
                                   <img src={'/friend-remove.png'} alt={'friend-remove'}
                                        className={'cursor-pointer h-7 w-7 sm:h-9 sm:w-9'}/>
                                </Tooltip>
                                <Tooltip text={'Challenge'}
                                         onClick={() => navigate('/create-game', {state: {gameOpponent: friend}})}>
                                   <img src={'/chess-invite.png'} alt={'chess-invite'}
                                        className={'cursor-pointer h-7 w-7 sm:h-9 sm:w-9'}/>
                                </Tooltip>
                             </div>
                          </div>
                      ))}
                   </div>
                </div>

                {/* Suggested List  */}
                <div className={'flex flex-col mt-2'}>
                   <div className={'flex items-center gap-3 sm:gap-5 mb-1'}>
                      <span className={'font-bold text-base sm:text-xl py-2'}>Suggested</span>
                      <span className={'bg-input rounded-md text-sm sm:text-base px-1'}>{users.length} </span>
                   </div>
                   <div className={'flex flex-col gap-3'}>
                      {users?.map((currentUser) => (
                          <div className={'flex items-center justify-between gap-5'} key={currentUser._id}>
                             <Link className={'flex flex-[1] items-center gap-2 sm:gap-5'}
                                   to={`/profile/${currentUser._id}`}>
                                <ProfileIcon withText={false} textValue={currentUser.username} isMyProfile={false}
                                             iconStyles={'w-[36px] h-[36px] text-lg sm:w-[64px] sm:h-[64px] sm:text-3xl'}/>
                                <div className={'flex flex-col'}>
                                   <span>{currentUser.username}</span>
                                   <span
                                       className={'text-sm hidden sm:inline-block'}>Joined {moment(currentUser.createdAt).format('ll')}</span>
                                </div>
                             </Link>
                             <div className={'flex gap-3'}>
                                <Tooltip text={'Add Friend'} onClick={() => handleAddFriend(currentUser)}>
                                   <img src={'/friend-add.png'} alt={'friend-add'}
                                        className={'cursor-pointer h-7 w-7 sm:h-9 sm:w-9'}/>
                                </Tooltip>
                                <Tooltip text={'Challenge'}
                                         onClick={() => navigate('/create-game', {state: {gameOpponent: currentUser}})}>
                                   <img src={'/chess-invite.png'} alt={'chess-invite'}
                                        className={'cursor-pointer h-7 w-7 sm:h-9 sm:w-9'}/>
                                </Tooltip>

                             </div>
                          </div>
                      ))}
                   </div>
                </div>
             </div>


          </div>

          <div className={'hidden lg:flex flex-col gap-6 flex-[1] max-w-[300px]'}>

             <TopFriends friends={user.friends}/>
             <FriendInvitations invitations={invitations} handleAccept={handleAcceptFriendInvitation}
                                handleReject={handleRejectFriendInvitation}/>
          </div>
       </div>
   );
};

export default Friends;
