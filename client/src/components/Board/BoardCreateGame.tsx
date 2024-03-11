import React, {FC, useEffect, useState} from 'react';
import CellComponent from "./CellComponent.tsx";
import {Chess} from "chess.js";
import {defaultBoard} from "../../utils/constants/game.ts";
import {Cell} from "./GameTypes.ts";
import useTheme from "../../zustand/themeStore.tsx";
import {playSound} from "../../utils/chess.ts";

interface BoardCreateGameProps {
   height: number;
   width: number;
   pgn: string;
   inverted: boolean;
}

const BoardCreateGame: FC<BoardCreateGameProps> = ({height, width, pgn, inverted}) => {
   const [board, setBoard] = useState([]);
   const [chess, setChess] = useState(new Chess());
   const [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined)
   const [availableMoves, setAvailableMoves] = useState<string[]>([])
   const [gameIsFinished, setGameIsFinished] = useState(false)
   const {pawnPromotion, playSounds} = useTheme()

   const updateChess = () => {
      let tempChess = new Chess()
      tempChess.loadPgn(chess.pgn())
      const tempBoard = tempChess.board().flat().map((cell, index) => {
         if (cell !== null) {
            return {...defaultBoard[index], type: cell.type, color: cell.color}
         } else {
            return defaultBoard[index]
         }
      })
      setChess(tempChess)
      setBoard(tempBoard)
   }

   const validateMove = (cell: Cell): boolean => {
      let tempChess = new Chess()
      tempChess.loadPgn(chess.pgn())
      try {
         tempChess.move({from: selectedCell?.square, to: cell.square, promotion: 'q'})
         return true
      } catch (e) {
         return false
      }
   }

   const handleClick = (cell) => {

      if (gameIsFinished) return;

      // If it's illegal move
      if (selectedCell === undefined && cell?.type === undefined) return

      const playerColor: 'w' | 'b' = chess.turn()

      // set selected cell
      if (playerColor === cell?.color) {
         setSelectedCell(cell)
         setAvailableMoves(chess.moves({square: cell.square}))
         return;
      }

      // If it's illegal move
      if (selectedCell !== undefined
          && !validateMove(cell)
      ) {
         setSelectedCell(undefined)
         setAvailableMoves([])
      }
      // If there is selectedCell and current cell is legal move for a selectedCell piece move a piece
      if (selectedCell !== undefined && validateMove(cell)) {
         const currentMove = chess.move({from: selectedCell.square, to: cell.square, promotion: pawnPromotion})
         if (playSounds && !chess.isGameOver()) playSound({move: currentMove})
         setSelectedCell(undefined)
         setAvailableMoves([])
         setGameIsFinished(true)
         updateChess()
      }

   }

   useEffect(() => {
      chess.loadPgn(pgn)
      updateChess()
   }, []);


   if (board.length === 0) {
      return null
   }
   return (
       <div
           className={`grid grid-cols-8 grid-rows-[8] rounded-md overflow-hidden ${inverted ? 'rotate-180' : 'rotate-0'}`}
           style={{height: height + 'px', width: width + 'px'}}>
          {board.map((cell: Cell, index) => {
                 const activeSquare = () => {
                    for (const tempCell of availableMoves) {
                       if (tempCell.includes(cell.square)) {
                          return {
                             available: true,
                             attacked: tempCell.includes('x')
                          };
                       }
                    }
                    return {
                       available: false,
                       attacked: false
                    };
                 };

                 return (<CellComponent
                     click={(cell) => handleClick(cell)}
                     cell={cell}
                     cellColor={cell.cellColor}
                     key={cell.square + index}
                     width={width / 8}
                     height={height / 8}
                     inverted={inverted}
                     selected={cell.square === selectedCell?.square}
                     showNotations={true}
                     available={activeSquare().available}
                     attacked={activeSquare().attacked}
                 />)
              }
          )}
       </div>
   );
};

export default BoardCreateGame;
