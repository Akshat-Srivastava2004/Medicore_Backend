import { Feedback } from "../models/Feedback_model.js";
import { ApiError } from "../util/ApiError.js";

const Feedbackbypatient=async(req,res)=>{
    const {patientname,message}=req.body
    if(!patientname){
        throw new ApiError(401,"Patient should be registered first ")
    }
    if(!message){
        throw new ApiError(401,"message is required ")
    }
    const Patient=patientname;
    const Message=message;
    const feedback=await Feedback.create({
        Patient,
        Message
    })
   res.status(201).json({
    success:"true",
    message:"Feedback Successfully Created",
    data:feedback
   })
}
export {Feedbackbypatient}