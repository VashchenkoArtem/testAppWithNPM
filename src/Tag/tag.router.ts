import express from "express";
import { tagController } from "./tag.controller";

const tagRouter = express.Router();

tagRouter.get("/tags", tagController.getTags);
tagRouter.get("/tags/:id", tagController.getTagById);

export default tagRouter