import useUser from "../../zustand/userStore.tsx";
import Tooltip from "../../components/Generic/Tooltip.tsx";
import useTheme from "../../zustand/themeStore.tsx";
import ThemeSettingsModal from "../../components/Modals/ThemeSettingsModal.tsx";
import {useEffect, useMemo, useState} from "react";
import {Chess} from "chess.js";
import {Cell, ICapturedPieces, IGameHistory, IModalPlayerInfo, IMove} from "../../components/Board/GameTypes.ts";
import {defaultBoard} from "../../utils/constants/game.ts";
import CellComponent from "../../components/Board/CellComponent.tsx";
import {parseGameHistory, playSound} from "../../utils/chess.ts";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import GameHistory from "../../components/TrainingPage/GameHistory.tsx";
import UserRow from "../../components/Board/UserRow.tsx";
import GameActionModal from "../../components/Modals/GameActionModal.tsx";
import useGameModal from "../../zustand/gameModalStore.tsx";

const Training = () => {

   const [inverted, setInverted] = useState<boolean>(false)
   const [chess, setChess] = useState(new Chess());
   const [board, setBoard] = useState([]);
   const [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined)
   const [availableMoves, setAvailableMoves] = useState<IMove[]>([])
   const [gameHistory, setGameHistory] = useState<IGameHistory[]>([])
   const [kingInCheck, setKingInCheck] = useState<Cell | undefined>(undefined)
   const [capturedPieces, setCapturedPieces] = useState<ICapturedPieces>({
      w: {p: 0, n: 0, b: 0, r: 0, q: 0},
      b: {p: 0, n: 0, b: 0, r: 0, q: 0}
   })
   const user = useUser()
   const {openModal} = useGameModal()
   const {pawnPromotion, playSounds, setModal} = useTheme()
   const breakpoint = useWindowSize()
   const boardSize = breakpoint === 'xs' ? 360 : 600

   const capturedPoints = useMemo(() => {
      const whitePoints = capturedPieces.b.p + (capturedPieces.b.n * 3) + (capturedPieces.b.b * 3) + (capturedPieces.b.r * 5) + (capturedPieces.b.q * 9)
      const blackPoints = capturedPieces.w.p + (capturedPieces.w.n * 3) + (capturedPieces.w.b * 3) + (capturedPieces.w.r * 5) + (capturedPieces.w.q * 9)
      return {
         w: whitePoints - blackPoints,
         b: blackPoints - whitePoints
      }
   }, [capturedPieces])

   const updateChess = () => {
      // Chess Update
      let tempChess = new Chess()
      tempChess.loadPgn(chess.pgn())

      validateKingInCheck()
      validateFinishedGame()

      // Board Update
      const tempBoard = tempChess.board().flat().map((cell, index) => {
         if (cell !== null) {
            return {...defaultBoard[index], type: cell.type, color: cell.color}
         } else {
            return defaultBoard[index]
         }
      })

      // Captured Pieces Update
      const history = chess.history({verbose: true});
      let initial = {
         w: {p: 0, n: 0, b: 0, r: 0, q: 0},
         b: {p: 0, n: 0, b: 0, r: 0, q: 0}
      };

      const currentCapturedPieces = history.reduce(function (acc, move) {
         if ('captured' in move) {
            let piece = move.captured;
            // switch colors since the history stores the color of the player doing the
            // capturing, not the color of the captured piece
            let color = move.color == 'w' ? 'b' : 'w';
            acc[color][piece] += 1;
            return acc;
         } else {
            return acc;
         }
      }, initial);

      // Setting all states
      setChess(tempChess)
      setBoard(tempBoard)
      setGameHistory(parseGameHistory(chess.history()))
      setCapturedPieces(currentCapturedPieces)
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

   const validateKingInCheck = () => {
      if (chess.inCheck()) {
         if (!chess.isGameOver()) playSound({sound: 'check'})
         const sideInCheck = chess.turn();
         chess.board().forEach((row, rank) => {
            row.forEach((piece, file) => {
               if (piece && piece.type === 'k' && piece.color === sideInCheck) {
                  setKingInCheck(piece.square)
               }
            });
         });
      } else {
         setKingInCheck(undefined)
      }
   }
   const validateFinishedGame = () => {
      if (!chess.isGameOver()) return;
      if (playSounds) playSound({sound: 'gameOver'})

      if (chess.isCheckmate()) {
         let outcomeText = '';
         let losingSide = chess.turn();
         if (losingSide === 'b') outcomeText = `${user.username} Won!`
         else outcomeText = 'Opponent Won!'

         openModal({
            isOnline: false,
            leftPlayer: {
               username: 'Opponent',
               outcome: losingSide === 'b' ? 'l' : 'w'
            },
            rightPlayer: {
               username: user.username,
               outcome: losingSide === 'b' ? 'w' : 'l'
            },
            outcomeText: outcomeText,
         })
         return
      }
      if (chess.isStalemate()) {
         openModal({
            isOnline: false,
            leftPlayer: {
               username: 'Opponent',
               outcome: 'd'
            },
            rightPlayer: {
               username: user.username,
               outcome: 'd'
            },
            outcomeText: 'Stalemate!',
         })
         return
      }
      if (chess.isThreefoldRepetition()) {
         openModal({
            isOnline: false,
            leftPlayer: {
               username: 'Opponent',
               outcome: 'd'
            },
            rightPlayer: {
               username: user.username,
               outcome: 'd'
            },
            outcomeText: 'Draw By Repetition!',
         })
         return
      }
      if (chess.isDraw()) {
         openModal({
            isOnline: false,
            leftPlayer: {
               username: 'Opponent',
               outcome: 'd'
            },
            rightPlayer: {
               username: user.username,
               outcome: 'd'
            },
            outcomeText: 'Draw!',
         })
         return
      }
   }

   const handleClick = (cell: Cell) => {
      // If it's illegal move
      if (selectedCell === undefined && cell?.type === undefined) return

      const playerColor: 'w' | 'b' = chess.turn()

      // set selected cell
      if (playerColor === cell?.color) {
         setSelectedCell(cell)
         setAvailableMoves(chess.moves({square: cell.square, verbose: true}))
         return;
      }

      // If it's illegal move for selected cell
      if (selectedCell !== undefined && !validateMove(cell)) {
         setSelectedCell(undefined)
         setAvailableMoves([])
         return;
      }

      // If there is selectedCell and current cell is legal move for a selectedCell piece move a piece
      if (selectedCell !== undefined && validateMove(cell)) {
         const currentMove = chess.move({from: selectedCell.square, to: cell.square, promotion: pawnPromotion})
         if (playSounds && !chess.isGameOver()) playSound({move: currentMove})
         setSelectedCell(undefined)
         setAvailableMoves([])
         updateChess()
      }

   }

   useEffect(() => {
      updateChess()
   }, []);


   return (
       <div className={'mt-5'}>
          <div className={'flex flex-col lg:flex-row justify-center items-center lg:items-stretch'}>
             <div className={'flex flex-col'}>
                <UserRow
                    isTraining={!inverted}
                    username={inverted ? user.username : 'Opponent'}
                    rating={inverted ? user.rating : undefined}
                    pieceColor={inverted ? 'b' : 'w'}
                    capturedPoints={inverted ? capturedPoints.w : capturedPoints.b}
                    capturedPieces={inverted ? capturedPieces.b : capturedPieces.w}
                />

                {/* Board */}
                <div
                    className={`grid grid-cols-8 grid-rows-[8] rounded-md overflow-hidden ${inverted ? 'rotate-180' : 'rotate-0'}`}
                    style={{height: boardSize + 'px', width: boardSize + 'px'}}>
                   {board.map((cell: Cell, index) => {

                          const activeSquare = () => {
                             for (const tempCell of availableMoves) {
                                if (tempCell.to === cell.square) {
                                   return {
                                      available: true,
                                      attacked: tempCell.captured !== undefined,
                                   };
                                }
                             }
                             return {
                                available: false,
                                attacked: false,
                             };
                          };

                          return (
                              <CellComponent
                                  click={(cell) => handleClick(cell)}
                                  cell={cell}
                                  cellColor={cell.cellColor}
                                  key={cell.square + index}
                                  width={boardSize / 8}
                                  height={boardSize / 8}
                                  inverted={inverted}
                                  selected={cell.square === selectedCell?.square}
                                  showNotations={true}
                                  available={activeSquare().available}
                                  attacked={activeSquare().attacked}
                                  inCheck={kingInCheck === cell.square}
                              />
                          )
                       }
                   )}
                </div>

                {/* User row  */}
                <UserRow
                    isTraining={inverted}
                    username={inverted ? 'Opponent' : user.username}
                    rating={inverted ? undefined : user.rating}
                    pieceColor={inverted ? 'w' : 'b'}
                    capturedPoints={inverted ? capturedPoints.b : capturedPoints.w}
                    capturedPieces={inverted ? capturedPieces.w : capturedPieces.b}
                />
             </div>

             {/* Aside Action Icons */}
             <div className={'hidden lg:flex flex-col justify-between ml-2 select-none mt-[57px]'}>
                <div className={'flex flex-col gap-2 '}>
                   <Tooltip text={'Configuration'}>
                      <div className={'cursor-pointer'} onClick={() => setModal(true)}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                              stroke="currentColor" className="w-8 h-8 fill-primaryLight stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                         </svg>
                      </div>
                   </Tooltip>
                   <Tooltip text={'Flip the Board'}>
                      <div className={'cursor-pointer'} onClick={() => setInverted(!inverted)}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                              className="w-8 h-8 fill-primaryLight stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                         </svg>
                      </div>
                   </Tooltip>
                </div>


                <div className={'flex flex-col gap-2.5 cursor-pointer mt-auto mb-[57px]'}>
                   <Tooltip text={'Restart Game'} onClick={() => {
                      chess.reset()
                      updateChess()
                   }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-8 h-8">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                      </svg>
                   </Tooltip>
                </div>
             </div>

             {/* Mobile Action Buttons */}
             <div className={'block lg:hidden space-y-4 bg-primary mt-6 rounded-lg p-3 w-[360px] sm:w-[600px]'}>

                {/* Settings */}
                <div
                    className={'flex gap-1 items-center justify-center bg-primaryLight cursor-pointer py-2.5  hover:bg-secondaryGreen transition-all duration-300 w-full rounded-lg sm:py-3'}
                    onClick={() => setModal(true)}>
                   <div className={'cursor-pointer'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-primaryLight stroke-white">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                   </div>
                   <span className={'text-base sm:text-lg font-medium'}>Configuration</span>
                </div>

                {/* Flip Board */}
                <div
                    className={'flex gap-1 items-center justify-center bg-primaryLight cursor-pointer py-2.5  hover:bg-secondaryGreen transition-all duration-300 w-full rounded-lg sm:py-3'}
                    onClick={() => setInverted(!inverted)}>
                   <div className={'cursor-pointer'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                           className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-primaryLight stroke-white">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                      </svg>
                   </div>
                   <span className={'text-base sm:text-lg font-medium'}>Flip the Board</span>
                </div>

                {/* Restart Game */}
                <div
                    className={'flex gap-1 items-center justify-center bg-primaryLight cursor-pointer py-2.5  hover:bg-secondaryGreen transition-all duration-300 w-full rounded-lg sm:py-3 '}
                    onClick={() => {
                       chess.reset()
                       updateChess()
                    }}>
                   <div className={'cursor-pointer'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-5 h-5 sm:w-[22px] sm:h-[22px]">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                      </svg>
                   </div>
                   <span className={'text-base sm:text-lg font-medium'}>Restart Game</span>
                </div>

             </div>

             {/* GameHistory */}
             <GameHistory gameHistory={gameHistory}/>
          </div>
          <GameActionModal restartGame={() => {
             chess.reset()
             updateChess()
          }}/>
          <ThemeSettingsModal/>
       </div>
   );
};

export default Training;
