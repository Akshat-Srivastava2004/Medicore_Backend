import mongoose ,{Schema}from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const DoctorSchema=new Schema({
    Name:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
    },
    Email:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
        unique:true,
    },
    Phonenumber:{
        type:Number,
        require:true,
        unique:true,
    },
    Password:{
        type:String,
        require:[true,'password is required'],
    },
    Specialization:{
        type:String,
        require:true,
    },
    Profilephoto:{
        type:String,
        require:true,
    },
    Refreshtoken:{
    type:String
    },    

},{
    timestamps:true
})
DoctorSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

DoctorSchema.methods.isPasswordCorrect = async function(Password) {
    // Check if Password is provided
    if (!Password) {
        throw new Error("Password is required for comparison.");
    }
    // Check if this.Password is set
    if (!this.Password) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(Password, this.Password);
};

DoctorSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        Lastname:this.LastName,
        email:this.Email,
        username:this.username,
        fullname:this.FullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    DoctorSchema.methods.generateRefreshToken=function(){
        return jwt.sign(
            {
            _id:this.id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        }

export const Doctor = mongoose.model("Doctor",DoctorSchema)