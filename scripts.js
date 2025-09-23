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
    let time = getCurrentTime();
    res.status(200).json({"currentTime": time});
})

const postsJson = path.join(__dirname, "posts.json");
const posts = JSON.parse(fs.readFileSync(postsJson, "utf-8"));

app.get("/posts", (req, res) => {
    const skip = Number(req.query.skip);
    const take = Number(req.query.take);
    const filter = req.query.filter;
    let slicedPosts = [ ...posts ];
    if (skip && take){
        if (filter === "true" || filter === "false"){
            const countOfPosts = skip + take;
            slicedPosts = slicedPosts.slice(skip, countOfPosts);
            let filteredPosts = slicedPosts
            if (filter === "true"){
                filteredPosts = slicedPosts.filter((element) => {   
                    return element.title.includes("a");
                })
                res.status(200).json(filteredPosts);
                return;
            }
            res.status(200).json(filteredPosts);
            return;
        }
        res.status(400).json("Choose a current variant of filter!");
        return;
    }
    res.status(400).json("Please, enter a correct number in parameters");
})
app.get("/posts/:id", (req, res) => {
    const postId = Number(req.params.id);
    let filteredPosts = [ ...posts];
    if (!isNaN(postId) && filteredPosts.length > postId){
        const onePost = filteredPosts.find((element) => {
            return element.id === postId;
        })
        res.status(200).json(onePost);
        return;
        }
    res.status(404).json("Post doesn`t exist!");
    })

app.listen(PORT, HOST, () => {
    console.log(`Час: \nhttp://${HOST}:${PORT}/timestamp\n`);
    console.log(`Пости: \nhttp://${HOST}:${PORT}/posts?skip=1&take=2`);
})