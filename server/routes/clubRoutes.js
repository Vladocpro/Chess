import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {controllers} from "../controllers/club/clubControllers.js";

export const clubRoutes = express.Router();

clubRoutes.get(
    "/getPopulars",
    controllers.getPopularClubs
);
clubRoutes.get(
    "/find/:clubname",
    controllers.findClub
);
clubRoutes.get(
    "/get/:id",
    controllers.getClub
);
clubRoutes.post(
    "/create",
    verifyToken,
    controllers.createClub
);
clubRoutes.post(
    "/join",
    verifyToken,
    controllers.joinClub
);
clubRoutes.post(
    "/leave",
    verifyToken,
    controllers.leaveClub
);




