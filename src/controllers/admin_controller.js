import { ApiError } from "../util/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { uploadOnCloudinary } from "../util/cloudinary.js";
// import { Postuser } from "./post.controller.js"
import { Admin } from "../models/admin_model.js";
import {Patient} from "../models/patient_model.js"
import {Doctor} from "../models/doctor_model.js"
import { Staff } from "../models/staff_model.js";
import nodemailer from "nodemailer"
                                 // REGISTERING THE USER //


const Adminregister=asyncHandler(async(req,res)=>{
    const {Name,Email,Phonenumber,Password}=req.body
       console.log(Name,Email)
        if(Name===""){
            throw new ApiError(400,"Name is required ")
        }
        if(Phonenumber===""){
            throw new ApiError(400,"Phonenumber is required")
        }
        if(Email===""){
            throw new ApiError(400,"Email is required ")
        }
        if(Password===""){
            throw new ApiError(400,"password is required")
        }

    
        const existeduser=await Admin.findOne({
            $or:[{Name},  {Email}]
        })
        
        if(existeduser){
            throw new ApiError(409,"user already existed with this username")
        }
        
        

        const  user=await Admin.create({
            Name,
            Phonenumber,
            Email,
            Password,
           
        })

        const createdUser=await Admin.findById(user._id).select(
            "-Password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500,"Sorry unable to register user ")
        }
        return res.json({ "Admin successfully registered": true });
})



         // GENERATING TOKEN WHEN USER IS LOGIN THIS WILL WORK AFTER USER ENTER CORRECT USERNAME AND PASSWORD //
const generateAcessTokenAndRefereshTokens=async(userId)=>{
    try {
        const user=await Admin.findById(userId)
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

const loginAdmin=(async(req,res)=>{
    const {Name,Password}=req.body
    console.log(Name,Password)
    
    if(!Name){
        throw new ApiError(400,"Username is required")
    }
    const user=await Admin.findOne({
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
 
     const loggedInUser=await Admin.findById(user._id)
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
     .json({"Admin login successfully":true})
     
})
const getallpatient = async (req, res) => {
    try {
        // Assuming you have a Mongoose model named 'Patient'
        const patients = await Patient.find({}, { 
            Name: 1, 
            Email: 1, 
            Phonenumber: 1, 
            Password: 1, 
            Bloodgroup: 1, 
            PastReport: 0
        }); // Specify fields to include

        res.status(200).json({
            success: true,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch patient details",
            error: error.message
        });
    }
};

const getalldoctor = async (req, res) => {
    try {
        // Assuming you have a Mongoose model named 'Patient'
        const doctors = await Doctor.find({}, { 
            Name: 1, 
            Email: 1, 
            Phonenumber: 1, 
            Password: 1, 
            Specialization: 1, 
            Profilephoto: 0
        }); // Specify fields to include

        res.status(200).json({
            success: true,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch doctors details",
            error: error.message
        });
    }
};
const getallstaff = async (req, res) => {
    try {
        // Assuming you have a Mongoose model named 'Patient'
        const staff = await Staff.find({}, { 
            Name: 1, 
            Email: 1, 
            Phonenumber: 1, 
            Password: 0, 
            Adharcard: 1, 
            Department: 1
        }); // Specify fields to include

        res.status(200).json({
            success: true,
            data:staff 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch staff details",
            error: error.message
        });
    }
};
const deletePatient = async (req, res) => {
    try {
        const { Email } = req.body; // Assuming the ID is passed as a route parameter
        const findPatient = await Patient.findOne({Email:Email});
        const id=findPatient._id;
        const deletedPatient = await Patient.findByIdAndDelete(id);

        if (!deletedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, message: "Patient deleted successfully", data: deletedPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting patient", error: error.message });
    }
};
const deleteStaff = async (req, res) => {
    try {
        const { Email } = req.params;
        const findstaff = await Staff.findOne({Email:Email});
        const id=findstaff._id;
        const deletedStaff = await Staff.findByIdAndDelete(id);

        if (!deletedStaff) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        res.status(200).json({ success: true, message: "Staff deleted successfully", data: deletedStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting staff", error: error.message });
    }
};
const deleteDoctor = async (req, res) => {
    try {
        const { Email } = req.params;
        const Finddoctor=await Doctor.findOne({Email:Email})
        const id=Finddoctor._id;
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.status(200).json({ success: true, message: "Doctor deleted successfully", data: deletedDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting doctor", error: error.message });
    }
};
const updatePatient = async (req, res) => {
    try {
        
        const {updatedData,Email} = req.body;
        const findPatient = await Patient.findOne({Email:Email});
        const id=findPatient._id;
        const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, message: "Patient updated successfully", data: updatedPatient });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating patient", error: error.message });
    }
};
const updateStaff = async (req, res) => {
    try {
        
        const {updatedData,Email} = req.body;
        const findstaff = await Staff.findOne({Email:Email});
        const id=findstaff._id;
        const updatedStaff = await Staff.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedStaff) {
            return res.status(404).json({ success: false, message: "Staff not found" });
        }

        res.status(200).json({ success: true, message: "Staff updated successfully", data: updatedStaff });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating staff", error: error.message });
    }
};
const updateDoctor = async (req, res) => {
    try {
        
        const {updatedData,Email} = req.body;
        const Finddoctor=await Doctor.findOne({Email:Email})
        const id=Finddoctor._id;
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        res.status(200).json({ success: true, message: "Doctor updated successfully", data: updatedDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating doctor", error: error.message });
    }
};

export {Adminregister,loginAdmin,getallpatient,getalldoctor,getallstaff,deleteDoctor,deletePatient,deleteStaff,updateDoctor,updateStaff,updatePatient}

