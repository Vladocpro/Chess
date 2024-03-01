import * as serverStore from "./serverStore.js";
import {Server} from "socket.io";
import {verifyTokenSocket} from "./middleware/authSocket.js";
import {redirectUserToGame} from "./controllers/socket/socketHandler.js";
import {getOnlineUsers,removeConnectedUser} from "./serverStore.js";

export const registerSocketServer = (server) => {
   const io = new Server(server,{
      cors: {
         origin: "*",
         methods: ["GET","POST"],
      },
   })


   serverStore.setSocketServerInstance(io);
   io.use((socket,next) => {
      verifyTokenSocket(socket,next);
   });


   io.on("connection",(socket) => {
      console.log("user connected");

      serverStore.addNewConnectedUser({
         socketID: socket.id,
         userID: socket.user.userID,
      });

      socket.on("direct-message",(data) => {
         console.log(data)
         // directMessageHandler(socket,data);
      });

      socket.on("user-accepted-game",(data) => {
         redirectUserToGame(socket,data)
      });

      socket.on("opponent-accepted-game",(data) => {

      });

      socket.on('disconnect',(data) => {
         removeConnectedUser(socket.id)
      });
      //
      // socket.on("direct-chat-history",(data) => {
      //    directChatHistoryHandler(socket,data);
      // });
      //
      // socket.on("room-create",() => {
      //    roomCreateHandler(socket);
      // });
      //
      // socket.on("room-join",(data) => {
      //    roomJoinHandler(socket,data);
      // });
      //
      // socket.on("room-leave",(data) => {
      //    roomLeaveHandler(socket,data);
      // });
      //
      // socket.on("conn-init",(data) => {
      //    roomInitializeConnectionHandler(socket,data);
      // });
      //
      // socket.on("conn-signal",(data) => {
      //    roomSignalingDataHandler(socket,data);
      // });
      //
      // socket.on("disconnect",() => {
      //    disconnectHandler(socket);
      // });
   });


};



