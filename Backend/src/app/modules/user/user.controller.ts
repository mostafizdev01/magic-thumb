import { Request, Response } from "express";
import { User } from "./user.model";
import bcrypt from "bcrypt"


export const registerUser = async (req:Request, res:Response)=> {
    try {
        const {name, email, password} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }

        /// Encrypt the password
        const hashPassword = await bcrypt.hash(password, Number(10))

        const newUser = new User({name, email, password:hashPassword})
        await newUser.save()

        /// create the session data
        // req.session.isLoggedIn = true,
        // req.session.userId = newUser._id as unknown as string;

        return res.json({
            success: true,
            message: "Register Successfully!",
            user: {
                _id: newUser?._id,
                name: newUser?.name,
                email: newUser?.email,
            }
        })

    } catch (error: any) {
       console.log(error)
       res.status( 500).json({message: error.message})
    }
}