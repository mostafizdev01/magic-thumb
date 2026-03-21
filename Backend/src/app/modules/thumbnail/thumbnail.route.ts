import express from "express";
import { generateThumbnail, getThumbnailById } from "./thumbnail.controller";

const thumbnailRouter = express.Router();

thumbnailRouter.post("/generate", generateThumbnail)
thumbnailRouter.get("/generate/:id", getThumbnailById)
thumbnailRouter.delete("/generate/:id", generateThumbnail)

export default thumbnailRouter;