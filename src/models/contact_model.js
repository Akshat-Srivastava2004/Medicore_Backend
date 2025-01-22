import mongoose,{Schema} from "mongoose";

const Contactschema=new Schema({
    Email:{
        type:String,
        require:true,
    },
    Message:{
        type:String,
        require:true,
    }
},{timestamps:true})

export const Contact=new mongoose.model("Contact",Contactschema)