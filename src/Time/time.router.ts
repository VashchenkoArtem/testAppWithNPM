import express from "express"
import requestControllerTime from "./time.controller";

const timeRouter = express.Router();

timeRouter.get('/timestamp', requestControllerTime.getTime)

export default timeRouter