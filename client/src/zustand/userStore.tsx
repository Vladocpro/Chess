import create from "zustand";
import {IGame, UserClub, UserFriend} from "../types.ts";

interface userData {
   userID: string,
   username: string,
   friends: UserFriend[],
   club: UserClub,
   rating: number,
   gameHistory: IGame[],
}

interface userStore {
   userID: string,
   username: string,
   friends: UserFriend[],
   club: null | UserClub,
   rating: number,
   gameHistory: IGame[],
   setUser: (data: userData) => void,
   setFriends: (data: UserFriend[]) => void,
   setClub: (data: null | UserClub) => void,
}

const useUser = create<userStore>((set) => ({
   userID: '',
   username: '',
   friends: [],
   club: null,
   rating: 0,
   gameHistory: [],
   setUser: (payload: userData) => set({
      userID: payload.userID,
      username: payload.username,
      friends: payload.friends,
      club: payload.club,
      rating: payload.rating,
      gameHistory: payload.gameHistory
   }),
   setFriends: (payload: UserFriend[]) => set({
      friends: payload,
   }),
   setClub: (payload: UserClub | null) => set({
      club: payload,
   }),
   setGameHistory: (payload: IGame[]) => set({
      gameHistory: payload,
   })
}));

export default useUser;
