import {getOnlineUsers} from "../../serverStore.js";

export const redirectUserToGame = (socket,data) => {
   // socket.get
   const onlineUsers = getOnlineUsers()
   // {opponentID: op, gameID: string}
   // socket.to().emit("opponent-accepted-game",(data));
}
