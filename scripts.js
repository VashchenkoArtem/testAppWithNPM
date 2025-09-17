let moment = require("moment");

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
app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}/timestamp`);
})