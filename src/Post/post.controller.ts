// const service = require("./post.service")
import requestService from "./post.service"
// import type { Request, Response } from "express"
import {CreatePost, IQueryParams, IStatus, Post, UpdatePost} from "./post.types"
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
        const response: IStatus<Post[]> = await requestService.getPosts(query);
        if (response.status === "incorrect number"){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        res.status(200).json(response.data);
    },
    createPost: async (req, res): Promise<void> => {
            let data: CreatePost | CreatePost[] = req.body;
            const response: IStatus<CreatePost[]> = await requestService.createPost(data);
            if (response.status === "data incorrect"){
                res.status(422).json("Please, enter data correctly!");
                return;
            }
            console.log("response start")
            console.log(response.data);
            console.log("response finish")
            res.status(201).json(response.data);
    },
    getPostById: async (req, res): Promise<void> => {
        const postId: number = Number(req.params.id);
        const response: IStatus<Post> = await requestService.getPostById(postId);
        if (response.status === "incorrect number"){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        if (response.status === "not found"){
            res.status(404).json("Post with this ID is not found!");
            return;
        }
        res.status(200).json(response.data);
    },
    updatePostById: async (req, res) => {
        const postId: number | undefined = Number(req.params.id)
        const post: UpdatePost = req.body
        const response: IStatus<UpdatePost> = await requestService.updatePostById(postId, post);
        if (response.status === "error") {
            res.status(404).json(response.message);
            return;
        }
        if (!(typeof post.title === "string" || typeof post.title === "undefined") || !(typeof post.description === "string" || typeof post.description === "undefined") || !(typeof post.image === "string" || typeof post.image === "undefined")){
            res.status(400).json("Please, enter updated fields correctly!");
            return;
        }
        res.status(200).json(response.data);
    },
    deletePostById: async (req, res) => {
        const postId = Number(req.params.id)
        const response: IStatus<Post> = await requestService.deletePostById(postId)
        res.status(200).json(response.data)
    }
} 

export default requestController