import express from "express";
import cors from "cors"
import {config} from "dotenv";
import http from "http";
import * as socketServer from "./serverSocket.js";
import {authRoutes} from './routes/authRoutes.js'
import mongoose from "mongoose";
import {friendRoutes} from "./routes/friendRoutes.js";
import {clubRoutes} from "./routes/clubRoutes.js";
import {gameInvitationsRoutes} from "./routes/gameInvitationsRoutes.js";

const PORT = process.env.PORT || 4444
const app = express();
app.use(express.json());
app.use(cors());
config();


const server = http.createServer(app);
socketServer.registerSocketServer(server);


app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/game-invitation", gameInvitationsRoutes);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
       server.listen(PORT, () => {
          console.log(`Server is listening on ${PORT}`);
       });
    })
    .catch((err) => {
       console.log("database connection failed. Server not started");
       console.error(err);
    });
