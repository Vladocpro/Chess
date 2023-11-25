import express from "express";
import {controllers} from "../controllers/auth/authController.js";
import * as validations from "../utils/validations.js";
import {verifyToken} from "../middleware/auth.js";

export const authRoutes = express.Router();

authRoutes.post(
    "/register",
    validations.registerValidation,
    controllers.register
);
authRoutes.post(
    "/login",
    validations.loginValidation,
    controllers.login
);

authRoutes.get(
    "/getUser",
    verifyToken,
    controllers.getUser
);

