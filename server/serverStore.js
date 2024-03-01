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

export const addNewConnectedUser = ({socketID,userID}) => {

   // const lastOccurrences = new Map();

   // for (const [key,user] of connectedUsers) {
   //    if (userID === user.userID) {
   //       connectedUsers.delete(key);
   //    }
   // lastOccurrences.set(user.userID,key);
   // }
   connectedUsers.set(socketID,{userID});

   // for (const [key,user] of connectedUsers) {
   //    if (key !== lastOccurrences.get(user.userID)) {
   //       userMap.delete(key);
   //    }
   // }
   // connectedUsers.set(socketID,{userID});
   console.log("new connected users");
   console.log(connectedUsers);
};

export const removeConnectedUser = (socketID) => {
   // console.log(socketID)
   for (const [key,user] of connectedUsers) {
      if (socketID === key) {
         connectedUsers.delete(key);
         console.log('REmoved this user')
         console.log(`${key} + ${socketID}`)
      }
      // lastOccurrences.set(user.userID,key);
   }
}



