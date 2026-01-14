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
    createPost: async(post, userId) => {
        try{
            const newPost = await client.post.create({
            data: {
                title: post.title,
                description: post.description,
                image: post.image,
                userId: userId,

                tags: {
                create: post.tags && post.tags.map((tagId: number) => ({
                    tag: {
                        connect: { id: tagId }
                    }
                }))
                }
            },
            include: {
                tags: {
                include: {
                    tag: true
                }
                }
            }
            })

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
    createComment: async (content, userId, postId) => {
        try{
            const createdComment = await client.comment.create({
                data: {
                    authorId: userId,
                    postId: postId,
                    content: content.content
                },
                include:{
                    author: true
                }
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