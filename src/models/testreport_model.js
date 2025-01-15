import mongoose ,{Schema, type}from "mongoose";


const TestSchema=new Schema({
    patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient",
        require:true
    },
   Patientdetails:{
    type:String,
    require:true,
   }

},{
    timestamps:true
})

const Test = mongoose.model("Test",TestSchema)