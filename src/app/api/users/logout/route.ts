import { NextResponse , NextRequest} from "next/server";

export async function GET(req:NextRequest){
   try{
    const response = NextResponse.json({message:"User logged out successfully"},{status:200})
    response.cookies.set("jwt","",{httpOnly:true})
    return response
   }catch(error){
    console.log(error)
   }

}