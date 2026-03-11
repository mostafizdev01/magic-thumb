import express from "express";
import { registerUser } from "../modules/user/user.controller";
import { loginUser, logoutUser, verifyUser } from "../modules/auth/auth.controller";
import { protect } from "../modules/middlewares/auth";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser)
AuthRouter.post("/login", loginUser)
AuthRouter.post("/logout", logoutUser)
AuthRouter.get("/verify", protect, verifyUser)

export default AuthRouter;