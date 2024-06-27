import BoardPreview from "../Board/BoardPreview.tsx";
import {Link} from "react-router-dom";
import useUser from "../../zustand/userStore.tsx";
import {IGame} from "../../types.ts";


const LeftSection = () => {
   const user = useUser()

   return (
       <div className={'hidden xl:flex flex-col'}>
          {
             user?.gameHistory.length > 0 ? (
                 <Link to={`/play/${user.gameHistory[0]._id}`} className={'flex flex-col gap-7'}>
                    <span
                        className={'text-base sm:text-xl self-center uppercase font-semibold sm:font-bold'}>Top Game</span>
                    <div className={'rounded-md overflow-hidden'}>
                       <BoardPreview width={225} height={210} game={user.gameHistory[0]} enableTransparentBg={false}/>
                    </div>
                 </Link>
             ) : (
                 <>
                    <span className={'text-base sm:text-xl mb-7 self-center uppercase font-semibold sm:font-bold'}>Top Game</span>
                    <div className={'rounded-md overflow-hidden'}>
                       <BoardPreview width={225} height={210}
                                     game={botGame} enableTransparentBg={false}/>
                    </div>
                 </>
             )
          }


          <div className={'bg-primary py-3.5 px-3.5 mt-7 rounded-md'}>
                    <span
                        className={'text-base sm:text-xl self-center py-1 uppercase font-semibold sm:font-bold'}>My Club</span>
             <div
                 className={'bg-primary mt-2.5 pb-1 flex items-center rounded-md justify-between gap-5 max-w-[205px] group'}
                 key={user?.club?._id}>
                {
                   user?.club !== null ? (
                       <Link className={'flex flex-[1] items-center gap-3'} to={`/club/${user?.club?._id}`}>
                          <img className={'w-9 h-9'} src={'club.png'}
                               alt={'chess club'}/>
                          <span
                              className={'max-w-[148px] line-clamp-2 transition-all duration-300 group-hover:underline group-hover:text-primaryGreen'}>{user?.club?.clubname}</span>
                       </Link>
                   ) : (
                       <Link to={'/clubs'} className={'text-primaryGreen hover:underline cursor-pointer'}>
                          Want to join a club?
                       </Link>
                   )
                }

             </div>
          </div>
       </div>
   );
};

export default LeftSection;


const botGame: IGame = {
   _id: "",
   pgn: "",
   durationType: "rapid",
   duration: 600,
   totalMoves: 0,
   increment: 5,
   isFinished: false,
   createdAt: "2024-02-02T19:30:17.079Z",
   user1: {
      creator: true,
      outcome: "going",
      userID: "658c28e5d335d29021ba4bcd",
      username: "Bot",
      rating: 1000,
      color: "black",
      startTurnDate: "2024-02-02T19:30:19.077Z",
      timeLeft: 600
   },
   user2: {
      creator: false,
      outcome: "going",
      userID: "653d58216e7c6c386444f72d",
      username: "Bot",
      rating: 1000,
      color: "white",
      startTurnDate: "2024-02-02T19:30:19.077Z",
      timeLeft: 600
   },
}
