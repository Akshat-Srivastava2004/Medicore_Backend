import mongoose,{Schema} from "mongoose";

const FeedbackSchema = new Schema({
    Patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient",
        require:true
    },
    Message:{
        type:String,
        requrie:true,
    }
},{timestamps:true})
export const Feedback=mongoose.model("Feedback",FeedbackSchema)