import GameDuration from "../../components/GameDuration/GameDuration.tsx";
import ProfileIcon from "../../components/Generic/ProfileIcon.tsx";
import {Link} from "react-router-dom";
import BoardPreview from "../../components/Board/BoardPreview.tsx";
import {gameDurations} from "../../utils/constants/game.ts";
import useUser from "../../zustand/userStore.tsx";
import LeftSection from "../../components/HomePage/LeftSection.tsx";
import FriendList from "../../components/HomePage/FriendList.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";

const Home = () => {
   const user = useUser()
   const breakpoint = useWindowSize()

   return (
       <div
           className={`flex justify-center xl:justify-between gap-8 xl:gap-2 mt-10`}>
          <LeftSection/>

          {/*Middle Section*/}
          <div className={'flex flex-col'}>
             <span
                 className={'text-base sm:text-xl self-center mb-7 uppercase font-semibold sm:font-bold'}>Quick Play</span>
             <div className={'flex flex-col items-center gap-4 sm:gap-5 mb-7'}>
                <div className={'grid grid-cols-2 grid-rows-2 gap-4 sm:flex sm:gap-5'}>
                   {gameDurations.slice(0, 4).map((gameDuration, index) => (
                       <Link
                           to={'/create-game'}
                           state={{gameDuration: gameDuration}}
                           className={'flex justify-center items-center bg-primary rounded-lg hover:bg-primaryLight duration-200  w-36 h-32'}
                           key={index}>
                          <GameDuration
                              type={gameDuration.type}
                              isWithLabel={true}
                              isLabelBottom={true}
                              labelText={gameDuration.label}
                              labelStyles={'text-lg'}
                              iconStyles={'h-[3rem] w-[3rem]'}
                          />
                       </Link>
                   ))}
                </div>
                <div className={'grid grid-cols-2 grid-rows-2 gap-4 sm:flex sm:gap-5'}>
                   {gameDurations.slice(4, 8).map((gameDuration, index) => (
                       <Link
                           to={'/create-game'}
                           state={{gameDuration: gameDuration}}
                           className={'flex justify-center items-center bg-primary rounded-lg hover:bg-primaryLight duration-200  w-36 h-32'}
                           key={index}>
                          <GameDuration
                              type={gameDuration.type}
                              isWithLabel={true}
                              isLabelBottom={true}
                              labelText={gameDuration.label}
                              labelStyles={'text-lg'}
                              iconStyles={'h-[3rem] w-[3rem]'}
                          />
                       </Link>
                   ))}
                </div>
             </div>
             <span className={'text-base sm:text-xl self-center mb-7 uppercase  font-semibold sm:font-bold'}>Current Games</span>
             {/*TODO Redesign mobile version of current games section in home page (like profile) */}
             <div className={'flex flex-col sm:flex-row items-center gap-8 mb-7'}>
                {
                   user.gameHistory.slice(0, 3).map((currentGame) => (
                       <div className={'rounded-md  overflow-hidden'}>
                          <BoardPreview height={breakpoint === 'xs' ? 240 : 175} width={breakpoint === 'xs' ? 260 : 190}
                                        game={currentGame} enableTransparentBg={true}/>
                       </div>
                   ))
                }

             </div>

          </div>

          {/*Right Section*/}
          <div className={'hidden lg:flex flex-col w-56'}>
             <span
                 className={'text-base sm:text-xl self-center mb-7 uppercase  font-semibold sm:font-bold'}>Profile</span>
             <Link to={'/profile'}
                   className={'flex bg-primary py-1.5 px-1.5 mb-7 rounded-md'}>
                <ProfileIcon size={'md'} withText={true} isMyProfile={true}/>
             </Link>

             <div className={'flex flex-col bg-primary px-1 py-3.5 rounded-md'}>
                <span
                    className={'text-base sm:text-xl py-0.5 pl-3 mb-2 uppercase font-semibold sm:font-bold'}>Friends</span>
                <FriendList friends={user.friends}/>
             </div>


          </div>

       </div>
   );
};

export default Home;
