import express from "express";
import { generateThumbnail } from "./thumbnail.controller";

const thumbnailRouter = express.Router();

thumbnailRouter.post("/generate", generateThumbnail)
thumbnailRouter.delete("/generate/:id", generateThumbnail)

export default thumbnailRouter;