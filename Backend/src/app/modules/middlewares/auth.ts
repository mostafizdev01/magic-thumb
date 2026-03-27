import { NextFunction, Request, Response } from "express";


export const protect = async (req:Request, res:Response, next:NextFunction)=> {
    const {isLoggedIn, userId} = req.session;
    if(!isLoggedIn || !userId){
        return res.status(401).json(({success: false, message: "You are not logged in!"}))
    }

    next()
}