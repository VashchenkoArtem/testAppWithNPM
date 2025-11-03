import {IServiceContract} from "./post.types"
import {client} from "../../seed"
import { PostRepository } from "./post.repository";



const requestService:IServiceContract = {
    getPosts: async (params) => {
        const products = await PostRepository.getPosts({params})
        return {
            status: "success",
            data: products
        }
    },
    createPost: async (data) => {
        if (!Array.isArray(data)){
                data = [data];
        }
        const newPosts = await PostRepository.createPost(data)
        return {
            status: "success",
            data: newPosts
        }
    },
    getPostById: async (postId) => {
        const id = postId;
        if (!Number(id)){
            return {
                status: "Problem with ID",
                message: "Id is entering incorrectly!"
            }
        }
        const postById = await PostRepository.getPostById(postId);
        if (!postById){
            return{
                status: "Does not exist",
                message: "Post with this id does not exist!"
            }
        }
        return {
            status: "success",
            data: postById
        }
    },
    updatePostById: async (postId , data) => {  
        const id = postId;
        if (!Number(id)){
            return {
                status: "Problem with ID",
                message: "Id is entering incorrectly!"
            }
        }
        const postById = await PostRepository.getPostById(postId);
        if (!postById){
            return{
                status: "Does not exist",
                message: "Post with this id does not exist!"
            }
        }
        const updatedData = Object.assign(postById, data)
        const updatedPost = await PostRepository.updatePostById(id, updatedData)
        return {
            status: "succes",
            data: updatedPost
        }
    },
    deletePostById: async (postId) => {
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
            return {"status": "error",
                "message": error
            }
        }
    }
}
export default requestService