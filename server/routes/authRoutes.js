import Joi from 'joi'
import express from "express";
import { createValidator } from "express-joi-validation";
import {controllers} from "../controllers/auth/authController.js";


const validator = createValidator();
export const authRoutes  = express.Router();

const registerSchema = Joi.object({
   username: Joi.string().min(3).max(18).required(),
   email: Joi.string().email().required(),
   password: Joi.string().min(6).max(18).required(),
});

const loginSchema = Joi.object({
   email: Joi.string().email().required(),
   password: Joi.string().min(6).max(18).required(),
});

authRoutes.post(
    "/register",
    validator.body(registerSchema),
    controllers.register
);
authRoutes.post(
    "/login",
    validator.body(loginSchema),
    controllers.login
);

