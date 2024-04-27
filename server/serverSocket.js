import * as serverStore from "./serverStore.js";
import {Server} from "socket.io";
import {verifyTokenSocket} from "./middleware/authSocket.js";
import {
   playerTimerExpired,
   redirectUserToGame,
   resignGame,
   sendDrawOfferToOpponent,sendFriendInvitation,sendGameInvitation,sendRematch,setGameDraw,setGameOver,
   userAcceptedDrawOffer,userMadeMove,userRejectedDrawOffer
} from "./controllers/socket/socketHandler.js";
import {
   connectUserToActiveGame,
   getOnlineGames,
   getOnlineUsers,playerLeftGame,
   removeConnectedUser
} from "./serverStore.js";

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

      // Clear the timer if the user reconnects before timeout (find active games and check for timeout clear it)
      // socket.on('reconnect',() => {
      //    console.log('Reconnected')
      //    console.log(timeoutId)
      //    clearTimeout(timeoutId);
      //    console.log(timeoutId)
      //
      // });

      serverStore.addNewConnectedUser({
         socketID: socket.id,
         userID: socket.user.userID,
      });

      socket.on("connect-user-to-active-game",(data) => {
         connectUserToActiveGame(socket,data)
      });

      socket.on("player-left-game",(data) => {
         console.log("player-left-game")
         console.log(data)
         playerLeftGame(socket,data)
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
         userMadeMove(socket,drawPayload)
      })
      socket.on("set-game-over",(payload) => {
         setGameOver(socket,payload)
      })
      socket.on("set-game-draw",(payload) => {
         setGameDraw(socket,payload)
      })

      socket.on("send-game-invitation",(payload) => {
         sendGameInvitation(socket,payload)
      })
      socket.on("send-friend-invitation",(payload) => {
         sendFriendInvitation(socket,payload)
      })

      socket.on("send-rematch",(payload) => {
         sendRematch(socket,payload)
      })

      socket.on("player-time-expired",(payload) => {
         playerTimerExpired(socket,payload)
      })

      socket.on('disconnect',(data) => {
         removeConnectedUser(socket.id)

         console.log('Disconnect')
         console.log(socket.user)

         // In active games find user and timeout, set timeout.

         console.log('Disconnect event')
         // Set a 15-second timer for reconnection
         const timeoutId = setTimeout(() => {
            // Mock writing to DB: User lost the game (replace with actual DB write logic)
            console.log(`User ${socket.id} (Room: ) timed out and lost the game.`);
            // Broadcast "user-lost" event to remaining players (if applicable)
            // io.in(roomName).emit('user-lost',socket.id);
         },15000); // 15 seconds in milliseconds

      });
      setInterval(() => {
         // console.log(getOnlineGames())
      },4500)
   });


};



