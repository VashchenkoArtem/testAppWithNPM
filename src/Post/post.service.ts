import {CreatePost, IQueryParams, IServiceContract, Post, UpdatePost} from "./post.types"
import {client, CreateNewPost, updatePostById} from "../../seed"

const requestService:IServiceContract = {
    getPosts: async (params) => {
        const posts: Post[] = await client.post.findMany();
        let slicedPosts: Post[] = [ ...posts ];
        let skipNumber: number = 0;
        const { skip, take, filter}: IQueryParams = params
        // Створюємо умову, яка перевіряє чи заданий параметр skip
        if (skip){
            skipNumber = Number(skip);
            // Перевіряємо, чи є параметр числом
            if (Number.isNaN(skipNumber)){
                // Якщо параметр - не число
                return {
                    status: "incorrect number",
                    message: "Please, enter a correct number in parameters!"
                }
            }
            slicedPosts = slicedPosts.slice(skipNumber, slicedPosts.length + 1);
        }
        // Створюємо умову, яка перевіряє чи заданий параметр take
        if (take){
            const takeNumber: number = Number(take);
            if (Number.isNaN(takeNumber)){
                return {
                    status: "incorrect number",
                    message: "Please, enter a correct number in parameters!"
                }
            }
            slicedPosts = slicedPosts.slice(skipNumber, takeNumber + skipNumber);
        }
        // Створюємо умову, яка перевіряє чи заданий параметр filter
        if (filter !== undefined && filter === "true"){
            slicedPosts = slicedPosts.filter((post) => {
                return post.title.includes("a");
            })
        }
        return {
            status: "success",
            data: slicedPosts
        }
    },
    createPost: async (data) => {
        if (!Array.isArray(data)){
                data = [data];
        }
        let newPosts: CreatePost[] = [];
        for (let addedPost of data){
            if (!addedPost.title || !addedPost.description || !addedPost.image){
                return {
                    status: "data incorrect",
                    message: "Please, enter data correctly!"
                }
            }
            console.log(addedPost)
            const newPost: CreatePost = { ...addedPost};
            newPosts.push(newPost)
            console.log(newPost.tags)
            await CreateNewPost(newPost)
        }
        return {
            status: "success",
            data: newPosts
        }
    },
    getPostById: async (postId) => {
        const posts : Post[] = await client.post.findMany();
        const postIdNumber: number = Number(postId);
        const filteredPosts: Post[] = [ ...posts];
        if (isNaN(postIdNumber)){
            return {
                status: "incorrect number",
                message: "Please, enter a correct number in parameters!"
            }
        }
        if (postIdNumber > filteredPosts.length || postIdNumber < 0){
            return {
                status: "not found",
                message: "Post with this ID is not found!"
            }
        }
        const newFilteredPosts = filteredPosts.find((post) => {
            return post.id === postIdNumber;
        })
        return {
            status: "success",
            data: newFilteredPosts
        };
    },
    updatePostById: async (postId , data) => {  
        const posts: Post[] = await client.post.findMany();
        if (!postId || postId >= posts.length || postId < 0){
            return {
                "status": "error",
                "message": "Please, enter post id correctly!"
            }
        }
        const post: Post | undefined = posts.find((elPost: Post) => elPost.id === postId);
        const correctPost: UpdatePost = {title: post?.title,
                                        description: post?.description,
                                        image: post?.image
        }
        if (!post){
            return{ 
                "status": "error",
                "message": "Post not found!"
            }
        }
        const updatedData: UpdatePost = Object.assign(correctPost, data)
        console.log(updatedData)
        await updatePostById(postId, updatedData)
        return {
            "status": "Success",
            "data": updatedData
        }
    }
}
export default requestService