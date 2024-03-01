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


export interface IMove {
   color: string,
   piece: string,
   from: string,
   to: string,
   san: string,
   flags: string,
   lan: string,
   before: string,
   after: string,
   captured?: string,
   promotion?: string
}

export interface ICapturedPieces {
   w: userCapturedPieces;
   b: userCapturedPieces;
}

export interface userCapturedPieces {
   p: number,
   n: number,
   b: number,
   r: number,
   q: number
}

export interface IModalPlayerInfo {
   username: string;
   outcome: string;
}




