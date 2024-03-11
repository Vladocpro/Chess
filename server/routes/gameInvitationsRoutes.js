import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {controllers} from "../controllers/gameInvitations/gameInvitationsControllers.js";

export const gameInvitationsRoutes = express.Router();

gameInvitationsRoutes.post(
    "/invite",
    verifyToken,
    controllers.inviteGame
);
gameInvitationsRoutes.post(
    "/accept",
    verifyToken,
    controllers.acceptGame
);
gameInvitationsRoutes.post(
    "/reject",
    verifyToken,
    controllers.rejectGame
);
gameInvitationsRoutes.get(
    "/getGameInvitations",
    verifyToken,
    controllers.getGameInvitations
);


