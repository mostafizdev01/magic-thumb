import mongoose from "mongoose";
import { IThumbnail } from "./thumbnail.interface";


const ThumbnailSchema = new mongoose.Schema<IThumbnail>(
    {
        userId: { type: String, ref: 'User', required: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        style: { type: String, required: true, enum: ["Bold & Graphic", "Tech/Futuristic", "Minimalist", "Photorealistic", "Illustrated"] },
        aspect_ratio: { type: String, enum: ["16:9", "1:1", "9:16"], default: "16:9" },
        color_scheme: { type: String, enum: ["vibrant", "sunset", "forest", "neon", "purple", "monochrome", "ocean", "pastel"] },
        text_overlay: { type: String, default: false },
        image_url: { type: String, default: "" },
        prompt_used: { type: String },
        user_prompt: { type: String },
        isGenerating: { type: Boolean, default: true }
    }
)


export const Thumbnail = mongoose.models.Thumabnail || mongoose.model<IThumbnail>('Thumbnail', ThumbnailSchema)