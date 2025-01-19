import mongoose ,{Schema}from "mongoose";


const AppointmentSchema=new Schema({
    Patient:{
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
    Prescription:{
        type:String,
        require:false,
        default:"Attend the appointment first "
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