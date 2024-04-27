import create from "zustand";
import {IGameInvitation} from "../types.ts";

interface rematchStore {
   rematch?: IGameInvitation;
   setRematch: (payload: IGameInvitation | undefined) => void;
}


const useRematch = create<rematchStore>((set) => ({
   rematch: undefined,
   setRematch: (payload: IGameInvitation | undefined) => {
      set({rematch: payload})
   },
}));

export default useRematch;
