// const service = require("./post.service")
import requestService from "./post.service"
import type { Request, Response } from "express"

interface queryParams {
    skip?: string,
    take?: string,
    filter?: string
}

const requestController = {
getPosts: (req: Request, res: Response) => {
    const query: queryParams = {};
    if (req.query.skip) {
        query.skip = String(req.query.skip);
    }
    if (req.query.take){
        query.take = String(req.query.take);
    } 
    if (req.query.filter){
        query.filter = String(req.query.filter);
    }
    const response = requestService.getPosts(query);

    if (response.status === "incorrect number") {
        res.status(400).json("Please, enter a correct number in parameters!");
        return;
    }

    res.status(200).json(response.data);
    },
    createPost: async (req: Request, res: Response) => {
        let data = req.body;
        const response = await requestService.createPost(data);
        if (response.status === "data incorrect"){
            res.status(422).json("Please, enter data correctly!");
            return;
        }
    
        res.status(201).json(response.data);
    },
    getPostById: (req: Request, res: Response) => {
        const postId: number = Number(req.params.id);
        const response = requestService.getPostById(postId);
        if (response.status === "incorrect number"){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        if (response.status === "not found"){
            res.status(404).json("Post with this ID is not found!");
            return;
        }
        res.status(200).json(response.data);
    }

}

export default requestController