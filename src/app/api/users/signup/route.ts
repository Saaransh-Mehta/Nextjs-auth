import connect from "@/db/db";
import {User} from '@/models/userModels'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
// import { error } from "console";
// import cors from "@/middleware";




connect();

export async function POST(req:NextRequest){

    // await cors(req, res);
    try {
     const reqBody =  await req.json()
     const {username,email,password} = reqBody

     console.log(reqBody)
     if(!username || !email || !password){
        return NextResponse.json({error:"Please filled up required fields"},{status:400})
     }

     

     const user = await User.findOne({email: email})
     if(user){
        return NextResponse.json({error: "User exists"}, {status:400})
     }

    

     const hashedPassword = await bcryptjs.hash(password,10)

     const newUser = await User.create({
        username,
        password:hashedPassword,
        email
     })
     
     await sendEmail({email,emailType:"VERIFY",userId:newUser._id})

     return NextResponse.json({message:"User created successfully",newUser}, {status:200})


        
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:400}
        )
    }

}