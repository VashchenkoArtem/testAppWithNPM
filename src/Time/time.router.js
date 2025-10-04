const express = require("express");
const router = express.Router();
const controller = require('./time.controller');

router.get('/timestamp', controller.getTime)

module.exports=router;