import {useParams} from "react-router-dom";
import moment from "moment";
import {useEffect, useState} from "react";
import {getFetch, postFetch} from "../../utils/axios/fetcher.ts";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";
import {IGame, IProfileUser, UserFriend} from "../../types.ts";
import GameRow from "../../components/ProfilePage/GameRow.tsx";
import useUser from "../../zustand/userStore.tsx";

const Profile = () => {
   const [profileUser, setProfileUser] = useState<IProfileUser>()
   const [waiting, setWaiting] = useState<boolean>(true)
   const [userDoesNotExist, setUserDoesNotExist] = useState<boolean>(false)
   const {openToast} = useToast()
   const {id} = useParams()
   const user = useUser();


   const handleAddFriend = (user: UserFriend) => {
      postFetch('/friend-invitation/invite', {receiverID: profileUser?.userID})
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

   useEffect(() => {
      getFetch(`/auth/getUserProfile/${id}`).then((response) => {
         setProfileUser(response.userDetails)
         setWaiting(false)
         setUserDoesNotExist(false)
      }).catch((error) => {
         openToast({message: error.response.data, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 2500})
         setWaiting(false)
         setUserDoesNotExist(true)
      })
   }, []);

   console.log(profileUser?.club)

   if (waiting) {
      return null
   }

   if (!waiting && userDoesNotExist) {
      return (
          <div className={'flex justify-center items-center mt-[20%]'}>
             <div className={'flex items-center gap-3 md:gap-5 '}>
                <span className={'text-2xl md:text-5xl text-primaryGreen'}>404 </span>
                <span className={'text-lg md:text-3xl'}>User does not exist</span>
             </div>
          </div>
      )
   }

   return (
       <div className={'flex flex-col gap-5 md:gap-7 lg:gap-8 items-center mt-4 sm:mt-10'}>
          {/* Profile Info */}
          <div className={'flex flex-col bg-primary p-3 md:p-5 rounded-md gap-5 w-[370px] md:w-[730px] lg:w-[900px]'}>
             <div className={'flex w-full items-center gap-2 md:gap-4 lg:gap-6'}>
                <div
                    className={`flex items-center uppercase h-12 md:h-16 lg:h-20 w-12 md:w-16 lg:w-20 text-2xl md:text-4xl lg:text-5xl justify-center bg-primaryLight rounded-full`}>
                   {profileUser?.username[0]}
                </div>
                <div className={'flex flex-col flex-1 gap-3'}>
                   <div className={'flex flex-col gap-0.5'}>
                      <span className={'md:text-2xl lg:text-3xl w-[280px]'}>{profileUser?.username}</span>
                      <span
                          className={'text-sm md:text-base'}>Joined {moment(profileUser?.createdAt).format('ll')}</span>
                   </div>
                </div>
             </div>
             <div className={'grid grid-cols-2 gap-y-2 md:flex justify-between  px-0.5'}>
                <div className={'flex flex-col gap-[3px] items-center'}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        className="w-6 md:w-8 h-6 md:h-8 fill-white">
                      <path
                          d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/>
                   </svg>
                   <div className={'text-sm md:text-base'}>{profileUser?.friends.length} Friends</div>
                </div>

                <div className={'flex flex-col gap-[3px] items-center'}>
                   <img className={'w-6 md:w-8 h-6 md:h-8 '} src={'/board.png'}
                        alt={'chess club'}/>
                   <span className={'text-sm md:text-base'}>{profileUser?.gameHistory.length} Games</span>
                </div>

                <div className={'flex flex-col gap-[3px] items-center'}>
                   <img className={'w-6 md:w-8 h-6 md:h-8 '} src={'/score.png'}
                        alt={'chess club'}/>
                   <span className={'text-sm md:text-base'}>{profileUser?.rating} Rating</span>
                </div>

                <div className={'flex flex-col gap-[3px] items-center'}>
                   <img className={'w-6 md:w-8 h-6 md:h-8 '} src={'/club.png'}
                        alt={'chess club'}/>
                   <div
                       className={'text-sm md:text-base'}>{profileUser?.club !== undefined ? profileUser?.club : 'No Club'}</div>
                </div>
             </div>

             {/* Buttons */}
             <div className={'flex gap-5'}>
                {
                   user.friends.some(friend => friend._id === profileUser?.userID) ? (
                       <div
                           className={'flex gap-3 w-full bg-primaryLight hover:bg-red-700 transition-all duration-300 py-3 px-4 cursor-pointer rounded-lg'}>
                          <img src={'/friend-remove.png'} alt={'friend-remove'}
                               className={'h-5 w-5 md:h-7 md:w-7'}/>
                          <button className={'text-sm md:text-lg'}>Remove Friend</button>
                       </div>

                   ) : (
                       <div
                           className={'flex gap-3 w-full bg-primaryLight hover:bg-secondaryGreen transition-all duration-300 py-3 px-4 cursor-pointer rounded-lg'}>
                          <img src={'/friend-add.png'} alt={'friend-add'} className={'h-5 w-5 md:h-7 md:w-7'}/>
                          <button className={'text-sm md:text-lg'}>Add Friend</button>
                       </div>
                   )
                }

                <div
                    className={'flex gap-3 w-full bg-primaryLight hover:bg-secondaryGreen transition-all duration-300 py-3 px-4 cursor-pointer rounded-lg'}
                    onClick={() => navigate('/create-game', {state: {gameOpponent: friend}})}>
                   <img src={'/chess-invite.png'} alt={'chess-invite'}
                        className={'h-5 w-5 md:h-7 md:w-7'}/>
                   <button className={'text-sm md:text-lg'}>Challenge</button>
                </div>
             </div>
          </div>

          {/* Game History */}
          <div>
             <div
                 className={'flex px-3 lg:px-5 py-2.5 md:py-3.5 rounded-t-md w-[370px] md:w-[730px] lg:w-[900px] bg-primaryLight'}>
                <span className={'hidden md:inline-block text-sm md:text-base w-[65px] text-center'}>Duration</span>
                <span
                    className={'text-sm md:text-base ml-[59px] md:ml-[74px] lg:ml-28 md:w-[183px] lg:w-[200px]'}>Players</span>
                <span className={'hidden md:inline-block ml-[20px] lg:ml-[66px] w-[55px] text-center'}>Results</span>
                <span className={'hidden md:inline-block ml-[70px] lg:ml-20 w-[50px]'}>Moves</span>
                <span className={'text-sm md:text-base ml-auto w-[105px] lg:w-[117px] text-center'}>Date</span>
             </div>
             <div className={'flex flex-col bg-primary rounded-b-md w-[370px] md:w-[730px] lg:w-[900px]'}>
                {
                   profileUser?.gameHistory.map((game: IGame) => (
                           <GameRow game={game} profileUser={profileUser}/>
                       )
                   )
                }
             </div>
          </div>
       </div>
   );
};

export default Profile;
