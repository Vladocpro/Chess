import {useEffect, useMemo, useState} from "react";
import {Chess} from "chess.js";
import {Cell, ICapturedPieces, IGameHistory, IMove} from "../../components/Board/GameTypes.ts";
import useUser from "../../zustand/userStore.tsx";
import useGameModal from "../../zustand/gameModalStore.tsx";
import useTheme from "../../zustand/themeStore.tsx";
import useWindowSize from "../../hooks/useWindowSize.tsx";
import {
   boardUpdate,
   firstMove,
   gameHistoryToPgn, nextMove,
   parseGameHistory,
   playSound,
   previousMove
} from "../../utils/chess.ts";
import UserRow from "../../components/Board/UserRow.tsx";
import CellComponent from "../../components/Board/CellComponent.tsx";
import Tooltip from "../../components/Generic/Tooltip.tsx";
import GameHistory from "../../components/TrainingPage/GameHistory.tsx";
import GameActionModal from "../../components/Modals/GameActionModal.tsx";
import ThemeSettingsModal from "../../components/Modals/ThemeSettingsModal.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {getFetch} from "../../utils/axios/fetcher.ts";
import useToast, {ToastPositions, ToastType} from "../../zustand/toastModalStore.tsx";
import {IGame} from "../../types.ts";
import {
   acceptDrawOffer,
   makeMove,
   rejectDrawOffer,
   sendDrawOffer,
   sendResignition, setGameDraw, setGameOver
} from "../../websockets/socketConnection.ts";
import useGameState from "../../zustand/gameState.tsx";

