import {io} from "socket.io-client";

let socket: any = null;


export const connectWithSocketServer = (token: string) => {

   socket = io(import.meta.env.VITE_SERVER_URL, {
      auth: {
         token: token,
      },
   });

   socket.on("connect", () => {
      console.log("succesfully connected with socket.io server");
      console.log('HEEEEE')
      console.log(socket.id);
   });

   socket.on("opponent-accepted-game", (gameID: string) => {
      relocateToTheGame(gameID)
   });
   //
   // socket.on("friends-list", (data) => {
   //    const {friends} = data;
   //    store.dispatch(setFriends(friends));
   // });
   //
   // socket.on("online-users", (data) => {
   //    const {onlineUsers} = data;
   //    store.dispatch(setOnlineUsers(onlineUsers));
   // });
   // socket.on("direct-chat-history", (data) => {
   //    console.log(data);
   //    updateDirectChatHistoryIfActive(data);
   // });
   // socket.on("room-create", (data) => {
   //    console.log(data)
   //    roomHandler.newRoomCreated(data);
   // });
   //
   // socket.on("active-rooms", (data) => {
   //    roomHandler.updateActiveRooms(data);
   // });
   //
   // socket.on("conn-prepare", (data) => {
   //    const {connUserSocketId} = data;
   //    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
   //    socket.emit("conn-init", {connUserSocketId: connUserSocketId});
   // });
   //
   // socket.on("conn-init", (data) => {
   //    const {connUserSocketId} = data;
   //    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
   // });
   //
   // socket.on("conn-signal", (data) => {
   //    webRTCHandler.handleSignalingData(data);
   // });
   //
   // socket.on("room-participant-left", (data) => {
   //    console.log("user left room");
   //    webRTCHandler.handleParticipantLeftRoom(data);
   // });


};

export const relocateToTheGame = (gameID: string) => {
   window.location.assign(`/play/${gameID}`)
   socket.emit("direct-message", 'Bonjour');
};

export const acceptGameInvitation = (invitationInfo) => {
   socket.emit("user-accepted-game", invitationInfo)
}
