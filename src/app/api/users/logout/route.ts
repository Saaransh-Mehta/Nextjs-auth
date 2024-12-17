import { NextResponse , NextRequest} from "next/server";

export async function GET(req:NextRequest){
   try{
    const response = NextResponse.json({message:"User logged out successfully"},{status:200})
    response.cookies.set("jwt","",{httpOnly:true,expires:new Date(0)})
    return response
   }catch(error:any){
    console.log(error)
    return NextResponse.json({message:error.message},{status:500})
   }

}