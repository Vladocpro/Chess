import * as serverStore from "./serverStore.js";
import {Server} from "socket.io";
import {verifyTokenSocket} from "./middleware/authSocket.js";
import {
   opponentMadeMove,
   redirectUserToGame,
   resignGame,
   sendDrawOfferToOpponent,setGameDraw,setGameOver,
   userAcceptedDrawOffer,userRejectedDrawOffer
} from "./controllers/socket/socketHandler.js";
import {getOnlineUsers,getUserByID,removeConnectedUser} from "./serverStore.js";

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

      socket.on("user-accepted-game",(data) => {
         redirectUserToGame(socket,data)
      });

      socket.on("user-resigned-game",(resignitionInfo) => {
         resignGame(socket,resignitionInfo)
      })

      socket.on("user-sent-draw-offer",(drawPayload) => {
         sendDrawOfferToOpponent(socket,drawPayload)
      })
      socket.on("user-accepted-draw-offer",(drawPayload) => {
         userAcceptedDrawOffer(socket,drawPayload)
      })
      socket.on("user-rejected-draw-offer",(drawPayload) => {
         userRejectedDrawOffer(socket,drawPayload)
      })
      socket.on("user-made-move",(drawPayload) => {
         opponentMadeMove(socket,drawPayload)
      })
      socket.on("set-game-over",(payload) => {
         setGameOver(socket,payload)
      })
      socket.on("set-game-draw",(payload) => {
         setGameDraw(socket,payload)
      })

      socket.on('disconnect',(data) => {
         removeConnectedUser(socket.id)
      });
      // setInterval(() => {
      //    console.log(getOnlineUsers())
      // },[2000])
   });


};