const Play = () => {
   const [game, setGame] = useState<IGame | undefined>(undefined)
   const [swapBoardColor, setSwapBoardColor] = useState<boolean>(false)
   const [inverted, setInverted] = useState<boolean>(false)
   const [chess, setChess] = useState(new Chess());
   const [originalBoard, setOriginalBoard] = useState<Cell[]>([]);
   const [currentMoveBoard, setCurrentMoveBoard] = useState<Cell[]>([]);
   const [selectedCell, setSelectedCell] = useState<Cell | undefined>(undefined)
   const [availableMoves, setAvailableMoves] = useState<IMove[]>([])
   const [originalGameHistory, setOriginalGameHistory] = useState<IGameHistory[]>([])
   const [currentMoveGameHistory, setCurrentMoveGameHistory] = useState<IGameHistory[]>([])
   const [isLastMove, setIsLastMove] = useState<boolean>(true)
   const [kingInCheck, setKingInCheck] = useState<string | undefined>(undefined)
   const [capturedPieces, setCapturedPieces] = useState<ICapturedPieces>({
      w: {p: 0, n: 0, b: 0, r: 0, q: 0},
      b: {p: 0, n: 0, b: 0, r: 0, q: 0}
   })
   const user = useUser()
   const {openModal} = useGameModal()
   const {pawnPromotion, playSounds, setModal} = useTheme()
   const breakpoint = useWindowSize()
   const boardSize = breakpoint === 'xs' ? 360 : 600
   const {id} = useParams()
   const navigate = useNavigate()
   const {openToast} = useToast()
   const onlineGameState = useGameState()
   const capturedPoints = useMemo(() => {
      const whitePoints = capturedPieces.b.p + (capturedPieces.b.n * 3) + (capturedPieces.b.b * 3) + (capturedPieces.b.r * 5) + (capturedPieces.b.q * 9)
      const blackPoints = capturedPieces.w.p + (capturedPieces.w.n * 3) + (capturedPieces.w.b * 3) + (capturedPieces.w.r * 5) + (capturedPieces.w.q * 9)
      return {
         w: whitePoints - blackPoints,
         b: blackPoints - whitePoints
      }
   }, [capturedPieces])

   const gamePlayers = useMemo(() => {
      if (game === undefined) {
         return {
            player: undefined,
            opponent: undefined
         }
      }
      if (game.user1.userID === user.userID) {
         if (game.user1.color[0] === 'b') {
            setSwapBoardColor(true)
         }
         return {
            player: game.user1,
            opponent: game.user2
         }
      } else {
         if (game.user2.color[0] === 'b') {
            setSwapBoardColor(true)
         }
         return {
            player: game.user2,
            opponent: game.user1
         }
      }
   }, [game])

   const updateChess = () => {
      // Chess Update
      let tempChess = new Chess()
      tempChess.loadPgn(chess.pgn())

      validateKingInCheck()
      validateFinishedGame()

      // Board Update
      const tempBoard = boardUpdate(tempChess.board().flat())

      // Captured Pieces Update
      const history = chess.history({verbose: true});
      let initial = {
         w: {p: 0, n: 0, b: 0, r: 0, q: 0},
         b: {p: 0, n: 0, b: 0, r: 0, q: 0}
      };

      const tempCapturedPieces = history.reduce(function (acc, move) {
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
      setOriginalBoard(tempBoard)
      setCurrentMoveBoard(tempBoard)
      const tempGameHistory = parseGameHistory(chess.history())
      setOriginalGameHistory(tempGameHistory)
      // Updating currentGameHistory because you are only allowed to move if it's your last move
      setCurrentMoveGameHistory(tempGameHistory)
      setCapturedPieces(tempCapturedPieces)
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
         if (!chess.isGameOver() && playSounds) playSound({sound: 'check'})
         const sideInCheck = chess.turn();
         chess.board().forEach((row) => {
            row.forEach((piece) => {
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
      if (game !== undefined) setGame({...game, isFinished: true})

      if (chess.isCheckmate()) {
         let outcomeText = '';
         let losingSide = chess.turn();
         let leftPlayerOutcome = '';
         let rightPlayerOutcome = '';
         if (gamePlayers.player !== undefined) {
            if (losingSide === gamePlayers.player?.color[0]) {
               outcomeText = `${gamePlayers.opponent?.username} Won!`
               leftPlayerOutcome = 'l'
               rightPlayerOutcome = 'w'
               setGameOver({
                  gameID: game?._id,
                  loser: gamePlayers.player?.userID,
                  winner: gamePlayers.opponent?.userID,
               })
            } else {
               outcomeText = `${gamePlayers.player?.username} Won!`
               leftPlayerOutcome = 'w'
               rightPlayerOutcome = 'l'
               setGameOver({
                  gameID: game?._id,
                  winner: gamePlayers.player?.userID,
                  loser: gamePlayers.opponent?.userID
               })
            }
            openModal({
               type: 'regular',
               leftPlayer: {
                  username: gamePlayers.player?.username,
                  outcome: leftPlayerOutcome
               },
               rightPlayer: {
                  username: gamePlayers.opponent?.username,
                  outcome: rightPlayerOutcome
               },
               outcomeText: outcomeText,
            })
            return

         }
      }
      if (chess.isStalemate()) {

         if (game !== undefined) {
            openModal({
               type: 'regular',
               leftPlayer: {
                  username: gamePlayers.player?.username,
                  outcome: 'd'
               },
               rightPlayer: {
                  username: gamePlayers.opponent?.username,
                  outcome: 'd'
               },
               outcomeText: 'Stalemate!',
            })
            setGameDraw(game?._id)
            return
         }
      }
      if (chess.isThreefoldRepetition()) {

         if (game !== undefined) {
            openModal({
               type: 'regular',
               leftPlayer: {
                  username: gamePlayers.player?.username,
                  outcome: 'd'
               },
               rightPlayer: {
                  username: gamePlayers.opponent?.username,
                  outcome: 'd'
               },
               outcomeText: 'Draw By Repetition!',
            })
            setGameDraw(game?._id)
            return
         }
      }
      if (chess.isDraw()) {

         if (game !== undefined) {
            openModal({
               type: 'regular',
               leftPlayer: {
                  username: gamePlayers.player?.username,
                  outcome: 'd'
               },
               rightPlayer: {
                  username: gamePlayers.opponent?.username,
                  outcome: 'd'
               },
               outcomeText: 'Draw!',
            })
            setGameDraw(game._id)
            return
         }
      }
   }

   const handleClick = (cell: Cell) => {

      // If it's illegal move
      if (selectedCell === undefined && cell?.type === undefined) return

      const turn: 'w' | 'b' = chess.turn()
      if (!isLastMove || turn !== gamePlayers.player?.color[0] || game?.isFinished) {
         return;
      }
      // set selected cell
      if (turn === cell?.color) {
         setSelectedCell(cell)
         setAvailableMoves(chess.moves({square: cell.square, verbose: true}))
         return;
      }

      // If it's illegal move for selected cell
      if (selectedCell !== undefined && !validateMove(cell)) {
         unHighlightBoard()
         return;
      }

      // If there is selectedCell and current cell is legal move for a selectedCell piece move a piece
      if (selectedCell !== undefined && validateMove(cell)) {
         const currentMove = chess.move({from: selectedCell.square, to: cell.square, promotion: pawnPromotion})
         if (playSounds && !chess.isGameOver()) playSound({move: currentMove})
         makeMove({
            gameID: game?._id,
            user: {
               userID: user.userID,
               username: user.username,
               moveDate: new Date(Date.now()).toISOString(),
            },
            opponent: {
               userID: gamePlayers.opponent?.userID,
               username: gamePlayers.opponent?.username,
            },
            pgn: chess?.pgn()
         })
         setSelectedCell(undefined)
         setAvailableMoves([])
         updateChess()
      }

   }
   const handleResign = () => {
      try {
         sendResignition({
            gameID: game?._id,
            user: {
               userID: user.userID,
               username: user.username,
            },
            opponent: {
               userID: gamePlayers.opponent?.userID,
               username: gamePlayers.opponent?.username,
            },
         })
         openModal({
            type: 'regular',
            leftPlayer: {
               username: user.username,
               outcome: 'l'
            },
            rightPlayer: {
               username: gamePlayers.opponent?.username,
               outcome: 'w'
            },
            outcomeText: `You Resigned`,
         })
         setGame({...game, isFinished: true})
      } catch (error) {
         openToast({message: error, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 4000})
      }
   }

   const handleSendDrawOffer = () => {
      try {
         sendDrawOffer({
            gameID: game?._id,
            user: {
               userID: user.userID,
               username: user.username,
            },
            opponent: {
               userID: gamePlayers.opponent?.userID,
               username: gamePlayers.opponent?.username,
            },
         })
         openToast({
            message: 'Draw offer has been sent',
            type: ToastType.SUCCESS,
            position: ToastPositions.AUTH,
            duration: 3000
         })
      } catch (error) {
         openToast({message: error, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 4000})
      }
   }

   const handleAcceptDrawOffer = () => {
      try {
         acceptDrawOffer({
            gameID: game?._id,
            user: {
               userID: user.userID,
               username: user.username,
            },
            opponent: {
               userID: gamePlayers.opponent?.userID,
               username: gamePlayers.opponent?.username,
            },
         })
         setTimeout(() => {
            openModal({
               type: 'regular',
               leftPlayer: {
                  username: user.username,
                  outcome: 'd'
               },
               rightPlayer: {
                  username: gamePlayers.opponent?.username,
                  outcome: 'd'
               },
               outcomeText: `Draw`,
            })
         }, 400)

         setGame({...game, isFinished: true})
      } catch (error) {
         openToast({message: error, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 4000})
      }

   }
   const handleRejectDrawOffer = () => {
      try {
         rejectDrawOffer({
            gameID: game?._id,
            user: {
               userID: user.userID,
               username: user.username,
            },
            opponent: {
               userID: gamePlayers.opponent?.userID,
               username: gamePlayers.opponent?.username,
            },
         })
      } catch (error) {
         openToast({message: error, type: ToastType.ERROR, position: ToastPositions.AUTH, duration: 4000})
      }

   }
   const unHighlightBoard = () => {
      setSelectedCell(undefined)
      setAvailableMoves([])
   }

   const handleGameHistory = (action: string) => {
      if (originalGameHistory.length === 0) return
      unHighlightBoard()
      setKingInCheck(undefined)
      // Making a copy of current move details
      let localCurrentMoveBoard = [...currentMoveBoard]
      let localCurrentGameHistory = [...currentMoveGameHistory]
      let localCurrentMovePgn = gameHistoryToPgn(localCurrentGameHistory)
      let tempChess = new Chess()

      // Changing local pgn based of action
      switch (action) {
         case 'first': {
            localCurrentMovePgn = firstMove(localCurrentMovePgn)
            break;
         }
         case 'previous': {
            localCurrentMovePgn = previousMove(localCurrentMovePgn)
            break;
         }
         case 'next': {
            localCurrentMovePgn = nextMove(chess.pgn(), localCurrentMovePgn)
            if (localCurrentMovePgn === chess.pgn()) {
               validateKingInCheck()
            }
            break;
         }
         case 'last': {
            setCurrentMoveGameHistory(originalGameHistory)
            setCurrentMoveBoard(originalBoard)
            setIsLastMove(true)
            validateKingInCheck()
            return;
         }
         default: {
            break
         }
      }
      // Updating local variables
      tempChess.loadPgn(localCurrentMovePgn)
      localCurrentGameHistory = parseGameHistory(tempChess.history())
      localCurrentMoveBoard = boardUpdate(tempChess.board().flat())

      // Checking if it's a last move
      if (localCurrentGameHistory.length === originalGameHistory.length
          && localCurrentGameHistory[localCurrentGameHistory.length - 1].blackMove === originalGameHistory[originalGameHistory.length - 1].blackMove) {
         setIsLastMove(true)
      } else {
         setIsLastMove(false)
      }

      // Updating current move states
      setCurrentMoveGameHistory(localCurrentGameHistory)
      setCurrentMoveBoard(localCurrentMoveBoard)
   }


   useEffect(() => {
      if (user.userID !== '') {
         getFetch(`/game/getGame/${id}`).then((response: IGame) => {
            if (user.userID !== response.user1.userID && user.userID !== response.user2.userID && !response.isFinished) {
               openToast({
                  message: 'The game is not finished. Please wait until the game ends.',
                  type: ToastType.ERROR,
                  position: ToastPositions.AUTH,
                  duration: 1800
               })
               navigate('/')
            } else {
               chess.loadPgn(response.pgn)
               setGame(response)
               updateChess()
               if (playSounds && !response.isFinished) playSound({sound: 'gameStart'})
            }
         }).catch((error) => {
            openToast({
               message: error.response.data,
               type: ToastType.ERROR,
               position: ToastPositions.AUTH,
               duration: 1800
            })
            navigate('/')
         })
      }

      // TODO add draw or checkmate on switch turns
      // TODO add timer
      // TODO add rematch functionalities for gameActionModal save gameInvitaionID and remove invitation with clean up function
      // TODO add when timer is off request
      // TODO add notification when rematch or game invitation arrive


   }, [user]);

   useEffect(() => {
      if (onlineGameState?.isFinished) {
         setGame({...game, isFinished: onlineGameState.isFinished})
      }
      if (onlineGameState.pgn !== '') {
         setIsLastMove(true)
         chess.loadPgn(onlineGameState.pgn)
         // TODO add time left for users
         // let tempUser1 = 'asda'
         console.log(gamePlayers.player)
         console.log(gamePlayers.opponent)
         // if(game?.user1.userID === user.userID) {
         //    setGame({...game})
         //
         // }
         updateChess()
         return
      }
      return () => {
         // TODO user disconnected 30 sec until lose send event with disconnect, add to array of disconnects, if user recconects find this timeout object, and stop it. Plus remove
         console.log('HEheahah')

      }
   }, [onlineGameState]);


   // if (game === undefined) {
   //    return null
   // }

   return (
       <div className={'mt-5'}>
          <div className={'flex flex-col lg:flex-row justify-center items-center lg:items-stretch'}>
             <div className={'flex flex-col'}>
                {gamePlayers.player !== undefined ? (
                    <UserRow
                        isTraining={false}
                        username={inverted ? gamePlayers.player?.username : gamePlayers.opponent?.username}
                        rating={inverted ? gamePlayers.player?.rating : gamePlayers.opponent?.rating}
                        timer={inverted ? gamePlayers.player?.timeLeft : gamePlayers.opponent?.timeLeft}
                        pieceColor={swapBoardColor ? (inverted ? 'w' : 'b') : (inverted ? 'b' : 'w')}
                        capturedPoints={inverted ? capturedPoints[gamePlayers.player?.color[0]] : capturedPoints[gamePlayers.opponent?.color[0]]}
                        capturedPieces={swapBoardColor ? (inverted ? capturedPieces['w'] : capturedPieces['b']) : (inverted ? capturedPieces['b'] : capturedPieces['w'])}
                    />
                ) : (<div className={'w-full my-2 h-[44px]'}/>)}


                {/* Board */}
                <div
                    className={`grid grid-cols-8 grid-rows-[8] rounded-md overflow-hidden ${(swapBoardColor && !inverted) || (!swapBoardColor && inverted) ? 'rotate-180' : 'rotate-0'}`}
                    style={{height: boardSize + 'px', width: boardSize + 'px'}}>
                   {currentMoveBoard.map((cell: Cell, index) => {

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
                                  inverted={(swapBoardColor && !inverted) || (!swapBoardColor && inverted)}
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


                {gamePlayers.player !== undefined ? (
                    <UserRow
                        isTraining={false}
                        username={inverted ? gamePlayers.opponent?.username : gamePlayers.player?.username}
                        rating={inverted ? gamePlayers.opponent?.rating : gamePlayers.player?.rating}
                        timer={inverted ? gamePlayers.opponent?.timeLeft : gamePlayers.player?.timeLeft}
                        pieceColor={swapBoardColor ? (inverted ? 'b' : 'w') : (inverted ? 'w' : 'b')}
                        capturedPoints={inverted ? capturedPoints[gamePlayers.opponent?.color[0]] : capturedPoints[gamePlayers.player?.color[0]]}
                        capturedPieces={swapBoardColor ? (inverted ? capturedPieces['b'] : capturedPieces['w']) : (inverted ? capturedPieces['w'] : capturedPieces['b'])}
                    />
                ) : (<div className={'w-full my-2 h-[44px]'}/>)}

             </div>

             {/* Aside Action Icons */}
             <div className={'hidden lg:flex flex-col justify-between lg:ml-1 xl:ml-2 select-none mt-[57px]'}>
                <div className={'flex flex-col gap-2'}>
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
                              className="w-8 h-8 fill-transparent stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                         </svg>
                      </div>
                   </Tooltip>
                </div>

                {
                   !game?.isFinished ? (
                       <div className={'flex flex-col gap-4 mt-auto'}>

                          <div className={'flex flex-col gap-2.5 cursor-pointer'}>
                             <Tooltip text={'Offer a Draw'} placement={'top'} onClick={handleSendDrawOffer}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="w-7 h-7  fill-white stroke-white stroke-[4px]"
                                     viewBox="-5 103 240 250">
                                   <path
                                       d="M137.5312 335.1094v-17.1563q9.2813-16.1719 25.5938-30.7969l9.8438-8.7187q10.8281-9.7031 16.3124-18.7031 5.4844-9 5.4844-17.4375 0-10.4063-5.6953-15.6797-5.6953-5.2734-17.0859-5.2734-13.5 0-31.3594 9.7031v-16.4531q17.7188-7.4532 35.4375-7.4532 18.2813 0 29.5313 9.4922t11.25 24.961q0 9.8437-6.4688 20.1093-6.4688 10.2657-19.2656 20.8125l-7.4532 6.0469q-18.7031 15.3281-21.9374 29.3906h54.7031v17.1563h-78.8907Zm-123.6093 5.2031 153-218.5313h18.9843L33.0469 340.3125h-19.125ZM38.25 251.8594V145.125l-27.8438 6.8906v-16.0312L59.0625 123.75v128.1094H38.25Z"/>
                                </svg>
                             </Tooltip>
                          </div>
                          <div className={'flex flex-col gap-2.5 cursor-pointer mb-[57px]'}>
                             <Tooltip text={'Forfeit Game'} placement={'top'} onClick={handleResign}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                                     className="w-8 h-8 fill-primaryLight stroke-white rotate-12">
                                   <path strokeLinecap="round" strokeLinejoin="round"
                                         d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/>
                                </svg>
                             </Tooltip>
                          </div>
                       </div>

                   ) : null
                }

             </div>

             {/* GameHistory */}
             <GameHistory gameHistory={currentMoveGameHistory} handleGameHistory={handleGameHistory}/>

             {/* Mobile Action Buttons */}
             <div className={'block lg:hidden space-y-4 bg-primary mb-6 rounded-lg p-3 w-[360px] sm:w-[600px]'}>

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
                           className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-transparent stroke-white">
                         <path strokeLinecap="round" strokeLinejoin="round"
                               d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                      </svg>
                   </div>
                   <span className={'text-base sm:text-lg font-medium'}>Flip the Board</span>
                </div>


                {/* Online game action icons */}
                {
                   !game?.isFinished ? (
                       <>
                          <div
                              className={'flex gap-1 items-center justify-center bg-primaryLight cursor-pointer py-2.5  hover:bg-secondaryGreen transition-all duration-300 w-full rounded-lg sm:py-3 '}
                              onClick={handleSendDrawOffer}>
                             <div className={'cursor-pointer'}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-white stroke-white stroke-[3px]"
                                     viewBox="-5 103 240 250">
                                   <path
                                       d="M137.5312 335.1094v-17.1563q9.2813-16.1719 25.5938-30.7969l9.8438-8.7187q10.8281-9.7031 16.3124-18.7031 5.4844-9 5.4844-17.4375 0-10.4063-5.6953-15.6797-5.6953-5.2734-17.0859-5.2734-13.5 0-31.3594 9.7031v-16.4531q17.7188-7.4532 35.4375-7.4532 18.2813 0 29.5313 9.4922t11.25 24.961q0 9.8437-6.4688 20.1093-6.4688 10.2657-19.2656 20.8125l-7.4532 6.0469q-18.7031 15.3281-21.9374 29.3906h54.7031v17.1563h-78.8907Zm-123.6093 5.2031 153-218.5313h18.9843L33.0469 340.3125h-19.125ZM38.25 251.8594V145.125l-27.8438 6.8906v-16.0312L59.0625 123.75v128.1094H38.25Z"/>
                                </svg>
                             </div>
                             <span className={'text-base sm:text-lg font-medium'}>Offer a Draw&nbsp;&nbsp;</span>
                          </div>
                          <div
                              className={'flex gap-1 items-center justify-center bg-primaryLight cursor-pointer py-2.5  hover:bg-secondaryGreen transition-all duration-300 w-full rounded-lg sm:py-3 '}
                              onClick={handleResign}>
                             <div className={'cursor-pointer'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}
                                     className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-transparent stroke-white rotate-12">
                                   <path strokeLinecap="round" strokeLinejoin="round"
                                         d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/>
                                </svg>
                             </div>
                             <span className={'text-base sm:text-lg font-medium'}>Forfeit Game&nbsp;</span>
                          </div>
                       </>
                   ) : null
                }
             </div>


          </div>
          <GameActionModal
              acceptDraw={handleAcceptDrawOffer}
              declineDraw={handleRejectDrawOffer}
              newGame={() => navigate('/create-game')}
          />
          <ThemeSettingsModal/>
       </div>
   );
};

export default Play;
