import path from "path"
import fs from "fs"
import fsPromises from "fs/promises"
import {IQueryParams, IServiceContract, Post} from "./post.types"


const requestService:IServiceContract = {
    getPosts: (params) => {
        const postsJson = path.join(__dirname, "../../jsonFiles/posts.json");
        const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));
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
        const postsJson = path.join(__dirname, "../../jsonFiles/posts.json");
        const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));
        if (!Array.isArray(data)){
                data = [data];
        }
        let newPosts: Post[] = [];
        for (let addedPost of data){
            if (!addedPost.title || !addedPost.description || !addedPost.image){
                return {
                    status: "data incorrect",
                    message: "Please, enter data correctly!"
                }
            }
            let postId: number = 0;
            if (posts.length > 0){  
                postId = posts[posts.length - 1].id + 1;
            }
            const newPost: Post = { ...addedPost, id: postId };
            newPosts.push(newPost);
            posts.push(newPost);
            await fsPromises.writeFile(postsJson, [JSON.stringify(posts)]);
        }    
        posts.push(newPosts);  
        return {
            status: "success",
            data: newPosts
        }
    },
    getPostById: (postId) => {
        const postsJson = path.join(__dirname, "../../jsonFiles/posts.json");
        const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));
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
    updatePostById: (postId , data) => {  
        const postsJson = path.join(__dirname, "../../jsonFiles/posts.json");
        const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));
        if (!postId || postId >= posts.length || postId < 0){
            return {
                "status": "error",
                "message": "Please, enter post id correctly!"
            }
        }
        const post: Post = posts.find((elPost: Post) => {
            return elPost.id === postId
        })
        const updatedData: Post = Object.assign(post, data)
        return {
            "status": "Success",
            "data": updatedData
        }
    }
}
export default requestService