import GameDuration from "../../components/GameDuration/GameDuration.tsx";
import ProfileIcon from "../../components/Generic/ProfileIcon.tsx";

const Home = () => {


   return (
       <div className={'flex justify-between'}>
          <div className={'flex flex-col'}>
             <span className={'font-mono text-xl'}>TOP GAME</span>


          </div>
          <div className={'flex flex-col'}>
             <span className={'font-mono text-xl mb-10 self-center'}>QUICK PLAY</span>
             <div className={'flex flex-col gap-5'}>
                <div className={'flex gap-5'}>
                   <div className={'flex justify-center items-center bg-primary  w-36 h-32'}>
                      <GameDuration size={'lg'} type={'bullet'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'1 min'}/>

                   </div>
                   <div className={'flex justify-center items-center bg-primary w-36 h-32'}>
                      <GameDuration size={'lg'} type={'bullet'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'2 | 1 mins'}/>
                   </div>
                   <div className={'flex justify-center items-center bg-primary w-36 h-32'}>
                      <GameDuration size={'lg'} type={'blitz'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'3 mins'}/>
                   </div>
                   <div className={'flex justify-center items-center bg-primary w-36 h-32'}>
                      <GameDuration size={'lg'} type={'blitz'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'3 | 2 mins'}/>
                   </div>
                </div>
                <div className={'flex gap-5'}>
                   <div className={'flex justify-center items-center bg-primary w-36 h-32'}>
                      <GameDuration size={'lg'} type={'blitz'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'5 mins'}/>
                   </div>
                   <div className={'flex justify-center items-center bg-primary w-36 h-32'}>
                      <GameDuration size={'lg'} type={'rapid'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'10 mins'}/>
                   </div>
                   <div className={'flex justify-center items-center bg-primary w-36 h-32'}>
                      <GameDuration size={'lg'} type={'rapid'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'10 | 5 mins'}/>
                   </div>
                   <div className={'flex justify-center items-center bg-primary w-36 h-32'}>
                      <GameDuration size={'lg'} type={'rapid'} isWithLabel={true} isLabelBottom={true}
                                    labelText={'15 mins'}/>
                   </div>
                </div>
             </div>
          </div>
          <div className={'flex flex-col w-48'}>
             <span className={'font-mono text-xl mb-10 self-center'}>
                PROFILE
             </span>
             <div className={'flex bg-primary py-1.5 px-1.5'}>
                <ProfileIcon size={'sm'} withText={true}/>
             </div>


          </div>

       </div>
   );
};

export default Home;
