import zustand from 'zustand'
import create from "zustand";

import {ToastOnOpen, ToastPositions, ToastType} from "./toastModalStore.tsx";

interface userData {
   userID: string,
   username: string,
   friends: string[],
   club: string,
   rating: number,
}

interface userStore {
   userID: string,
   username: string,
   friends: string[],
   club: string,
   rating: number,
   setUser: (data: userData) => void,
}

const useUser = create<userStore>((set) => ({
   userID: '',
   username: '',
   friends: [],
   club: '',
   rating: 0,
   setUser: (payload: userData) => set({
      userID: payload.userID,
      username: payload.username,
      friends: payload.friends,
      club: payload.club,
      rating: payload.rating,
   })
}));

export default useUser;
