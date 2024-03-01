import {IMove, IGameHistory} from "../components/Board/GameTypes.ts";


export const parseGameHistory = (movesArray: string[]) => {
   const parsedMoves: IGameHistory[] = [];

   for (let i = 0; i < movesArray.length; i += 2) {
      const turn = Math.ceil((i + 1) / 2);
      const whiteMove = movesArray[i];
      const blackMove = movesArray[i + 1] || '';

      parsedMoves.push({
         // @ts-ignore
         turn,
         whiteMove,
         blackMove,
      });
   }

   return parsedMoves;
}

export const playSound = ({move, sound}: { move?: IMove, sound: string }) => {

   switch (sound) {
      case 'check' : {
         const sound = new Audio('/sounds/move-check.mp3')
         sound.play()
         return
      }
      case 'gameOver' : {
         const sound = new Audio('/sounds/game-end.mp3')
         sound.play()
         return
      }
      default:
         break;
   }
   if (move === undefined || move.san.includes('+')) return;


   if ('promotion' in move) {
      const sound = new Audio('/sounds/promote.mp3')
      sound.play()
      return
   }
   if (move.flags === 'e' || move.flags === 'c') {
      const sound = new Audio('/sounds/capture.mp3')
      sound.volume = 0.8
      sound.play()
   }
   if (move.flags === 'k' || move.flags === 'q') {
      const sound = new Audio('/sounds/castle.mp3')
      sound.play()
   }
   if (move.flags === 'n' || move.flags === 'b') {
      const sound = new Audio('/sounds/move-self.mp3')
      sound.play()
   }
}

