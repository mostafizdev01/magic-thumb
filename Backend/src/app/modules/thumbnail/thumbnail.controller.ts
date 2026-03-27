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

// create thumbnail useing gemeni-pro-3 api....
// export const generateThumbnail = async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.body;
//         const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

//         const thumbnail = await Thumbnail.create({
//             userId,
//             title,
//             prompt_used: user_prompt,
//             user_prompt,
//             style,
//             aspect_ratio,
//             color_scheme,
//             text_overlay,
//             isGenerating: true
//         })

//         // const model = "gemini-3-pro-image-preview";
//         const model = "@cf/stabilityai/stable-diffusion-xl-base-1.0";

//         const geenrationconfig: GenerateContentConfig = {
//             maxOutputTokens: 32768,
//             temperature: 1,
//             topP: 0.95,
//             responseModalities: ["IMAGE"],
//             imageConfig: {
//                 aspectRatio: aspect_ratio || "16:9",
//                 imageSize: '1K'
//             },
//             safetySettings: [
//                 { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },
//                 { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
//                 { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },
//                 { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF }
//             ]
//         }

//         let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for : '${title}'`;

//         if (color_scheme) {
//             prompt += `Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme`
//         }

//         if (user_prompt) {
//             prompt += `Additional details: ${user_prompt}`
//         }

//         prompt += `The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, profetional, and impossible to ignore.`

//         // Generate the image useing the ai model
//         const response: any = await ai.models.generateContent({
//             model,
//             contents: [prompt],
//             config: geenrationconfig
//         })

//         // Check if the response is valid
//         if (!response?.candidates[0]?.content?.parts) {
//             throw new Error("Unexpected response!")
//         }

//         const parts = response.candidates[0].content.parts;


//         let finalBuffer: Buffer | null = null;

//         for (const part of parts) {
//             if (part.inlineData) {
//                 finalBuffer = Buffer.from(part.inlineData.data, 'base64')
//             }
//         }

//         const filename = `final-output-${Date.now()}.png`;
//         const filePath = path.join("images", filename)

//         // Create the images directory if it does't exist
//         fs.mkdirSync("images", { recursive: true })

//         // Write the final image to the file
//         fs.writeFileSync(filePath, finalBuffer!)

//         const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "image" })

//         thumbnail.image_url = uploadResult.url;
//         thumbnail.isGenerating = false;
//         await thumbnail.save();

//         res.json({
//             success: true,
//             status: 201,
//             message: "Thumbnail Generated Successfull!",
//             data: thumbnail
//         })

//         // remove image from local path
//         fs.unlinkSync(filePath)

//     } catch (error: any) {
//         console.log("error", error)
//         res.json({
//             success: false,
//             staus: 500,
//             message: error.message
//         })
//     }
// }


/// Controller for thumbnail Geting...

// Generate thumbnail useing in cloudflare


export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const { title, prompt: user_prompt, style, aspect_ratio, color_scheme } = req.body;

    // 🧾 DB create
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      isGenerating: true,
    });

    // 🧠 Prompt build
    let prompt = `YouTube thumbnail about ${title}, ${style}`;

    if (color_scheme) {
      prompt += `, ${color_scheme} color`;
    }

    if (user_prompt) {
      prompt += `, ${user_prompt}`;
    }

    prompt += `, cinematic, high quality, bold text, eye catching, viral style`;

    // 🚀 YOUR WORKER API CALL (IMPORTANT)
    const response = await fetch(
      "https://image-api.mostafizdev700.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 12341234`
        },

        body: JSON.stringify({ prompt })
      }
    );

    // ❌ error handle
    if (!response.ok) {
      throw new Error("Failed to fetch image from AI");
    }

    // 🖼️ buffer তৈরি
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 📁 local file save
    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join("images", filename);

    fs.mkdirSync("images", { recursive: true });
    fs.writeFileSync(filePath, buffer);

    // ☁️ Cloudinary upload
    const uploadResult = await cloudinary.uploader.upload(filePath);

    // 🧾 DB update
    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    // 🧹 local file delete
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: "Thumbnail Generated Successfully!",
      thumbnail
    });

  } catch (error: any) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/// Get MyThumbnail for Controller...
export const getMyThumbnail = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    if(!userId){
      return res.json({
        success: false,
        status: 500,
        message: "You are not loggedIn!"
      })
    }
    const thumbnail = await Thumbnail.find({ userId }).sort({ createdAt: -1 })

    if (!thumbnail) {
      return res.json({
        success: false,
        status: 400,
        message: "Not found Thumbnail!"
      })
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: " My Thumbnail Get Success!",
      thumbnail
    })
  } catch (error: any) {
    console.log("error:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

/// Controller to get single Thumbnail of a user

export const getThumbnailById = async (req: Request, res: Response) => {
  
  try {
    // const { userId } = req.session;
    const { id } = req.params;
    const thumbnail = await Thumbnail.findOne({ _id: id })

    if (!thumbnail) {
      return res.json({
        success: false,
        status: 400,
        message: "Not found Thumbnail!"
      })
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Thumbnail Get Success!",
      thumbnail
    })

  } catch (error: any) {
    console.log("error:", error)
    res.status(500).json({ success: false, message: error.message })
  }
}


/// Controller for thumbnail deletion

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if(!id){
      throw new Error("Id Not found!")
    }
    // const { userId } = req.session;

    await Thumbnail.findByIdAndDelete({ _id: id })

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