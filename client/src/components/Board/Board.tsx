import {useEffect, useState} from 'react'
import CellComponent from './CellComponent';
import {Chess} from 'chess.js'
import {defaultCellColors} from "../../utils/constants/game.ts";


const chess = new Chess()

interface BoardPreviewProps {
   height: number;
   width: number;
   pgn: string;
}
const BoardComponent = ({height, width, pgn}) => {

   const [board, setBoard] = useState([])
   const [selected, setSelected] = useState('')


   useEffect(() => {
      setBoard(chess.board().flat())
   }, [])

   return (
       <div>
          <div className='grid grid-cols-8 grid-rows-[8]' style={{height: height + 'px', width: width + 'px'}}>
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
       </div>

   );
};

export default BoardComponent
