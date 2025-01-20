import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
import session from "express-session";
// import path from "path";

console.log("inside the app.js file");
// MIDDLEWARE




const app=express()

 // Initialize Socket.IO with the HTTP server

// Middleware setup...
// Your existing middleware setup goes here...

// Socket.IO connection handling

// app.use(cors())

app.use(
    session({
        secret: process.env.SESSION_SECRET || "Iwn3q3HkVF",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);
app.use(express.json({
    limit:"16kb"              // backend or server per jo date aaa raha hain vo json format me aa sakta hain aur uski limit 16kb
}))
app.use(express.urlencoded({
    extended:true,                   //configuration -ye url ke liye jabh user url enter kar to jo data d
    limit:"16kb"                    // display hoga to upper jo url ayega usko manage kar le 
}))
 app.use(express.static("public"))   // access the file present in public 

app.use(cookieParser())             

// app.use("/api/v1/users", userRouter);
app.use(cors({
    origin: ['https://medicalrecommendation.netlify.app', 'http://localhost:3000'], // Allow these origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
  // Routes
  app.use("/api/v1/users", userRouter);
  
  
export { app };