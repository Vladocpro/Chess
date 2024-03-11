import express from "express";
import * as validations from "../utils/validations.js";
import {verifyToken} from "../middleware/auth.js";
import {controllers} from "../controllers/game/gameControllers.js";

export const gameRoutes = express.Router();

gameRoutes.get(
    "/getUserGames/:id",
    verifyToken,
    controllers.getUserGames
);
gameRoutes.get(
    "/getGame/:id",
    verifyToken,
    controllers.getGame
);

