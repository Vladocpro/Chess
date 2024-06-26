import {IMove, IGameHistory, Cell} from "../components/Board/GameTypes.ts";
import {defaultBoard} from "./constants/game.ts";


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

export const gameHistoryToPgn = (gameHistory: IGameHistory[]) => {
   return gameHistory.map((move, index) => {
      if (move.blackMove) {
         return (`${index + 1}. ${move.whiteMove} ${move.blackMove}`)
      } else {
         return (`${index + 1}. ${move.whiteMove}`)
      }
   }).join(' ');
}

export const boardUpdate = (board: any[]): Cell[] => {
// @ts-ignore
   return board.map((cell, index) => {
      if (cell !== null) {
         return {...defaultBoard[index], type: cell.type, color: cell.color}
      } else {
         return defaultBoard[index]
      }
   })
}

// Function to get the first move from a PGN
export const firstMove = (currentPgn: string) => {
   const currentMoves = currentPgn.split(" ");
   const movesToKeep = currentMoves.slice(0, 2);
   return movesToKeep.join(" ");
};

// Function to get the previous move from a PGN
export const previousMove = (currentPgn: string) => {
   const currentMoves = currentPgn.split(" ");
   if (currentMoves.length === 2) {
      return currentPgn
   }
   if (currentMoves[currentMoves.length - 2].includes('.')) {
      const movesToKeep = currentMoves.slice(0, currentMoves.length - 2);
      return movesToKeep.join(" ");
   } else {
      const movesToKeep = currentMoves.slice(0, currentMoves.length - 1);
      return movesToKeep.join(" ");
   }
};

// Function to get the next move from a PGN
export const nextMove = (originalPgn: string, currentPgn: string) => {
   const originalMoves = originalPgn.split(" ");
   const currentMoves = currentPgn.split(" ");
   if (originalMoves.length === currentMoves.length) {
      return originalPgn
   }
   if (originalMoves[currentMoves.length].includes('.')) {
      return originalMoves.slice(0, currentMoves.length + 2).join(" ")
   } else {
      return originalMoves.slice(0, currentMoves.length + 1).join(" ")
   }
};


export const playSound = ({move, sound}: { move?: IMove, sound?: string }) => {

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
      case 'gameStart' : {
         const sound = new Audio('/sounds/game-start.mp3')
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

