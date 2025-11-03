import {client} from "../client/client"
import { IRepositoryContract } from "./post.types"


export const PostRepository: IRepositoryContract ={
    getPosts: async(paramsObj) => {
        try{
            const {skip, take} = { ...paramsObj.params }
            const posts = await client.post.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
            })
            return posts
        }catch(error){
            throw error
        }
    },
    createPost: async(posts) => {
        try{
            const newPosts = await client.post.createMany({
                data: posts
            })
            return newPosts
        }catch(error){
            throw error
        }
    },
    getPostById: async(postId) => {
        try{
            const postById = await client.post.findUnique({
                where: {
                    id: postId
                }
            })
            return postById
        }
        catch(error)
        {
            throw error
        }
    },
    updatePostById: async(postId, data) => {
        try{

            const updatedPost = await client.post.update({where: 
            {id: postId}
            ,  data: {
            title: data.title,
            description: data.description,
            image: data.image,
            tags: data.tags,
            }})
            return updatedPost
        }catch(error){
            throw error
        }
    },
    deletePostById: async(postId) => {
        try{
            const post = await client.post.delete({
                where: {
                    id: postId
                }
            })
            return {
                "status": "Succes",
                "data": post
            }
        }catch(error){
            throw error
        }
    }
}