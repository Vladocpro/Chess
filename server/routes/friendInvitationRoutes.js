import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {controllers} from "../controllers/friend/friendControllers.js";

export const friendInvitationRoutes = express.Router();

friendInvitationRoutes.post(
    "/invite",
    verifyToken,
    controllers.inviteFriend
);
friendInvitationRoutes.post(
    "/accept",
    verifyToken,
    controllers.acceptFriend
);
friendInvitationRoutes.post(
    "/reject",
    verifyToken,
    controllers.rejectFriend
);
friendInvitationRoutes.post(
    "/find",
    verifyToken,
    controllers.findFriend
);
friendInvitationRoutes.post(
    "/remove",
    verifyToken,
    controllers.removeFriend
);
friendInvitationRoutes.get(
    "/getUserInvitations",
    verifyToken,
    controllers.getUserInvitations
);


