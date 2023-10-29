import * as serverStore from "./serverStore.js";
import { Server } from "socket.io";

export const registerSocketServer = (server) => {
   const io = new Server(server,{
      cors: {
         origin: "*",
         methods: ["GET","POST"],
      },
   })


   serverStore.setSocketServerInstance(io);
};
