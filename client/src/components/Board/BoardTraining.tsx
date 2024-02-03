import React, {FC, useEffect, useState} from 'react';
import CellComponent from "./CellComponent.tsx";
import {Chess} from "chess.js";
import {defaultCellColors} from "../../utils/constants/game.ts";

interface BoardPreviewProps {
   height: number;
   width: number;
   pgn: string;
}

const BoardPreview: FC<BoardPreviewProps> = ({height, width, pgn}) => {
   const [board, setBoard] = useState([]);

   useEffect(() => {
      const chess = new Chess()
      chess.loadPgn(pgn)
      let tempArray = chess.board().flat()
      setBoard(tempArray)
   }, []);

   if (board.length === 0) {
      return null
   }
   return (
       <div className={`grid grid-cols-8 grid-rows-[8]`} style={{height: height + 'px', width: width + 'px'}}>
          {board.map((cell, index) =>
              <CellComponent
                  // click={click}
                  cell={cell}
                  cellColor={defaultCellColors[index]}
                  key={index}
                  width={width / 8}
                  height={height / 8}
                  // selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
          )}
       </div>
   );
};

export default BoardPreview;
