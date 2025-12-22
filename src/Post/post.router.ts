import express from "express"
import requestController from "./post.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const postRouter = express.Router();


postRouter.get('/posts', requestController.getPosts)
postRouter.post('/posts',AuthMiddleware, requestController.createPost)
postRouter.get("/posts/:id",AuthMiddleware, requestController.getPostById)
postRouter.patch("/posts/:id",AuthMiddleware, requestController.updatePostById)
postRouter.delete("/posts/:id",AuthMiddleware, requestController.deletePostById)
postRouter.post("/posts/:postId/comments", AuthMiddleware, requestController.createComment)
postRouter.put("/posts/:postId/likes/:userId", AuthMiddleware, requestController.likePost)
postRouter.delete("/posts/:postId/likes/:userId", AuthMiddleware, requestController.unlikePost)
export default postRouter