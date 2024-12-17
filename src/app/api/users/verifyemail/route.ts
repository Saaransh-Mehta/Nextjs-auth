import { User } from "@/models/userModels";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/db";
  
connect()
export async function POST(req:NextRequest, res:NextResponse){

    try{
        const reqBody =await req.json()
        const {token} = reqBody
        console.log(token)

      const user =   await User.findOne({verifyToken:token})
      if(!user){
      return  NextResponse.json({message:"User not found"},{status:400})
      }
      console.log(user)

      user.isVerified = true;
      user.verifyToken = undefined
      user.verifyTokenPassowrd = undefined
      await user.save()

      return NextResponse.json({message:"User verified successfully",data:"OK"}, {status:200})

    }
    catch(error:any){
      return  NextResponse.json({message:error.message},{status:500})

    }

}