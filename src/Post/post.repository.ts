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
                    }
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
            return post
        }catch(error){
            throw error
        }
    }
}