import {Chess} from 'chess.js'

let chess = new Chess()
export const clearChess = () => {
   chess.clear();
}
export const loadPgn = (pgn: string) => {
   chess.loadPgn(pgn);
}
export const getPgn = () => {
   return chess.pgn();
}

