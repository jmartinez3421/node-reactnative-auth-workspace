// Path: /api/auth

import { Router } from "express";
import { AuthValidators } from "@/routes/validators";
import { AuthController } from "@/controllers";

export const authRouter = Router();

//Public - Login
authRouter.post("/login", AuthValidators.Login, AuthController.Login);

//Private - Renew token
authRouter.get("/renew", AuthValidators.Renew, AuthController.Renew);

//Public - Request a new password
authRouter.post("/forgot-password", AuthValidators.ForgotPassword, AuthController.RequestNewPassword);

//Public - Reset the password
authRouter.post("/reset-password", AuthValidators.ResetPassword, AuthController.ResetPassword);
