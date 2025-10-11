// const moment = require("moment");
// const path = require("path");
// const fs = require("fs");
// const fsPromises = require("fs/promises");

import postRouter from "./Post/post.router"
import timeRouter from "./Time/time.router";
import userRouter from "./Users/users.router"
import type { Express } from "express";
import express from "express"

const HOST: string = "127.0.0.1";
const PORT: number = 8000;
const app: Express = express();

app.use(express.json());
app.use(postRouter);
app.use(timeRouter);
app.use(userRouter);

app.listen(PORT, HOST, () => {
    console.log(`Час: \nhttp://${HOST}:${PORT}/timestamp\n`);
    console.log(`Пости: \nhttp://${HOST}:${PORT}/posts?skip=1&take=2`);
    console.log(`Користувачі: \nhttp://${HOST}:${PORT}/users`);
})