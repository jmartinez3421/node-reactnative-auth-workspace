// Path: /api/user

import { Router } from "express";
import { UserValidators } from "@/routes/validators";
import { UserController } from "@/controllers";

export const userRouter = Router();

//Private - Only gets the information of the logged user
userRouter.get("/", UserValidators.Read, UserController.GetUser);

//Private - Updates the information of the logged user
userRouter.put("/", UserValidators.Update, UserController.UpdateUser);

//Public - Creates a new user
userRouter.post("/", UserValidators.Create, UserController.CreateUser);

//Private - Deletes the logged user (deactivate)
userRouter.delete("/", UserValidators.Delete, UserController.DeleteUser);
