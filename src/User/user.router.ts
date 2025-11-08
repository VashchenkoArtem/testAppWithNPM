import { Router } from "express"
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.post("/user/registration", userController.registration)
userRouter.post("/user/login", userController.login)

export default userRouter