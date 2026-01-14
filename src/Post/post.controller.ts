import { PostRepository } from "./post.repository";
import requestService from "./post.service"
import { CreatePost, IQueryParams, IStatus, Post, UpdatePost } from "./post.types"
import { IControllerContract } from "./post.types"


const requestController: IControllerContract = {
    getPosts: async (req, res): Promise<void> => {
        const query: IQueryParams = {};
        if (req.query.skip) {
            query.skip = String(req.query.skip);
        }
        if (req.query.take){
            query.take = String(req.query.take);
        } 
        if (req.query.filter){
            query.filter = String(req.query.filter);
        }
        const response = await requestService.getPosts(query);
        if (response.status === "incorrect number"){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        res.status(200).json(response.data);
    },
    createPost: async (req, res): Promise<void> => {
            const data = req.body;
            const userId = res.locals.userId
            const response: IStatus<CreatePost> = await requestService.createPost(data, userId);
            if (response.status === "data incorrect"){
                res.status(422).json("Please, enter data correctly!");
                return;
            }
            res.status(201).json("Post created succesfuly!");
    },
    getPostById: async (req, res): Promise<void> => {
        const postId = Number(req.params.id);
        const inclusion = String(req.query.include);
        let likedBy = false
        let comments = false
        if (inclusion.includes("likedBy")){
            likedBy = true
        }
        if (inclusion.includes("comments")){
            comments = true
        }
        const response = await requestService.getPostById(postId, likedBy, comments);
        if (response.status === "Problem with ID"){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        if (response.status === "Does not exist"){
            res.status(404).json("Post with this ID is not found!");
            return;
        }
        res.status(200).json(response.data);
    },
    updatePostById: async (req, res) => {
        const postId: number | undefined = Number(req.params.id)
        const post: UpdatePost = req.body
        const response: IStatus<UpdatePost> = await requestService.updatePostById(postId, post);
        if (response.status === "Does not exist") {
            res.status(404).json(response.message);
            return;
        }
        if (response.status === "Problem with ID"){
            res.status(400).json(response.message)
            return;
        }
        res.status(200).json(response.data);
    },
    deletePostById: async (req, res) => {
        const postId = Number(req.params.id)
        const response: IStatus<Post> = await requestService.deletePostById(postId)
        res.status(200).json(response.data)
    },
    createComment: async(req, res) => {
        const content = req.body
        const postId = Number(req.params.postId)
        const authorId = Number(res.locals.userId)
        if (!content){
            res.status(422).json("Please, enter data correctly!");
            return;
        }
        const response = await requestService.createComment(content, authorId, postId)
        if (!response){
            res.status(500).json("Comment doesn`t create!");
            return;
        }
        res.status(201).json(response)
    },
    likePost: async(req, res) => {
        const postId = Number(req.params.postId)
        const userId = Number(res.locals.userId)
        const like = await PostRepository.findLike(postId, userId)
        if (like){
            res.status(400).json("You have already liked this post!")
            return;
        }
        const response = await requestService.likePost(postId, userId)
        res.status(200).json(response)
    },
    unlikePost: async(req, res) => {
        const postId = Number(req.params.postId)
        const userId = Number(res.locals.userId)
        const response = await PostRepository.unlikePost(postId, userId)
        res.status(200).json(response)
    },
    checkLike: async(req, res) => {
        const postId = Number(req.params.postId)
        const userId = Number(res.locals.userId)
        const response = await requestService.checkLike(postId, userId)
        res.status(200).json(response)
    }
} 

export default requestController