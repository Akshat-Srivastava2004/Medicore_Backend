import { Feedback } from "../models/Feedback_model";
import { ApiError } from "../util/ApiError";

const Feedback=async(req,res)=>{
    const {patientname,message}=req.body
    if(!Patientname){
        throw new ApiError(401,"Patient should be registered first ")
    }
    if(!message){
        throw new ApiError(401,"message is required ")
    }
    const Patientname=patientname;
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
export {Feedback}