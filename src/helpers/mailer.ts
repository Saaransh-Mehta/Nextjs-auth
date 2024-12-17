import nodemailer from 'nodemailer'
import { User } from "@/models/userModels"
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({email,emailType,userId}:any)=>{
   try {
    const hashedToken = await bcryptjs.hash(userId.toString() ,10)
    if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,forgetVerifyToken:Date.now() + 3600000})
    }else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,{passwordToken:hashedToken,forgetPasswordToken:Date.now() + 3600000})
    }

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
    }
  });


  const mailOptions = {
    from:"",
    to:email,
    subject: emailType === 'VERIFY' ? "VERIFY EMAIL" : "FORGET PASSWORD EMAIL",
    text: emailType === 'VERIFY' ? "This mail is for verifying the user" : "This email is for password change",
    html:`<p> Click here to verify <a> ${process.env.DOMAIN}</a>/verifyEmail?token=<a>${hashedToken}</a> to ${ emailType === 'VERIFY' ? "This mail is for verifying the user" : "This email is for password change"} </p>` 
  }


  const mailResponse = await transport.sendMail(mailOptions)
   } catch (error:any) {
    console.log(error)
   }
}