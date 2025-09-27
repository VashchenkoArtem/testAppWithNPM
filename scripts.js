const moment = require("moment");
const path = require("path");
const fs = require("fs");

function getCurrentTime(){
    let currentTime = moment().format("LTS");
    console.log(currentTime);
    return currentTime;
}

const express = require("express");
const HOST = "127.0.0.1";
const PORT = "8000";
const app = express();

app.get("/timestamp", (req, res) => {
    let time = getCurrentTime();x
    res.status(200).json({"currentTime": time});
})

const postsJson = path.join(__dirname, "posts.json");
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
app.listen(PORT, HOST, () => {
    console.log(`Час: \nhttp://${HOST}:${PORT}/timestamp\n`);
    console.log(`Пости: \nhttp://${HOST}:${PORT}/posts?skip=1&take=2`);
})