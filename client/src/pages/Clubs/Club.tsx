import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFetch, postFetch} from "../../utils/axios/fetcher.ts";
import {IClub} from "../../types.ts";
import moment from "moment/moment";
import userStore from "../../zustand/userStore.tsx";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";
import ProfileIcon from "../../components/Generic/ProfileIcon.tsx";
import Tooltip from "../../components/Generic/Tooltip.tsx";

const Club = () => {

   const [club, setClub] = useState<IClub>()
   const [waiting, setWaiting] = useState<boolean>(true)
   const [clubDoesNotExist, setClubDoesNotExist] = useState<boolean>(false)
   const user = userStore()
   const {openToast} = useToast()
   const {id} = useParams()
   const navigate = useNavigate()


   const handleLeaveClub = () => {
      postFetch(`/clubs/leave`, {clubID: id})
          .then((response) => {
             user.setClub(null)
             setClub(response.currentClub)
             openToast({
                message: response.message,
                type: ToastType.SUCCESS,
                position: ToastPositions.AUTH,
                duration: 2500
             })
          })
          .catch((error) => {
             console.log(error)
          })
   }

   const handleJoinClub = () => {
      postFetch(`/clubs/join`, {clubID: id})
          .then((response) => {
             setClub(response.currentClub)
             user.setClub(response.userClub)
             openToast({
                message: response.message,
                type: ToastType.SUCCESS,
                position: ToastPositions.AUTH,
                duration: 1000
             })
          })
          .catch((error) => {
             console.log(error)
          })
   }

   useEffect(() => {
      getFetch(`/clubs/get/${id}`)
          .then((response) => {
             setClub(response.club)
             setWaiting(false)
             setClubDoesNotExist(false)
          })
          .catch((error) => {
             console.log(error)
             openToast({
                message: error.response?.data,
                type: ToastType.ERROR,
                position: ToastPositions.AUTH,
                duration: 3500
             })
             setWaiting(false)
             setClubDoesNotExist(true)
          })
   }, []);

   if (waiting) {
      return null
   }

   if (!waiting && clubDoesNotExist) {
      return (
          <div className={'flex justify-center items-center mt-[20%]'}>
             <div className={'flex items-center gap-3 md:gap-5 '}>
                <span className={'text-2xl md:text-5xl text-primaryGreen'}>404 </span>
                <span className={'text-lg md:text-3xl'}>Club does not exist</span>
             </div>
          </div>
      )
   }

   return (
       <div className={'flex flex-col gap-6 items-center mt-0 sm:mt-10'}>
          {/* Club Info */}
          <div className={'bg-primary p-5 rounded-md gap-5 flex-[2] max-w-[900px]'}>
             <div className={'flex flex-col'}>
                <div className={'flex gap-5'}>
                   <img className={'w-[36px] h-[36px] sm:w-[80px] sm:h-[80px] '} src={'/club.png'}
                        alt={'chess club'}/>
                   <div>
                      <span className={'text-2xl'}>{club?.clubname}</span>
                      <div className={'flex gap-7 mt-2'}>
                         <div className={'flex gap-3 '}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 className="w-6 h-6 fill-gray-400">
                               <path
                                   d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"/>
                            </svg>
                            <span>{club?.membersCount}</span>
                         </div>
                         <div className={'flex gap-3 '}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 className="w-6 h-6 fill-gray-400">
                               <path
                                   d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/>
                               <path fillRule="evenodd"
                                     d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                     clipRule="evenodd"/>
                            </svg>

                            <span>{moment(club?.createdAt).format('ll')}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <span className={'text-justify mt-4'}>{club?.description}</span>

                <div className={'mt-4'}>
                   {
                      user.club?._id?.toString() === id ?
                          (
                              <button onClick={handleLeaveClub}
                                      className={'text-sm sm:text-base bg-primaryLight hover:bg-red-700 duration-200 rounded-md py-2 sm:py-3 px-4 sm:px-7 min-w-[145px] w-1/3'}>Leave
                                 Club
                              </button>
                          ) : (
                              <button onClick={handleJoinClub}
                                      className={'text-sm sm:text-base bg-primaryLight hover:bg-secondaryGreen duration-200 rounded-md py-2 sm:py-3 px-4 sm:px-7 min-w-[145px] w-1/3'}>Join
                                 Club
                              </button>

                          )
                   }

                </div>

             </div>


          </div>

          {/* Tabs */}

          <div className={'bg-primary py-5 px-5 rounded-md max-w-[900px] w-full'}>
             <div className={'flex items-center gap-3 sm:gap-5 mb-1 '}>
                <span className={'font-bold text-base sm:text-xl py-2'}>Members</span>
                <span className={'bg-input rounded-md text-sm sm:text-base px-1'}>{club?.members?.length} </span>
             </div>
             <div className={'flex flex-col  gap-5 '}>
                {club?.members?.map((currentUser) => (
                    <div className={'flex items-center justify-between gap-5'} key={currentUser._id}>
                       <Link className={'flex flex-[1] items-center gap-2 sm:gap-5'}
                             to={`/profile/${currentUser._id}`}>
                          <ProfileIcon textValue={currentUser.username} isMyProfile={false}
                                       iconStyles={'w-[36px] h-[36px] text-lg sm:w-[64px] sm:h-[64px] sm:text-3xl'}/>
                          <div className={'flex flex-col'}>
                             <span>{currentUser.username}</span>
                             <span className={'text-sm hidden sm:inline-block'}>Rating: {currentUser.rating}</span>
                          </div>
                       </Link>

                       <div className={'flex  gap-4'}>
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
   );
};

export default Club;
