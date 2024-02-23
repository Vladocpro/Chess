import Divider from "../Generic/Divider.tsx";
import {FC} from "react";
import {IGameHistory} from "../Board/GameTypes.ts";

interface GameHistoryProps {
   gameHistory: IGameHistory[];
}

const GameHistory: FC<GameHistoryProps> = ({gameHistory}) => {
   

   return (
       <div
           className={'flex flex-col  bg-primary rounded-md lg:ml-10 h-[350px] lg:h-[600px] w-[360px] sm:w-[600px] lg:w-[300px] xl:w-[360px]  pt-4 pb-2 my-8 lg:my-[50px]'}>
          <span className={'text-center text-base mb-2 font-semibold sm:font-bold sm:text-lg'}>Game History</span>
          <Divider styles={'h-[2px] w-full mb-1 bg-primaryGreen'}/>
          <div className={'overflow-y-auto'}>
             {gameHistory.map((currentMove) => (
                 <div
                     className={`grid grid-cols-[auto,1fr,1fr] gap-2 items-center ${currentMove.turn % 2 === 0 ? 'bg-primaryLight' : 'bg-primary'} px-3`}>
                    <span className={'font-medium w-[26px]'}>{currentMove.turn}.</span>
                    <span className={'py-1 '}>{currentMove.whiteMove}</span>
                    <span className={'py-1 '}>{currentMove.blackMove}</span>
                 </div>
             ))}
          </div>
       </div>
   );
};

export default GameHistory;
