import { Router } from "express";
import { AuthValidators } from "@/routes/validators";
import { AuthController } from "@/controllers";

export const authRouter = Router();

authRouter.post("/login", AuthValidators.Login, AuthController.Login);
authRouter.get("/renew", AuthValidators.Renew, AuthController.Renew);
