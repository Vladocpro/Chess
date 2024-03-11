const connectedUsers = new Map();
let activeGames = [];

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

export const getUserByID = (userID) => {
   for (const [key,user] of connectedUsers) {
      if (userID === user.userID) {
         return key
      }
   }
};

export const addNewConnectedUser = ({socketID,userID}) => {

   // const lastOccurrences = new Map();

   for (const [key,user] of connectedUsers) {
      if (userID === user.userID) {
         connectedUsers.delete(key);
      }
   }
   connectedUsers.set(socketID,{userID});
   console.log("new connected users");
   console.log(connectedUsers);
};

export const removeConnectedUser = (socketID) => {
   connectedUsers.delete(socketID)
}



