import Divider from "../Generic/Divider.tsx";
import {FC} from "react";
import {IGameHistory} from "../Board/GameTypes.ts";
import Tooltip from "../Generic/Tooltip.tsx";

interface GameHistoryProps {
   gameHistory: IGameHistory[];
   handleGameHistory: (action: string) => void;
}

const GameHistory: FC<GameHistoryProps> = ({gameHistory, handleGameHistory}) => {


   return (
       <div
           className={'flex flex-col overflow-hidden  bg-primary rounded-md lg:ml-8 xl:ml-10 h-[350px] lg:h-[603px] w-[360px] sm:w-[600px] lg:w-[300px] xl:w-[380px]  pt-4  my-8 lg:mt-[57px] lg:mb-[53px]'}>
          <span className={'text-center text-base mb-2 font-semibold sm:font-bold sm:text-lg'}>Game History</span>
          <Divider styles={'h-[2px] w-full  bg-primaryGreen'}/>
          <div className={'pt-1 pb-2 overflow-y-auto'}>
             {gameHistory.map((currentMove) => (
                 <div
                     className={`grid grid-cols-[auto,1fr,1fr] gap-2 items-center ${Number(currentMove.turn) % 2 === 0 ? 'bg-primaryLight' : 'bg-primary'} px-3`}>
                    <span className={'font-medium w-[26px]'}>{currentMove.turn}.</span>
                    <span className={'py-1 '}>{currentMove.whiteMove}</span>
                    <span className={'py-1 '}>{currentMove.blackMove}</span>
                 </div>
             ))}
          </div>
          <div
              className={'flex gap-1.5 py-3 lg:py-1.5 xl:py-3 px-3 lg:px-1.5 xl:px-3 bg-header w-full mt-auto select-none'}>
             <Tooltip text={'First Move'} containerStyles={'w-full'} placement={'top'}
                      onClick={() => handleGameHistory('first')}>
                <div
                    className={'flex justify-center rounded-lg w-full bg-primaryLight cursor-pointer py-1.5 lg:py-1 xl:py-1.5 hover:bg-secondaryGreen transition-all duration-300'}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-6 h-6 stroke-[2.5px] lg:stroke-1.5 xl:stroke-[2.5px]">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/>
                   </svg>
                </div>
             </Tooltip>
             <Tooltip text={'Previous Move'} containerStyles={'w-full'} placement={'top'}
                      onClick={() => handleGameHistory('previous')}>
                <div
                    className={'flex justify-center rounded-lg w-full bg-primaryLight cursor-pointer py-1.5 lg:py-1 xl:py-1.5 hover:bg-secondaryGreen transition-all duration-300'}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-6 h-6 stroke-[2.5px] lg:stroke-1.5 xl:stroke-[2.5px]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                   </svg>
                </div>
             </Tooltip>
             <Tooltip text={'Next Move'} containerStyles={'w-full'} placement={'top'}
                      onClick={() => handleGameHistory('next')}>
                <div
                    className={'flex justify-center rounded-lg w-full bg-primaryLight cursor-pointer py-1.5 lg:py-1 xl:py-1.5 hover:bg-secondaryGreen transition-all duration-300'}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-6 h-6 stroke-[2.5px] lg:stroke-1.5 xl:stroke-[2.5px]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                   </svg>
                </div>
             </Tooltip>
             <Tooltip text={'Last Move'} containerStyles={'w-full'} placement={'top'}
                      onClick={() => handleGameHistory('last')}>
                <div
                    className={'flex justify-center rounded-lg w-full bg-primaryLight cursor-pointer py-1.5 lg:py-1 xl:py-1.5 hover:bg-secondaryGreen transition-all duration-300'}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" className="w-6 h-6 stroke-[2.5px] lg:stroke-1.5 xl:stroke-[2.5px]">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
                   </svg>

                </div>
             </Tooltip>
          </div>
       </div>
   );
};

export default GameHistory;
