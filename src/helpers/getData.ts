import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function getData(request : NextRequest){

try {
   const token = request.cookies.get('jwt')?.value || ""
   const decoded:any = jwt.verify(token,process.env.JWT_SECRET!)
   return decoded.id;


} catch (error) {
    console.log(error)
}

}