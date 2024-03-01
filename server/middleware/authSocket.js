import jwt from "jsonwebtoken";
import {config} from "dotenv";

config()

export const verifyTokenSocket = (socket,next) => {
   const token = socket.handshake.auth?.token;

   try {
      const decoded = jwt.verify(token,process.env.TOKEN_KEY);
      socket.user = decoded;
   } catch (err) {
      const socketError = new Error("NOT_AUTHORIZED");
      return next(socketError);
   }

   next();
};

