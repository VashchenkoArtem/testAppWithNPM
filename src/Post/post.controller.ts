// const service = require("./post.service")
import requestService from "./post.service"
// import type { Request, Response } from "express"
import {CreatePostData, IQueryParams, IStatus, Post} from "./post.types"
import { IControllerContract } from "./post.types"

const requestController: IControllerContract = {
    getPosts: (req, res) => {
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
    const response: IStatus<Post[]> = requestService.getPosts(query);

    if (response.status === "incorrect number") {
        res.status(400).json("Please, enter a correct number in parameters!");
        return;
    }

    res.status(200).json(response.data);
    },
    createPost: async (req, res): Promise<void> => {
        let data: CreatePostData = req.body;
        const response = await requestService.createPost(data);
        if (response.status === "data incorrect"){
            res.status(422).json("Please, enter data correctly!");
            return;
        }
    
        res.status(201).json(response.data);
    },
    getPostById: (req, res) => {
        const postId: number = Number(req.params.id);
        const response: IStatus<Post> = requestService.getPostById(postId);
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
    updatePostById: (req, res) => {
        const postId: number | undefined = Number(req.params.id)
        const post: Post = req.body
        const response = requestService.updatePostById(postId, post)
        if (response.status === "error"){
            res.status(404).json(response.message);
            return;
        }
        if (!(typeof post.id === "number" || typeof post.id === "undefined") || !(typeof post.title === "string" || typeof post.title === "undefined") || !(typeof post.description === "string" || typeof post.description === "undefined") || !(typeof post.image === "string" || typeof post.image === "undefined")){
            res.status(400).json("Please, enter updated fields correctly!");
        }
        res.status(200).json(response.data);
    } 
}

export default requestController