import "dotenv/config";
import compression from "compression";
import cors from "cors";
import express from "express";
import session from "express-session"
import MongoStore from "connect-mongo";
import AuthRouter from "./app/routes/UserRoutes";
import thumbnailRouter from "./app/modules/thumbnail/thumbnail.route";

declare module 'express-session' { // set the two property into session. So after we can easly access this two property and value.
  interface SessionData {
    isLoggedIn: boolean;
    userId: string
  }
}

const app = express();

// Middleware
// app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.use(express.json()); // Parse incoming JSON requests

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://magic-thumb.vercel.app"],
    credentials: true,
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  }, // cookie expair in 7 days
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI as string,
    collectionName: "sessions"
  })
}))

app.use("/api/user", AuthRouter)
app.use("/api", thumbnailRouter)


// Default route for testing
app.get("/", (_req, res) => {
  res.json({
    success: true,
    status: 200,
    message: "Thumbnail Server is Runing..."
  });
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
