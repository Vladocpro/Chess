import {FC, useEffect, useMemo, useState} from 'react';
import CellComponent from "./CellComponent.tsx";
import {Chess} from "chess.js";
import {defaultCellColors} from "../../utils/constants/game.ts";
import useUser from "../../zustand/userStore.tsx";
import {IGame} from "../../types.ts";
import {useNavigate} from "react-router-dom";

interface BoardPreviewProps {
   height: number;
   width: number;
   game: IGame;
   enableTransparentBg: boolean;
}

const BoardPreview: FC<BoardPreviewProps> = ({height, width, game, enableTransparentBg}) => {
   const [board, setBoard] = useState([]);
   const user = useUser()
   const navigate = useNavigate()


   const playersInfo = useMemo(() => {
      if (user.userID === game.user1.userID) {
         return {
            player: game.user1,
            opponent: game.user2
         }
      } else {
         return {
            player: game.user2,
            opponent: game.user1
         }
      }
   }, [])


   useEffect(() => {
      const chess = new Chess()
      chess.loadPgn(game.pgn)
      let tempArray = chess.board().flat()
      // @ts-ignore
      setBoard(tempArray)
   }, []);

   if (board.length === 0) {
      return null
   }
   return (
       <div className={'flex flex-col cursor-pointer select-none'} onClick={() => {
          if (enableTransparentBg) {
             navigate(`/play/${game._id}`)
          }
       }}>

          <div className={`grid grid-cols-8 grid-rows-[8] relative`}
               style={{height: height + 'px', width: width + 'px'}}>
             {board.map((cell, index) =>
                 // @ts-ignore
                 <CellComponent
                     // click={null}
                     cell={cell}
                     cellColor={defaultCellColors[index]}
                     key={index}
                     width={width / 8}
                     height={height / 8}
                     showNotations={false}
                     available={false}
                     // selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                 />
             )}
             <div
                 className={`absolute h-full w-full inset-0 pointer-events-none ${enableTransparentBg ? game.isFinished && 'bg-[rgba(1,1,1,0.3)]' : ''}`}>

             </div>
          </div>

          <div
              className={'flex justify-between text-gray-300 items-center bg-primaryLight py-1.5 px-1.5 rounded-b-lg overflow-x-hidden'}
              style={{maxWidth: width + 'px'}}>
             <div className={'flex items-center gap-2.5'}>
                <div
                    className={`flex items-center justify-center text-sm bg-primaryDark h-6 w-6 rounded-full uppercase`}>
                   {playersInfo.opponent.username[0]}
                </div>
                <div className={'line-clamp-1'}>{playersInfo.opponent.username}</div>
             </div>
             <span>{playersInfo.opponent.rating}</span>
          </div>
       </div>

   );
};

export default BoardPreview;
