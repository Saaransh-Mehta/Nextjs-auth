import connect from "@/db/db";
import { User } from "@/models/userModels";
import { NextResponse,NextRequest } from "next/server";
import { Toast,toast } from "react-hot-toast";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function POST(req:NextRequest){
    try {
        const reqBody =await req.json()
        const {email,password} = reqBody
        if(!email || !password){
            console.error("Error occured becuase respective field are not filled")
        }
        
        const exisitingUser = await User.findOne({email})
        if(!exisitingUser){
            console.error("User not found please SignUp")
        }
        const checkpassword = await bcryptjs.compare(password,exisitingUser.password)
        if(!checkpassword){
            console.log("Error occured wrong password")
        }

        // JSON WEB TOKENS 
        const payload = {
            id:exisitingUser._id,
            name:exisitingUser.username,
            email:exisitingUser.email

        }
        const token  = jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn:"3h"})
        

        const response = NextResponse.json({message:"User fetched ! Logged in successfuly",exisitingUser})

        response.cookies.set(
            "jwt",
            token,
            {
            httpOnly:true
        })
        
        return response

    } catch (error) {
     console.log(error)
    }
}