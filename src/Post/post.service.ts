import path from "path"
import fs from "fs"
import fsPromises from "fs/promises"

interface queryParams {
    skip?: string,
    take?: string,
    filter?: string
}
interface post{
    title: string,
    description: string,
    image: string
}
const requestService = {
    getPosts: (params: queryParams) => {
        const postsJson = path.join(__dirname, "../../jsonFiles/posts.json");
        const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));
        let slicedPosts = [ ...posts ];
        let skipNumber = 0;
        const { skip, take, filter} = params
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
            const takeNumber = Number(take);
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
    createPost: async (data: post | post[]) => {
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
    getPostById: (postId: number) => {
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
export default requestService