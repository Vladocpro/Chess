import create from 'zustand';

export interface ToastNotificationType {
   visible: boolean;
   duration: number;
   message: string;
   type: ToastType;
   position: ToastPositions;
}

export interface ToastOnOpen {
   message: string;
   duration?: number;
   type: ToastType;
   position: ToastPositions;
}

export enum ToastPositions {
   AUTH = 'inline-block self-center top-5 left-1/2 translate-x-[-50%]',
   RIGHT = '',
}

export enum ToastType {
   SUCCESS = 'bg-secondaryGreen',
   WARNING = 'bg-yellow-500',
   ERROR = 'bg-red-500',
   BLACK = 'bg-black',
}

interface ToastStore {
   visible: boolean;
   duration: number;
   message: string;
   type: ToastType;
   position: ToastPositions;
   openToast: (payload: ToastOnOpen) => void;
   closeToast: () => void;
}

const useToast = create<ToastStore>((set) => ({
   visible: false,
   message: '',
   duration: 3000,
   position: ToastPositions.AUTH,
   type: ToastType.SUCCESS,

   openToast: (payload: ToastOnOpen) => {
      let tempDuration = 3000
      if (payload.duration) {
         tempDuration = payload.duration;
      }
      set({
         message: payload.message,
         position: payload.position,
         type: payload.type,
         duration: tempDuration,
         visible: true
      });
   },
   closeToast: () => {
      set({
         visible: false
      });
   },
}));

export default useToast;
