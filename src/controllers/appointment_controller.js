import { ApiError } from "../util/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
// import { Postuser } from "./post.controller.js";
import { Doctor } from "../models/doctor_model.js";
import { Patient } from "../models/patient_model.js";
import nodemailer from "nodemailer"
import { Appointment } from "../models/appointment_model.js";
                                 // REGISTERING THE USER //


const Appointmentschedule=asyncHandler(async(req,res)=>{
    const {doctorname,patientname,appointmentDate}=req.body
       console.log(doctorname,patientname,appointmentDate)
        if(doctorname===""){
            throw new ApiError(400,"Name is required ")
        }
        if(patientname===""){
            throw new ApiError(400,"Phonenumber is required")
        }
        if(appointmentDate===""){
            throw new ApiError(400,"Email is required ")
        }

        const Patientexist=await Patient.findOne({Name:patientname})
        if(!Patientexist){
            throw new ApiError(400,"Patient is not exist ")
        }
        const Patient1=Patientexist._id;
        const doctorexist=await Doctor.findOne({Name:doctorname})
        if(!doctorexist){
            throw new ApiError(400,"doctor is not exist ")
        }    
        const Doctor1=doctorexist._id;

        const  newAppointment=await Appointment.create({
            Patient:Patient1,
            Doctor:Doctor1,
            appointmentDate
        })
        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: newAppointment,
        });
})



export {Appointmentschedule}