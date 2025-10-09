import express from "express"
import requestControllerUsers from "./users.controller";

const userRouter = express.Router();


userRouter.get("/users", requestControllerUsers.getUsers)
userRouter.get("/users/:id", requestControllerUsers.getUserById)

export default userRouter