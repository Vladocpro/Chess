export const playerTotalMoves = (isWhiteColor,pgn) => {
   const moves = pgn.split(' ');
   if (moves.length <= 3) {
      return 1
   }
   let i = 0
   let counter = 0
   while (i < moves.length) {
      counter++
      let nextWhiteMove = moves[i + 4]
      let nextBlackMove = moves[i + 5]
      if (isWhiteColor && nextWhiteMove === undefined) {
         break
      }
      if (!isWhiteColor && nextBlackMove === undefined) {
         break
      }
      i = i + 3
   }
   return counter
}

export const countGameTotalMoves = (pgn) => {
   const moves = pgn.split(' ');
   return Math.ceil(moves.length / 3)
}


