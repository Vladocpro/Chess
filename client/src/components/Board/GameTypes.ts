export interface Cell {
   square: string;
   type: string;
   color: string;
   cellColor: string;
}

export interface IGameHistory {
   turn: string;
   whiteMove: string;
   blackMove: string;
}
