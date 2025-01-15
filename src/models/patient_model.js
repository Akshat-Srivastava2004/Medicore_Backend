import mongoose ,{Schema}from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const PatientSchema=new Schema({
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
        type:String,
        require:true,
        unique:true,
    },
    Password:{
        type:String,
        require:[true,'password is required'],
    },
    Bloodgroup:{
           type:String,
           require:[true,'Blood group is required for a patient '],
           lowercase:true,
    },
    PastReport:{
        type:String,
        require:true
    },

    Refreshtoken:{
    type:String
    },    

},{
    timestamps:true
})

PatientSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

PatientSchema.methods.isPasswordCorrect = async function(Password) {
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

PatientSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        Name:this.Name,
        Email:this.Email,
        Bloodgroup:this.Bloodgroup,
        Phonenumber:this.Phonenumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    PatientSchema.methods.generateRefreshToken=function(){
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

export const Patient = mongoose.model("Patient",PatientSchema)