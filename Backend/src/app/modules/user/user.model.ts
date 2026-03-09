import mongoose from "mongoose";
import { IUser } from "./user.interface";


const UserSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true, lowercase: true},
    password: {type: String, trim: true},
})

export const User = mongoose.model<IUser>("Users", UserSchema)