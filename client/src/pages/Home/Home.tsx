import GameDuration from "../../components/GameDuration/GameDuration.tsx";
import ProfileIcon from "../../components/Generic/ProfileIcon.tsx";
import Divider from "../../components/Generic/Divider.tsx";
import {Link} from "react-router-dom";
import BoardPreview from "../../components/Board/BoardPreview.tsx";
import {gameDurations} from "../../utils/constants/game.ts";

const Home = () => {

   return (
       <div className={'flex justify-between'}>
          <div className={'flex flex-col'}>
             <span className={'font-mono text-xl mb-7 self-center'}>TOP GAME</span>
             <BoardPreview width={300} height={300} pgn={''}/>

          </div>
          <div className={'flex flex-col'}>
             <span className={'font-mono text-xl mb-7 self-center'}>QUICK PLAY</span>
             <div className={'flex flex-col gap-5'}>
                <div className={'flex gap-5'}>
                   {gameDurations.slice(0, 4).map((gameDuration, index) => (
                       <Link
                           to={'/create-game'}
                           state={{gameDurationLabel: gameDuration.label, gameDurationType: gameDuration.type}}
                           className={'flex justify-center items-center bg-primary  w-36 h-32'}
                           key={index}>
                          <GameDuration size={'lg'} type={gameDuration.type} isWithLabel={true} isLabelBottom={true}
                                        labelText={gameDuration.label}/>
                       </Link>
                   ))}
                </div>
                <div className={'flex gap-5'}>
                   {gameDurations.slice(4, 8).map((gameDuration, index) => (
                       <Link
                           to={{pathname: '/create-game', state: {gameDurationLabel: gameDuration.label, gameDurationType: gameDuration.type}}}
                           className={'flex justify-center items-center bg-primary  w-36 h-32'}
                           key={index}>
                          <GameDuration size={'lg'} type={gameDuration.type} isWithLabel={true} isLabelBottom={true}
                                        labelText={gameDuration.label}/>
                       </Link>
                   ))}
                </div>
             </div>
          </div>
          <div className={'flex flex-col w-48'}>
             <span className={'font-mono text-xl mb-7 self-center'}>
                PROFILE
             </span>
             <Link to={'/profile'} className={'flex bg-primary py-1.5 px-1.5 mb-5'}>
                <ProfileIcon size={'sm'} withText={true}/>
             </Link>
             <Divider/>

             <span className={'font-mono text-xl mt-5 mb-7 self-center'}>
                Friends
             </span>

             <div className={'flex flex-col'}>
                <Link to={'/profile'} className={'flex bg-primary py-1.5 px-1.5'}>
                   <ProfileIcon size={'sm'} withText={true}/>
                </Link>
                <Divider color={'red-500'}/>
                <Link to={'/profile'} className={'flex bg-primary py-1.5 px-1.5'}>
                   <ProfileIcon size={'sm'} withText={true}/>
                </Link>
                <Divider color={'red-500'}/>
                <Link to={'/profile'} className={'flex bg-primary py-1.5 px-1.5'}>
                   <ProfileIcon size={'sm'} withText={true}/>
                </Link>
                <Divider color={'red-500'}/>
                <Link to={'/profile'} className={'flex bg-primary py-1.5 px-1.5'}>
                   <ProfileIcon size={'sm'} withText={true}/>
                </Link>
                <Divider color={'red-500'}/>
                <Link to={'/profile'} className={'flex bg-primary py-1.5 px-1.5'}>
                   <ProfileIcon size={'sm'} withText={true}/>
                </Link>
             </div>

          </div>

       </div>
   );
};

export default Home;
