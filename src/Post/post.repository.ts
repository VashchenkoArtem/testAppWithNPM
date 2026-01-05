import {client} from "../client/client"
import { IRepositoryContract } from "./post.types"


export const PostRepository: IRepositoryContract ={
    getPosts: async(paramsObj) => {
        try{
            const {skip, take} = { ...paramsObj.params }
            const posts = await client.post.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
                include: {
                    tags: {include:
                        {tag: true}
                    },
                    createdBy: true,
                    likes: true
                }
            })
            return posts
        }catch(error){
            throw error
        }
    },
    createPost: async(post) => {
        try{
            const tags = post.tags as []
            const newPost = await client.post.create({
                data: {
                    title: post.title, 
                    description: post.description,
                    image: post.image,
                    userId: post.userId,
                    likes: post.likes,
                    tags: post.tags && tags.length > 0
                    ? {
                        createMany: {
                            data: tags.map(tagId => ({ tagId }))
                        }
                        }
                    : undefined

                    }
                }
            )
            return newPost
        }catch(error){
            throw error
        }
    },
    getPostById: async(postId, likedBy, comments) => {
        try{
            const postById = await client.post.findUnique({
                where: {
                    id: postId
                }, include: {
                    likes: likedBy,
                    comments: {
                        include: {
                            author: comments
                        }
                    },
                    tags: {include:
                        {tag: true}
                    },
                    createdBy: true,
            }})
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
            return post
        }catch(error){
            throw error
        }
    },
    createComment: async (data) => {
        try{
            const createdComment = await client.comment.create({
                data: data
            })
            return createdComment
        }catch(error){
            throw error
        }
    },
    likePost: async (postId, userId) => {
        try{
            const like = await client.postLike.create({
                data: {
                    postId: postId,
                    userId: userId
                }
            })
            return like
        }catch(error){
            throw error
        }
    },
    findLike: async (postId, userId) => {
        try{
            const like = await client.postLike.findUnique({
                where: {
                postId_userId: {
                    postId: postId,
                    userId: userId
                }}
            })
            return like
        }catch(error){
            throw error
        }
    },
    unlikePost: async (postId, userId) => {
        try{
            const unlikedPost = await client.postLike.delete({
            where: {
                postId_userId: {
                postId,
                userId,
                },
            },
            });
            return unlikedPost
        }catch(error){
            throw error
        }
    },
    checkLike: async(postId, userId)=>{
        try{
            const post = await client.post.findUnique({
                where: {id: postId},
                include: {
                    likes: true
                }})
            const user = await client.user.findUnique({
                where: {
                    id: userId
                }
            })
            if (!post){
                return "post not found"
            }
            if (!user){
                return "user not found"
            }
            if (post.likes.some(u => u.userId === user.id)){
                return true
            }
            return false
        }catch(error){
            throw error as string
        }
    }
}