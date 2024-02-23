export const defaultCellColors = [
   'w', 'b', 'w', 'b', 'w', 'b', 'w', 'b',
   'b', 'w', 'b', 'w', 'b', 'w', 'b', 'w',
   'w', 'b', 'w', 'b', 'w', 'b', 'w', 'b',
   'b', 'w', 'b', 'w', 'b', 'w', 'b', 'w',
   'w', 'b', 'w', 'b', 'w', 'b', 'w', 'b',
   'b', 'w', 'b', 'w', 'b', 'w', 'b', 'w',
   'w', 'b', 'w', 'b', 'w', 'b', 'w', 'b',
   'b', 'w', 'b', 'w', 'b', 'w', 'b', 'w',
]

export interface gameDurationType {
   label: string,
   value: {
      duration: number,
      increment: number
   },
   type: 'blitz' | 'bullet' | 'rapid',
}

export const gameDurations: gameDurationType[] = [
   {label: '1 min', value: {duration: 60, increment: 0}, type: 'bullet'},
   {label: '2 | 1 mins', value: {duration: 120, increment: 1}, type: 'bullet'},
   {label: '3 mins', value: {duration: 180, increment: 0}, type: 'blitz'},
   {label: '3 | 2 mins', value: {duration: 180, increment: 2}, type: 'blitz'},
   {label: '5 mins', value: {duration: 300, increment: 0}, type: 'blitz'},
   {label: '10 mins', value: {duration: 600, increment: 0}, type: 'rapid'},
   {label: '10 | 5 mins', value: {duration: 600, increment: 5}, type: 'rapid'},
   {label: '15 mins', value: {duration: 900, increment: 0}, type: 'rapid'},
]

export const defaultBoard = [
   {square: "a8", cellColor: "w"},
   {square: "b8", cellColor: "b"},
   {square: "c8", cellColor: "w"},
   {square: "d8", cellColor: "b"},
   {square: "e8", cellColor: "w"},
   {square: "f8", cellColor: "b"},
   {square: "g8", cellColor: "w"},
   {square: "h8", cellColor: "b"},
   {square: "a7", cellColor: "b"},
   {square: "b7", cellColor: "w"},
   {square: "c7", cellColor: "b"},
   {square: "d7", cellColor: "w"},
   {square: "e7", cellColor: "b"},
   {square: "f7", cellColor: "w"},
   {square: "g7", cellColor: "b"},
   {square: "h7", cellColor: "w"},
   {square: "a6", cellColor: "w"},
   {square: "b6", cellColor: "b"},
   {square: "c6", cellColor: "w"},
   {square: "d6", cellColor: "b"},
   {square: "e6", cellColor: "w"},
   {square: "f6", cellColor: "b"},
   {square: "g6", cellColor: "w"},
   {square: "h6", cellColor: "b"},
   {square: "a5", cellColor: "b"},
   {square: "b5", cellColor: "w"},
   {square: "c5", cellColor: "b"},
   {square: "d5", cellColor: "w"},
   {square: "e5", cellColor: "b"},
   {square: "f5", cellColor: "w"},
   {square: "g5", cellColor: "b"},
   {square: "h5", cellColor: "w"},
   {square: "a4", cellColor: "w"},
   {square: "b4", cellColor: "b"},
   {square: "c4", cellColor: "w"},
   {square: "d4", cellColor: "b"},
   {square: "e4", cellColor: "w"},
   {square: "f4", cellColor: "b"},
   {square: "g4", cellColor: "w"},
   {square: "h4", cellColor: "b"},
   {square: "a3", cellColor: "b"},
   {square: "b3", cellColor: "w"},
   {square: "c3", cellColor: "b"},
   {square: "d3", cellColor: "w"},
   {square: "e3", cellColor: "b"},
   {square: "f3", cellColor: "w"},
   {square: "g3", cellColor: "b"},
   {square: "h3", cellColor: "w"},
   {square: "a2", cellColor: "w"},
   {square: "b2", cellColor: "b"},
   {square: "c2", cellColor: "w"},
   {square: "d2", cellColor: "b"},
   {square: "e2", cellColor: "w"},
   {square: "f2", cellColor: "b"},
   {square: "g2", cellColor: "w"},
   {square: "h2", cellColor: "b"},
   {square: "a1", cellColor: "b"},
   {square: "b1", cellColor: "w"},
   {square: "c1", cellColor: "b"},
   {square: "d1", cellColor: "w"},
   {square: "e1", cellColor: "b"},
   {square: "f1", cellColor: "w"},
   {square: "g1", cellColor: "b"},
   {square: "h1", cellColor: "w"},
];

export const parseGameHistory = (movesArray) => {
   const parsedMoves = [];

   for (let i = 0; i < movesArray.length; i += 2) {
      const turn = Math.ceil((i + 1) / 2);
      const whiteMove = movesArray[i];
      const blackMove = movesArray[i + 1] || '';

      parsedMoves.push({
         turn,
         whiteMove,
         blackMove,
      });
   }

   return parsedMoves;
}

