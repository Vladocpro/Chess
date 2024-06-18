import Game from "./models/Game.js";
import {playerAbandonedGame} from "./controllers/game/gameUtils.js";

const connectedUsers = new Map();
const activeGames = new Map();

let io = null;

export const setSocketServerInstance = (ioInstance) => {
   io = ioInstance;
};

export const getSocketServerInstance = () => {
   return io;
};

export const getOnlineUsers = () => {
   const onlineUsers = [];

   connectedUsers.forEach((value,key) => {
      onlineUsers.push({socketID: key,userID: value.userID});
   });

   return onlineUsers;
};

export const getOnlineGames = () => {
   return activeGames;
};

export const getUserByID = (userID) => {
   for (const [key,user] of connectedUsers) {
      if (userID === user.userID) {
         return key
      }
   }
};

export const addNewConnectedUser = ({socketID,userID}) => {
   connectedUsers.delete(socketID);
   connectedUsers.set(socketID,{userID});
};

export const connectUserToActiveGame = async (socket,data) => {
   try {
      const game = await Game.findById(data.gameID)
      if (game === null || game === undefined || game.isFinished) {
         return
      }
      let socketGame = activeGames.get(data.gameID)

      if (socketGame === undefined) {
         if (game.user1.userID.toString() === data.userID) {
            activeGames.set(
                data.gameID,
                {
                   player1: {
                      userID: data.userID,
                      username: data.username,
                      inGame: true,
                      timeout: undefined
                   },
                   player2: undefined
                }
            )
         } else {
            activeGames.set(
                data.gameID,
                {
                   player2: {
                      userID: data.userID,
                      username: data.username,
                      inGame: true,
                      timeout: undefined
                   },
                   player1: undefined
                }
            )
         }

      } else {
         if (game.user1.userID.toString() === data.userID) {
            socketGame.player1 = {
               userID: data.userID,
               username: data.username,
               inGame: true,
               timeout: undefined
            }
         } else {
            socketGame.player2 = {
               userID: data.userID,
               username: data.username,
               inGame: true,
               timeout: undefined
            }
         }
      }
   } catch (e) {
      console.log(e)
   }
}
export const playerLeftGame = async (socket,payload) => {

   let game = activeGames.get(payload.gameID)
   if (game === undefined) {
      return
   }
   if (payload.userID === game.player1.userID) {
      game.player1.timeout = setTimeout(() => playerAbandonedGame(payload.gameID,payload.userID,socket),15000)
   } else {
      game.player2.timeout = setTimeout(() => playerAbandonedGame(payload.gameID,payload.userID,socket),15000)
   }
}

export const playerReconnectedToGame = (socket,payload) => {

   let game = activeGames.get(payload.gameID)
   if (game === undefined) return

   if (payload.userID === game.player1?.userID) {
      if (game.player1 !== undefined) {
         clearTimeout(game.player1?.timeout)
         game.player1.timeout = undefined
      }
   } else {
      if (game.player2 !== undefined) {
         clearTimeout(game.player2?.timeout)
         game.player2.timeout = undefined
      }
   }

}


export const removeConnectedUser = (socketID) => {
   connectedUsers.delete(socketID)
}

export const removeActiveGame = (gameID) => {
   activeGames.delete(gameID)
}



