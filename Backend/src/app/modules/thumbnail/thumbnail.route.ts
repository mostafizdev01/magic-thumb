import express from "express";
import { deleteThumbnail, generateThumbnail, getMyThumbnail, getThumbnailById } from "./thumbnail.controller";
import { protect } from "../middlewares/auth";

const thumbnailRouter = express.Router();

thumbnailRouter.post("/generate", protect, generateThumbnail)
thumbnailRouter.get("/generate/my-thumbnail", protect, getMyThumbnail)
thumbnailRouter.get("/generate/:id", protect, getThumbnailById)
thumbnailRouter.delete("/generate/:id", protect, deleteThumbnail)

export default thumbnailRouter;