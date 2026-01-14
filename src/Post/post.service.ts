import {IServiceContract} from "./post.types"
import { PostRepository } from "./post.repository";


const requestService:IServiceContract = {
    getPosts: async (params) => {
        const products = await PostRepository.getPosts({params})
        return {
            status: "success",
            data: products
        }
    },
    createPost: async (data, userId) => {
        const newPosts = await PostRepository.createPost(data, userId)
        return newPosts
    },
    getPostById: async (postId, likedBy, comments) => {
        const id = postId;
        if (!Number(id)){
            return {
                status: "Problem with ID",
                message: "Id is entering incorrectly!"
            }
        }
        const postById = await PostRepository.getPostById(postId, likedBy, comments);
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
            const deletedPost = await PostRepository.deletePostById(postId)
            return {
                "status": "Success",
                "data": deletedPost
            }
        }catch(error){
            return {"status": "error",
                "message": error
            }
        }
    },
    createComment: async(content, authorId, postId)=>{
        const createdComment = await PostRepository.createComment(content, authorId, postId)
        return createdComment
    },
    likePost: async(postId, userId)=>{
        const postLike = await PostRepository.likePost(postId, userId)
        return postLike
    },
    unlikePost: async(postId, userId)=>{
        const unlikedPost = await PostRepository.unlikePost(postId, userId)
        return unlikedPost
    },
    checkLike: async(postId, userId)=>{
        const checkLike = await PostRepository.checkLike(postId, userId)
        return checkLike
    }
}
export default requestService