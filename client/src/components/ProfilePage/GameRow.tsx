import GameDurationIcon from "../GameDuration/GameDurationIcon.tsx";
import moment from "moment/moment";
import {IGame, IProfileUser} from "../../types.ts";
import {FC} from "react";
import {Link} from "react-router-dom";

const transformOutcome = (text: string): string => {
   switch (text) {
      case 'w':
         return '1'
      case 'l':
         return '0'
      default:
         return '1/2'
   }
}

const dividerColor = (outcome: string, userID: string, profileUserID: string): string => {
   if (userID === profileUserID) {
      switch (outcome) {
         case 'w':
            return 'bg-primaryGreen'
         case 'l':
            return 'bg-red-600'
         default:
            return 'bg-gray-400'
      }
   } else {
      switch (outcome) {
         case 'w':
            return 'bg-red-600'
         case 'l':
            return 'bg-primaryGreen'
         default:
            return 'bg-gray-400'
      }
   }

}

interface GameRowProps {
   game: IGame;
   profileUser: IProfileUser;
}

const GameRow: FC<GameRowProps> = ({game, profileUser}) => {


   return (
       <Link to={`/play/${game._id}`}
             className={'flex px-3 lg:px-5 py-2 cursor-pointer hover:bg-primaryLight duration-300 transition-all'}>
          <div className={'flex justify-center items-center  md:w-[65px]'}>
             <GameDurationIcon type={game.durationType} iconStyles={'w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'}/>
          </div>

          <div
              className={'ml-[18px] md:ml-[54px] lg:ml-[92px] w-[180px] md:w-[194px] lg:w-[220px] flex flex-col gap-1'}>
             <div className={'flex gap-1 items-center'}>
                <div className={'h-3 w-3 md:h-4 md:w-4 rounded-full bg-white'}/>
                <div
                    className={'text-sm lg:text-base max-w-[112px] md:max-w-[107px] lg:max-w-[117px]  truncate'}>{game.user1.username}</div>
                <div className={'text-sm lg:text-base w-[47px] lg:w-[53px]'}>({game.user1.rating})</div>
             </div>
             <div className={'flex gap-1 items-center'}>
                <div className={'h-3 w-3 md:h-4 md:w-4 rounded-full bg-black'}/>
                <div
                    className={'text-sm lg:text-base max-w-[112px] md:max-w-[107px] lg:max-w-[117px]  truncate'}>{game.user2.username}</div>
                <div className={'text-sm lg:text-base w-[47px] lg:w-[53px]'}>({game.user2.rating})</div>
             </div>
          </div>

          <div className={'hidden md:flex ml-6  lg:ml-[65px] gap-1.5 w-[55px] justify-center'}>
             <div className={'flex flex-col justify-between diagonal-fractions'}>
                <span className={'text-end text-sm lg:text-base w-[15px]'}>{transformOutcome(game.user1.outcome)}</span>
                <span className={'text-end text-sm lg:text-base w-[15px]'}>{transformOutcome(game.user2.outcome)}</span>
             </div>
             <div
                 className={`h-4/5 w-1 my-auto ${dividerColor(game.user1.outcome, game.user1.userID, profileUser.userID)}`}/>
          </div>

          <div className={'hidden md:flex items-center'}>
             <span className={'md:ml-[96px] lg:ml-[103px] text-sm w-[50px]'}>{game.totalMoves}</span>
          </div>

          <div className={'flex justify-end items-center w-[105px] lg:w-[117px] ml-auto'}>
             <span className={'text-sm lg:text-base'}>{moment(game?.createdAt).format('MMM Do, YYYY')}</span>
          </div>
       </Link>
   )
};

export default GameRow;
