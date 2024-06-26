import create from "zustand";
import {IRematchInvitation} from "../types.ts";

interface rematchStore {
   rematch?: IRematchInvitation;
   setRematch: (payload: IRematchInvitation | undefined) => void;
}


const useRematch = create<rematchStore>((set) => ({
   rematch: undefined,
   setRematch: (payload: IRematchInvitation | undefined) => {
      set({rematch: payload})
   },
}));

export default useRematch;
