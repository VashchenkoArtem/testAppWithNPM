import { Router } from "express"
import { userController } from "./user.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();

userRouter.post("/users/registration", userController.registration)
userRouter.post("/users/login", userController.login)
userRouter.get("/users/me",AuthMiddleware, userController.me)

export default userRouter