const moment = require("moment");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");


const express = require("express");
const HOST = "127.0.0.1";
const PORT = "8000";
const app = express();

const router = require("./Post/post.router");
const timeRouter = require("./Time/time.router");
const userRouter = require("./Users/users.router");

app.use(express.json());
app.use(router);
app.use(timeRouter);
app.use(userRouter);


// app.get("/users/:id", (req, res) => {
//     const userId = Number(req.params.id);
//     const fields = req.query.fields;
//     let choosedUser = [ ...allUsers ];
//     if (isNaN(userId)){
//         res.status(400).json("Please, enter a correct id in parameter!");
//         return;
//     }
//     if (userId <= 0 || userId > choosedUser.length){
//         res.status(404).json("User with this ID is not found!");
//         return;
//     }
//     choosedUser = choosedUser.find((user) => {
//         return user.id === userId;
//     })
//     if (fields){
//         const fieldsArray = fields.split(",");
//         for (let field of fieldsArray){
//             if (!(field in choosedUser)){
//                 return res.status(404).json(`Field ${field} is not found!`);
//             }
//         }
//         let filteredUserAnswer = {};
//         fieldsArray.forEach((field) => {
//             filteredUserAnswer[field] = choosedUser[field];
//         })
//         choosedUser = filteredUserAnswer;
//     }
//     res.status(200).json(choosedUser);
// });
app.listen(PORT, HOST, () => {
    console.log(`Час: \nhttp://${HOST}:${PORT}/timestamp\n`);
    console.log(`Пости: \nhttp://${HOST}:${PORT}/posts?skip=1&take=2`);
    console.log(`Користувачі: \nhttp://${HOST}:${PORT}/users`);
})