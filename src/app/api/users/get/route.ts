import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { getData } from "@/helpers/getData";
import { NextRequest,NextResponse } from "next/server";
import connect from "@/db/db";
import { User } from "@/models/userModels";



connect()

export async function GET(req:NextRequest, res:NextResponse){
try {
    const userId = await getData(req)
  const exisitingUser =  await User.findById(userId).select('-password -isAdmin') 
  return NextResponse.json({message:"User Fetched",data:exisitingUser},{status:200})
} catch (error:any) {
    console.log(error)
    return NextResponse.json({message:error.message},{status:500})
}
}