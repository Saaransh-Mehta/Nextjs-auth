import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    passwordToken:String,
    forgetPasswordToken:Date,
    verifyToken:String,
    forgetVerifyToken:String
})

export const User =  mongoose.models.User || mongoose.model("User",userSchema)