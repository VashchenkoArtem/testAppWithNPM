const express = require('express');
const router = express.Router();
const controller = require("./users.controller")

router.get("/users", controller.getUsers)
router.get("/users/:id", controller.getUserById)

module.exports=router;