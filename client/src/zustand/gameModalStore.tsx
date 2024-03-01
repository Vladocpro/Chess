import create from 'zustand';
import {IModalPlayerInfo} from "../components/Board/GameTypes.ts";

export interface IGameModalOnOpen {
   isOnline: boolean;
   leftPlayer: IModalPlayerInfo;
   rightPlayer: IModalPlayerInfo;
   outcomeText: string;
}

interface GameModalStore {
   isOpen: boolean;
   isOnline: boolean;
   leftPlayer: IModalPlayerInfo;
   rightPlayer: IModalPlayerInfo;
   outcomeText: string;
   openModal: (payload: IGameModalOnOpen) => void;
   closeModal: () => void;
}

const useGameModal = create<GameModalStore>((set) => ({
   isOpen: false,
   isOnline: false,
   leftPlayer: {
      username: '',
      outcome: '',
   },
   rightPlayer: {
      username: '',
      outcome: '',
   },
   outcomeText: '',
   openModal: (payload: IGameModalOnOpen) => {
      set({
         isOpen: true,
         isOnline: payload.isOnline,
         leftPlayer: payload.leftPlayer,
         rightPlayer: payload.rightPlayer,
         outcomeText: payload.outcomeText,
      });
   },
   closeModal: () => {
      set({
         isOpen: false
      });
   },
}));

export default useGameModal;
