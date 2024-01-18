import create from "zustand";
import {UserClub, UserFriend} from "../types.ts";

interface userData {
   userID: string,
   username: string,
   friends: UserFriend[],
   club: string,
   rating: number,
}

interface userStore {
   userID: string,
   username: string,
   friends: UserFriend[],
   club:   null | UserClub,
   rating: number,
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
   setUser: (payload: userData) => set({
      userID: payload.userID,
      username: payload.username,
      friends: payload.friends,
      club: payload.club,
      rating: payload.rating,
   }),
   setFriends: (payload) => set({
      friends: payload,
   }),
   setClub: (payload) => set({
      club: payload,
   })
}));

export default useUser;
