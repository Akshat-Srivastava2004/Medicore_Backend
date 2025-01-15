import mongoose ,{Schema}from "mongoose";


const AppointmentSchema=new Schema({
    patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient",
        require:true
    },
    Doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor",
        require:true,
    },
    appointmentDate: {
        type: Date,
        required: true,
      },
    meetinglink:{
           type:String,
           require:true,
    },
    prescription:{
        type:String,
        require:false,
    },
    Attend:{
        type:Boolean,
        default:false
    },
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Canceled"],
        default: "Scheduled",
      },   

},{
    timestamps:true
})

 export const  Appointment = mongoose.model("Appointment",AppointmentSchema)