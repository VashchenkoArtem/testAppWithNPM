const moment = require("moment");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");

function getCurrentTime(){
    let currentTime = moment().format("LTS");
    console.log(currentTime);
    return currentTime;
}

const express = require("express");
const HOST = "127.0.0.1";
const PORT = "8000";
const app = express();
app.use(express.json());

app.get("/timestamp", (req, res) => {
    let time = getCurrentTime();x
    res.status(200).json({"currentTime": time});
})

const postsJson = path.join(__dirname, "jsonFiles/posts.json");
const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));

app.get("/posts", (req, res) => {
    const skip = req.query.skip;
    const take = req.query.take;
    const filter = req.query.filter;
    let slicedPosts = [ ...posts ];
    let skipNumber = 0;
    // Створюємо умову, яка перевіряє чи заданий параметр skip
    if (skip){
        skipNumber = Number(skip);
        // Перевіряємо, чи є параметр числом
        if (isNaN(skipNumber)){
            // Якщо параметр - не число
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        slicedPosts = slicedPosts.slice(skipNumber, slicedPosts.length + 1);
    }
    // Створюємо умову, яка перевіряє чи заданий параметр take
    if (take){
        const takeNumber = Number(take);
        if (isNaN(takeNumber)){
            res.status(400).json("Please, enter a correct number in parameters!");
            return;
        }
        slicedPosts = slicedPosts.slice(skipNumber, takeNumber + skipNumber);
    }
    // Створюємо умову, яка перевіряє чи заданий параметр filter
    if (filter !== undefined && filter === "true"){
        slicedPosts = slicedPosts.filter((post) => {
            return post.title.includes("a");
        })
    }
    res.status(200).json(slicedPosts);
})
app.post("/posts", (req, res) => {
    const data = req.body;
    if (!data.title || !data.description || !data.image){
        res.status(422).json("Please, enter data correctly!");
        return;
    }
    const postId = posts[posts.length - 1].id + 1;
    console.log(postId);
})
app.get("/posts/:id", (req, res) => {
    const postId = req.params.id;
    const postIdNumber = Number(postId);
    let filteredPosts = [ ...posts];
    if (isNaN(postIdNumber)){
        res.status(400).json("Please, enter a correct number in parameters!");
        return;
    }
    if (postIdNumber > filteredPosts.length || postIdNumber < 0){
        res.status(404).json("Post with this ID is not found!");
        return;
    }
    filteredPosts = filteredPosts.filter((post) => {
        return post.id === postIdNumber;
    })
    res.status(200).json(filteredPosts);
})

const pathToUsers = path.join(__dirname, "jsonFiles/users.json");
const allUsers = JSON.parse(fs.readFileSync(pathToUsers, "utf-8"));

app.get("/users", (req, res) => {
    const username = req.query.name;
    let filteredUsers = [ ...allUsers ];
    if (username){
        filteredUsers = filteredUsers.filter((user) => {
            return user.name === username
        })
        if (filteredUsers.length === 0){
            res.status(404).json("Users with this name are not found!");
            return;
        }
    }
    res.status(200).json(filteredUsers);
})

app.get("/users/:id", (req, res) => {
    const userId = Number(req.params.id);
    const fields = req.query.fields;
    let choosedUser = [ ...allUsers ];
    if (isNaN(userId)){
        res.status(400).json("Please, enter a correct id in parameter!");
        return;
    }
    if (userId <= 0 || userId > choosedUser.length){
        res.status(404).json("User with this ID is not found!");
        return;
    }
    choosedUser = choosedUser.find((user) => {
        return user.id === userId;
    })
    if (fields){
        const fieldsArray = fields.split(",");
        for (let field of fieldsArray){
            if (!(field in choosedUser)){
                return res.status(404).json(`Field ${field} is not found!`);
            }
        }
        let filteredUserAnswer = {};
        fieldsArray.forEach((field) => {
            filteredUserAnswer[field] = choosedUser[field];
        })
        choosedUser = filteredUserAnswer;
    }
    res.status(200).json(choosedUser);
});
app.listen(PORT, HOST, () => {
    console.log(`Час: \nhttp://${HOST}:${PORT}/timestamp\n`);
    console.log(`Пости: \nhttp://${HOST}:${PORT}/posts?skip=1&take=2`);
    console.log(`Користувачі: \nhttp://${HOST}:${PORT}/users`);
})