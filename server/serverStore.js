

const connectedUsers = new Map();
let activeGames = [];

let io = null;

export const setSocketServerInstance = (ioInstance) => {
   io = ioInstance;
};

export const getSocketServerInstance = () => {
   return io;
};
