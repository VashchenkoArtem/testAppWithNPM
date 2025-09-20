const moment = require("moment");
const path = require("path");
const fs = require("fs");

function getCurrentTime(){
    let currentTime = moment().format("LTS");
    console.log(currentTime);
    return currentTime;
}

const express = require("express");
const { json } = require("stream/consumers");

const HOST = "127.0.0.1";
const PORT = "8000";

const app = express();

const jsonPath = path.join(__dirname, "products.json");
app.get("/timestamp", (req, res) => {
    let time = getCurrentTime();
    res.status(200).json({"currentTime": time});
})
app.get("/posts", (req, res) => {
    const products = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    res.status(200).json(products);
})
app.listen(PORT, HOST, () => {
    console.log(`Час: \nhttp://${HOST}:${PORT}/timestamp\n`);
    console.log(`Пости: \nhttp://${HOST}:${PORT}/posts`);
})