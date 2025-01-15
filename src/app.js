import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
// import path from "path";

console.log("inside the app.js file");
// MIDDLEWARE




const app=express()

 // Initialize Socket.IO with the HTTP server

// Middleware setup...
// Your existing middleware setup goes here...

// Socket.IO connection handling

app.use(cors({ 
    origin:process.env.CORS_ORIGIN,
    // credentials:true
}))

app.use(express.json({
    limit:"16kb"              // backend or server per jo date aaa raha hain vo json format me aa sakta hain aur uski limit 16kb
}))
app.use(express.urlencoded({
    extended:true,                   //configuration -ye url ke liye jabh user url enter kar to jo data d
    limit:"16kb"                    // display hoga to upper jo url ayega usko manage kar le 
}))
 app.use(express.static("public"))   // access the file present in public 

app.use(cookieParser())             

app.use("/api/v1/users", userRouter);

export { app };