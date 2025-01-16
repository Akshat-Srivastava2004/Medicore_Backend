import { ApiError } from "../util/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
// import { Postuser } from "./post.controller.js";
import { Doctor } from "../models/doctor_model.js";
import { Patient } from "../models/patient_model.js";
import { Appointment } from "../models/appointment_model.js";
import nodemailer from "nodemailer"
                                 // REGISTERING THE USER //


const Doctorregister=asyncHandler(async(req,res)=>{
    const {Name,Email,Phonenumber,Password,Specialization}=req.body
       console.log(Name,Email)
        if(Name===""){
            throw new ApiError(400,"Name is required ")
        }
        if(Phonenumber===""){
            throw new ApiError(400,"Phonenumber is required")
        }
        if(Specialization===""){
            throw new ApiError(400,"Specialization is required")
        }
        if(Email===""){
            throw new ApiError(400,"Email is required ")
        }
        if(Password===""){
            throw new ApiError(400,"password is required")
        }

    
        const existeduser=await Doctor.findOne({
            $or:[{Name},  {Email}]
        })
        
        if(existeduser){
            throw new ApiError(409,"user already existed with this username")
        }
        
        const Profilephotopath=req.files?.Profilephoto?.[0]?.path;
        console.log("req.files:", req.files);
        console.log("the report path is ",Profilephotopath)

        if(!Profilephotopath){
            throw new ApiError(400,"report path  is required ")
        }

        const Profilephoto=await uploadOnCloudinary(Profilephotopath)
        console.log(Profilephoto)

        const  user=await Doctor.create({
            Name,
            Phonenumber,
            Profilephoto:Profilephoto.url,
            Email,
            Password,
            Specialization
        })

        const createdUser=await Doctor.findById(user._id).select(
            "-Password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500,"Sorry unable to register user ")
        }
        return res.json({ "Doctor successfully registered": true });
})



         // GENERATING TOKEN WHEN USER IS LOGIN THIS WILL WORK AFTER USER ENTER CORRECT USERNAME AND PASSWORD //
const generateAcessTokenAndRefereshTokens=async(userId)=>{
    try {
        const user=await Doctor.findById(userId)
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

const logindoctor=(async(req,res)=>{
    const {Name,Password}=req.body
    console.log(Name,Password)
    
    if(!Name){
        throw new ApiError(400,"Username is required")
    }
    const user=await Doctor.findOne({
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
 
     const loggedInUser=await Doctor.findById(user._id)
    //  select({ password: 0, refreshToken: 0 });
     console.log(loggedInUser)
     req.session.doctor = {
        id: user._id,
        name: user.Name,
    };
     const options={
         httpOnly:true,
         secure:true
     }


                                // SENDING THE TOKEN IN THE COOKIES//
                                
     return res
     .status(200).cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json({"Doctor login successfully":true})
     
})


const doctoredit = async (req, res) => {
    const { Patientname, Prescription, status } = req.body;
    console.log(Patientname,Prescription,status)
    // Input validation
    if (!Patientname) {
        throw new ApiError(400, "Patient name is required");
    }
    if (!Prescription) {
        throw new ApiError(400, "Prescription is required for the patient");
    }

    // Check if the patient exists
    const checkpatient = await Patient.findOne({ Name: Patientname });
    if (!checkpatient) {
        throw new ApiError(400, "Patient not found in the database");
    }

    const checkpatientappointment = await Appointment.findOne({ Patient: checkpatient._id });
    if (!checkpatientappointment) {
        throw new ApiError(400, "Patient appointment is not scheduled yet");
    }

    // Update the appointment
    const appointmentupdate = await Appointment.updateOne(
        { _id: checkpatientappointment._id }, // Filter
        { $set: { Prescription, status } }    // Update
    );

    res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        data: appointmentupdate,
    });
};





const doctoreditmeetinglink = async (req, res) => {
    const { Patientname, meetinglink } = req.body;

    // Input validation
    if (!Patientname) {
        throw new ApiError(400, "Patient name is required");
    }
    if (!meetinglink) {
        throw new ApiError(400, "Meeting link is required for the patient");
    }

    // Check if the patient exists
    const checkpatient = await Patient.findOne({ Name: Patientname });
    if (!checkpatient) {
        throw new ApiError(400, "Patient not found in the database");
    }

    const checkpatientappointment = await Appointment.findOne({ Patient: checkpatient._id });
    if (!checkpatientappointment) {
        throw new ApiError(400, "Patient appointment is not scheduled yet");
    }

    // Update the meeting link
    const appointmentupdate = await Appointment.updateOne(
        { _id: checkpatientappointment._id }, // Filter
        { $set: { meetinglink } }             // Update
    );

    res.status(200).json({
        success: true,
        message: "Appointment meeting link updated successfully",
        data: appointmentupdate,
    });
};
export {Doctorregister,logindoctor,doctoredit,doctoreditmeetinglink}
