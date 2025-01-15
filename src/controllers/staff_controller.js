import { ApiError } from "../util/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
import { Staff } from "../models/staff_model.js";
import nodemailer from "nodemailer"
                                 // REGISTERING THE USER //


const Staffregister=asyncHandler(async(req,res)=>{
    const {Name,Email,Phonenumber,Password,Department}=req.body
       console.log(Name,Email)
        if(Name===""){
            throw new ApiError(400,"Name is required ")
        }
        if(Phonenumber===""){
            throw new ApiError(400,"Phonenumber is required")
        }
        if(Department===""){
            throw new ApiError(400,"Specialization is required")
        }
        if(Email===""){
            throw new ApiError(400,"Email is required ")
        }
        if(Password===""){
            throw new ApiError(400,"password is required")
        }

    
        const existeduser=await Staff.findOne({
            $or:[{Name},  {Email}]
        })
        
        if(existeduser){
            throw new ApiError(409,"user already existed with this username")
        }
        
        const Adharcardpath=req.files?.Adharcard?.[0]?.path;
        console.log("req.files:", req.files);
        console.log("the report path is ",Adharcardpath)

        if(!Adharcardpath){
            throw new ApiError(400,"report path  is required ")
        }

        const Adharcard=await uploadOnCloudinary(Adharcardpath)
        console.log(Adharcard)

        const  user=await Staff.create({
            Name,
            Phonenumber,
            Adharcard:Adharcard.url,
            Email,
            Password,
            Department,
        })

        const createdUser=await Staff.findById(user._id).select(
            "-Password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500,"Sorry unable to register user ")
        }
        return res.json({ "Staff successfully registered": true });
})



         // GENERATING TOKEN WHEN USER IS LOGIN THIS WILL WORK AFTER USER ENTER CORRECT USERNAME AND PASSWORD //
const generateAcessTokenAndRefereshTokens=async(userId)=>{
    try {
        const user=await Staff.findById(userId)
        console.log(user);
        const accessToken=user.generateAcessToken()
        const refreshToken=user.generateRefreshToken()
        console.log("accessToken is :",accessToken)
        console.log("refreshToken is :",refreshToken
        )
        user.refreshToken=refreshToken;
        await user.save();
       console.log("token aagya hai wth ")
        // console.log(refreshToken)
        // await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"somethning went wrong  while generating tokens")
    }
    }


    // USER ENTERING THE USERNAME AND PASSWORD FOR LOGIN//

const loginStaff=(async(req,res)=>{
    const {Name,Password}=req.body
    console.log(Name,Password)
    
    if(!Name){
        throw new ApiError(400,"Username is required")
    }
    const user=await Staff.findOne({
        $or:[{Name}]
    })
    if(!user){
        throw new ApiError(400,"user doesnot exist with this username and email")
    }
    const isPasswordvalid=await user.isPasswordCorrect(Password)
    console.log(isPasswordvalid)

    if(!isPasswordvalid){
        throw new ApiError(400,"Password enter by you is incorrect please enter the correct password")
    }

    
 const {accessToken,refreshToken}= 
    await generateAcessTokenAndRefereshTokens(user._id)
    console.log(accessToken)
    console.log(refreshToken)
 
     const loggedInUser=await Staff.findById(user._id)
    //  select({ password: 0, refreshToken: 0 });
     console.log(loggedInUser)
 
     const options={
         httpOnly:true,
         secure:true
     }


                                // SENDING THE TOKEN IN THE COOKIES//
                                
     return res
     .status(200).cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json({"Staff login successfully":true})
     
})

export {Staffregister,loginStaff}
