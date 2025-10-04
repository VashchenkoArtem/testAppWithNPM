const moment = require("moment");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

const requestService = {
    // getTime: (req, res) => {
    //     let currentTime = moment().format("LTS");
    //     return currentTime;
    // },
    getPosts: (skip, take, filter) => {
        const postsJson = path.join(__dirname, "../../jsonFiles/posts.json");
        const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));
        let slicedPosts = [ ...posts ];
        let skipNumber = 0;
        // Створюємо умову, яка перевіряє чи заданий параметр skip
        if (skip){
            skipNumber = Number(skip);
            // Перевіряємо, чи є параметр числом
            if (isNaN(skipNumber)){
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
            const takeNumber = Number(take);
            if (isNaN(takeNumber)){
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
        let newPosts = [];
        for (let addedPost of data){
            if (!addedPost.title || !addedPost.description || !addedPost.image){
                return {
                    status: "data incorrect",
                    message: "Please, enter data correctly!"
                }
            }
            let postId = 0;
            if (posts.length > 0){  
                postId = posts[posts.length - 1].id + 1;
            }
            const newPost = { id: postId, ...addedPost };
            newPosts.push(newPost);
            posts.push(newPost);
            await fsPromises.writeFile(postsJson, [JSON.stringify(posts)]);
        }    
        posts.push(newPosts);  
        return {
            status: "success",
            data: { newPosts }
        }
    },
    getPostById: (postId) => {
        const postsJson = path.join(__dirname, "../../jsonFiles/posts.json");
        const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));
        const postIdNumber = Number(postId);
        let filteredPosts = [ ...posts];
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
        filteredPosts = filteredPosts.filter((post) => {
            return post.id === postIdNumber;
        })
        return {
            status: "success",
            data: filteredPosts
        };
    }
}
module.exports=requestService;