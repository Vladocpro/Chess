import useUser from "../../zustand/userStore.tsx";
import Tooltip from "../../components/Generic/Tooltip.tsx";
import useTheme from "../../zustand/themeStore.tsx";
import ThemeSettingsModal from "../../components/Modals/ThemeSettingsModal.tsx";
import {useEffect, useState} from "react";
import {Chess} from "chess.js";
import {Cell, IGameHistory} from "../../components/Board/GameTypes.ts";
import {defaultBoard} from "../../utils/constants/game.ts";
import CellComponent from "../../components/Board/CellComponent.tsx";
import {parseGameHistory} from "../../utils/constants/game.ts";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import GameHistory from "../../components/TrainingPage/GameHistory.tsx";

const Training = () => {
   const [inverted, setInverted] = useState<boolean>(false)
   const [chess, setChess] = useState(new Chess());
   const [board, setBoard] = useState([]);
   const [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined)
   const [availableMoves, setAvailableMoves] = useState<string[]>([])
   const [gameHistory, setGameHistory] = useState<IGameHistory[]>([])
   const user = useUser()
   const {setModal} = useTheme()
   const {pawnPromotion} = useTheme()
   const breakpoint = useWindowSize()
   const boardSize = breakpoint === 'xs' ? 360 : 600

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
      setGameHistory(parseGameHistory(chess.history()))
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
         chess.move({from: selectedCell.square, to: cell.square, promotion: pawnPromotion})
         setSelectedCell(undefined)
         setAvailableMoves([])
         updateChess()
      }

   }

   useEffect(() => {
      updateChess()
   }, []);

   return (
       <div className={'mt-7'}>
          <div className={'flex flex-col lg:flex-row justify-center items-center lg:items-stretch'}>
             <div className={'flex flex-col'}>
                {/*Opponent row*/}
                <div className={'flex items-center gap-3 mb-2 h-[30px] sm:h-[44px]'}>
                   <img src={'/opponent.png'}
                        className={'rounded-full h-[30px] w-[32px] text-base sm:text-lg  sm:h-[44px] sm:w-[44px]'}/>
                   <div className={'flex  w-full gap-5 justify-between'}>
                      <span className={'text-sm sm:text-base'}>Opponent</span>
                   </div>
                </div>

                {/* Board */}
                <div
                    className={`grid grid-cols-8 grid-rows-[8] rounded-md overflow-hidden ${inverted ? 'rotate-180' : 'rotate-0'}`}
                    style={{height: boardSize + 'px', width: boardSize + 'px'}}>
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
                              width={boardSize / 8}
                              height={boardSize / 8}
                              inverted={inverted}
                              selected={cell.square === selectedCell?.square}
                              showNotations={true}
                              available={activeSquare().available}
                              attacked={activeSquare().attacked}
                          />)
                       }
                   )}
                </div>

                {/* User row  */}
                <div className={'flex items-center gap-3 mt-2 h-[30px] sm:h-[44px]'}>
                   <div
                       className={`flex items-center justify-center uppercase bg-primaryLight rounded-full h-[30px] w-[32px] text-base sm:text-lg  sm:h-[44px] sm:w-[48px]`}>
                      {user.username[0]}
                   </div>
                   <span className={'text-sm sm:text-base'}>{user.username}
                      <span className={'text-sm text-gray-400 font-light sm:text-base'}> ({user.rating})</span>
                   </span>
                </div>
             </div>

             {/* Aside Action Icons */}
             <div className={'hidden lg:flex flex-col justify-between ml-2 mt-[52px]'}>
                <div className={'flex flex-col gap-2 '}>
                   <Tooltip text={'Settings'}>
                      <div className={'cursor-pointer'} onClick={() => setModal(true)}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                              stroke="currentColor" className="w-8 h-8 fill-primaryLight stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                         </svg>
                      </div>
                   </Tooltip>
                   <Tooltip text={'Flip Board'}>
                      <div className={'cursor-pointer'} onClick={() => setInverted(!inverted)}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                              className="w-8 h-8 fill-primaryLight stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                         </svg>
                      </div>
                   </Tooltip>
                </div>


                <div className={'flex flex-col gap-2.5 cursor-pointer mt-auto mb-[50px]'}>
                   <Tooltip text={'Restart the Game'} onClick={() => {
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
             <div className={'block sm:hidden space-y-4 bg-primary mt-8 rounded-lg p-3 w-[360px]'}>

                <div className={'flex gap-1 items-center justify-center bg-primaryLight py-2.5 w-full rounded-lg'}
                     onClick={() => setModal(true)}>
                   <div className={'cursor-pointer'}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-[22px] h-[22px] fill-primaryLight stroke-white">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                   </div>
                   <span>Settings</span>
                </div>
                <div className={'flex gap-1 items-center justify-center bg-primaryLight py-2.5 w-full rounded-lg'}
                     onClick={() => setModal(true)}>
                   <div className={'cursor-pointer'}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                      </svg>
                   </div>
                   <span>Restart</span>
                </div>

             </div>

             {/* GameHistory */}
             <GameHistory gameHistory={gameHistory}/>
          </div>
          <ThemeSettingsModal/>
       </div>
   );
};

export default Training;
