import create from "zustand";


export interface INextTurnPayload {
   pgn: string;
   playerTimeLeft: number;
   opponentTimeLeft: number;
}

interface gameStore {
   isFinished: boolean;
   pgn: string;
   playerTimeLeft: number;
   opponentTimeLeft: number;
   setIsFinished: (payload: boolean) => void;
   setNextTurn: (payload: INextTurnPayload) => void;
}


const useGameState = create<gameStore>((set) => ({
   isFinished: false,
   pgn: '',
   playerTimeLeft: 0,
   opponentTimeLeft: 0,
   setIsFinished: (payload: boolean) => {
      set({isFinished: payload})
   },
   setNextTurn: (payload: INextTurnPayload) => {
      set({
         pgn: payload.pgn,
         playerTimeLeft: payload.playerTimeLeft,
         opponentTimeLeft: payload.opponentTimeLeft,
      })
   }
}));

export default useGameState;
