import  bcrypt  from 'bcrypt';
import { Request, Response } from "express";
import { User } from "../user/user.model";


export const loginUser = async(req:Request, res:Response)=> {
    try {

        const {email, password} = req.body;

        // find user by email
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({success: false, message: "Invalid email or password!"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password as string)

        if(!isPasswordMatch){
            return res.status(400).json({success: false, message: "Password does't match!"})
        }

        // session set ************************************************
        req.session.isLoggedIn = true
        req.session.userId = user?._id.toString();

        return res.json({
            success: true,
            message: "Login Successfull!",
            user: {
                _id: user?._id,
                name: user?.name,
                email: user?.email
            }
        })
    } catch (error: any) {
        console.log("error:", error)
        res.json({success: false, message: error.message})
    }
}


// Controller for logout user

export const logoutUser = async (req:Request, res: Response)=> {
    req.session.destroy((error: any)=> {
        if(error){
            console.log(error)
            return res.status(500).json({success: false, message: error.message})
        }
    })

    return res.json({success: true, message: "Logout Successfull!"})
}


// controller for user verify


export const verifyUser = async (req:Request, res: Response)=> {
    try {
        const {userId} = req.session;

        const user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(400).json({success: false, message: "Invalid User!"})
        }

        return res.json({user})

    } catch (error) {
        console.log(error);
        
    }
}