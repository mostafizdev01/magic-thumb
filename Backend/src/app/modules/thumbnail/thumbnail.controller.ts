import { Request, Response } from "express";
import { Thumbnail } from "./thumbnail.model";
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from "@google/genai";
import { ai } from "../../config/ai";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary"


const stylePrompts = {
    "Bold & Graphic": "eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style",

    "Tech/Futuristic": "futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atosphere",

    "Minimalist": "minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point",

    "Photorealistic": "Photorealistic thumbnail ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field",

    "Illustrated": "Illustrated thumbnail, bold outlines, vibrant colors, creative cartoon or vector art style"
}

const colorSchemeDescriptions = {
    vibrant: "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette",

    sunset: "warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow",

    forest: "natural green tones, earthy colors, calm and organic palette, fresh atmosphere",

    neon: "neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow",

    purple: "purple-dominant color palette, magenta and violet tones, modern and stylish mood",

    monochrome: "black and white color scheme, high contrast, dramatic lighting, timeless aesthetic",

    ocean: "cool blue and teal tones, aquatic color palette, fresh and clean atmosphere",

    pastel: "soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic"
};

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true
        })

        const model = "gemini-3-pro-image-preview";

        const geenrationconfig: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ["IMAGE"],
            imageConfig: {
                aspectRatio: aspect_ratio || "16:9",
                imageSize: '1K'
            },
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF }
            ]
        }

        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for : '${title}'`;

        if (color_scheme) {
            prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme`
        }

        if (user_prompt) {
            prompt += `Additional details: ${user_prompt}`
        }

        prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, profetional, and impossible to ignore.`

        // Generate the image useing the ai model
        const response: any = await ai.models.generateContent({
            model,
            contents: [prompt],
            config: geenrationconfig
        })

        // Check if the response is valid
        if (!response?.candidates?.[0]?.content?.parts) {
            throw new Error("Unexpected response!")
        }

        const parts = response.candidates[0].content.parts;


        let finalBuffer: Buffer | null = null;

        for (const part of parts) {
            if (part.inlineDate) {
                finalBuffer = Buffer.from(part.inlineDate.data, 'base64')
            }
        }

        const filename = `final-output-${Date.now()}.png`;
        const filePath = path.join("images", filename)

        // Create the images directory if it does't exist
        fs.mkdirSync("images", { recursive: true })

        // Write the final image to the file
        fs.writeFileSync(filePath, finalBuffer!)

        const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "image" })

        thumbnail.image_url = uploadResult.url;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        res.json({
            success: true,
            status: 201,
            message: "Thumbnail Generated Successfull!",
            data: thumbnail
        })

        // remove image from local path
        fs.unlinkSync(filePath)

    } catch (error: any) {
        console.log("error", error)
        res.json({
            success: false,
            staus: 500,
            message: error.message
        })
    }
}

/// Controller for thumbnail Geting...

export const getMyThumbnail = async (req: Request, res: Response)=> {
    try {
        const {userId} = req.session;
        const myThumbnail = await Thumbnail.find({userId})

        if(!myThumbnail){
          return  res.json({
                success: false,
                status: 400,
                message: "Not found Thumbnail!"
            })
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Thumbnail Get Success!",
            data: myThumbnail
        })
    } catch (error: any) {
        console.log("error:", error)
        res.status(500).json({success: false, message: error.message})
    }
}
/// Controller to get single Thumbnail of a user

export const getThumbnailById = async (req: Request, res: Response)=> {
    try {
        const {userId} = req.session;
        const {id} = req.params;
        const myThumbnail = await Thumbnail.findOne({userId, _id: id})

        res.json({
            success: true,
            message: "Get sigle thumbnail success!",
            data: myThumbnail
        })

        if(!myThumbnail){
          return  res.json({
                success: false,
                status: 400,
                message: "Not found Thumbnail!"
            })
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Thumbnail Get Success!"
        })
    } catch (error: any) {
        console.log("error:", error)
        res.status(500).json({success: false, message: error.message})
    }
}

/// Controller for thumbnail deletion

export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        await Thumbnail.findByIdAndDelete({ _id: id, userId })

        res.json({
            success: true,
            status: 200,
            message: "Thumbnail Deleted!"
        })

    } catch (error: any) {
        console.log("error", error)
        res.json({
            success: false,
            staus: 500,
            message: error.message
        })
    }
}