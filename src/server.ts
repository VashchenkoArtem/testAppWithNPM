import postRouter from "./Post/post.router"
import tagRouter from "./Tag/tag.router";
import type { Express } from "express";
import express from "express"
import userRouter from "./User/user.router";
import cors from "cors"

const HOST: string = "127.0.0.1";
const PORT: number = 8000;
const app: Express = express();

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json());
app.use(postRouter);
app.use(tagRouter);
app.use(userRouter);

app.listen(PORT, HOST, () => {
    console.log(`Пости: \nhttp://${HOST}:${PORT}/posts?skip=1&take=2`);
    console.log(`Користувачі: \nhttp://${HOST}:${PORT}/users`);
})

