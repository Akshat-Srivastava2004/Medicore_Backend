import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path: './public/.env'
});

const secrettoken=process.env.ACCESS_TOKEN_SECRET

const checklogout=async(req,res,next)=>{
    console.log("the secret token is ",secrettoken)
    const token=req.cookies.accessToken;
    console.log("the token is ",token)
    if(!token){
        console.log("token not found ")
    }
    try {
        const decodetoken=jwt.verify(token,secrettoken);
        console.log("the decode token is ",decodetoken)
        req.user=decodetoken;
        res.clearCookie('accessToken', {
            httpOnly: true, 
            secure: true,   
            expires: new Date(0), 
          });
      
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized" });
    
    }
    }
    export {checklogout}