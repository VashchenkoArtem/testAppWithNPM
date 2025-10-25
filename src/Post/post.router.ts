import express from "express"
import requestController from "./post.controller";

const postRouter = express.Router();


postRouter.get('/posts', requestController.getPosts)
postRouter.post('/posts', requestController.createPost)
postRouter.get("/posts/:id", requestController.getPostById)
postRouter.patch("/posts/:id", requestController.updatePostById)
postRouter.delete("/posts/:id", requestController.deletePostById)

export default postRouter