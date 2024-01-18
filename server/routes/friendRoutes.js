import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {controllers} from "../controllers/friend/friendControllers.js";

export const friendRoutes = express.Router();

friendRoutes.post(
    "/invite",
    verifyToken,
    controllers.inviteFriend
);
friendRoutes.post(
    "/accept",
    verifyToken,
    controllers.acceptFriend
);
friendRoutes.post(
    "/reject",
    verifyToken,
    controllers.rejectFriend
);
friendRoutes.post(
    "/find",
    verifyToken,
    controllers.findFriend
);
friendRoutes.post(
    "/remove",
    verifyToken,
    controllers.removeFriend
);
friendRoutes.get(
    "/getUserInvitations",
    verifyToken,
    controllers.getUserInvitations
);


