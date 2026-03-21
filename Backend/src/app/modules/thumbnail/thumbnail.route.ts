import express from "express";
import { generateThumbnail, getMyThumbnail, getThumbnailById } from "./thumbnail.controller";

const thumbnailRouter = express.Router();

thumbnailRouter.post("/generate", generateThumbnail)
thumbnailRouter.get("/generate/my-thumbnail", getMyThumbnail)
thumbnailRouter.get("/generate/:id", getThumbnailById)
thumbnailRouter.delete("/generate/:id", generateThumbnail)

export default thumbnailRouter;