import express from "express"
import requestController from "./post.controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const postRouter = express.Router();


postRouter.get('/posts', requestController.getPosts)
postRouter.post('/posts',AuthMiddleware, requestController.createPost)
postRouter.get("/posts/:id", requestController.getPostById)
postRouter.patch("/posts/:id",AuthMiddleware, requestController.updatePostById)
postRouter.delete("/posts/:id",AuthMiddleware, requestController.deletePostById)
postRouter.post("/posts/:postId/comments", AuthMiddleware, requestController.createComment)
postRouter.put("/posts/:postId/likes/", AuthMiddleware, requestController.likePost)
postRouter.delete("/posts/:postId/likes/", AuthMiddleware, requestController.unlikePost)
postRouter.get("/posts/:postId/checkLikes", AuthMiddleware, requestController.checkLike)

export default postRouter