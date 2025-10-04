const express = require("express");
const controller = require("./post.controller");
const router = express.Router();
const service = require("./post.service");


router.get('/posts', controller.getPosts)
router.post('/posts', controller.createPost)
router.get("/posts/:id", controller.getPostById)

module.exports=router;
