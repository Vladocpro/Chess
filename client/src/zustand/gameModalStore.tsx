import create from 'zustand';
import {IModalPlayerInfo} from "../components/Board/GameTypes.ts";

export interface IGameModalOnOpen {
   type: 'draw' | 'rematch' | 'regular' | 'training',
   leftPlayer?: IModalPlayerInfo;
   rightPlayer?: IModalPlayerInfo;
   outcomeText: string;
}

interface GameModalStore {
   isOpen: boolean,
   type: 'draw' | 'rematch' | 'regular' | 'training',
   leftPlayer?: IModalPlayerInfo;
   rightPlayer?: IModalPlayerInfo;
   outcomeText: string;
   openModal: (payload: IGameModalOnOpen) => void;
   closeModal: () => void;
}

const useGameModal = create<GameModalStore>((set) => ({
   isOpen: false,
   type: 'regular',
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
         type: payload.type,
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
