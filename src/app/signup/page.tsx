'use client'
import Link from "next/link"
import React,{useEffect, useState,useRef} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"



export default function SignUp(){

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [disabledButton,setDisabledButton] = useState(true)
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const buttonRef = useRef(null)
    useEffect(()=>{
      if(username && password && email){
        setDisabledButton(false)
      
      }else{
      setDisabledButton(true)
      }
    },[username,email,password])

      const onSignUp = async()=>{
        try{
          const res = await axios.post('/api/users/signup',{
            username,email,password
          })
          console.log("SignUP SUCCESS", res.data)
          router.push('/login')
        }catch(error:any){
          toast.error(error.message)
        }
       
      }
    return(
      <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-3">
        <Toaster/>
        <h1>{loading ? "This is loading" : "This is not loading"}</h1>
        <hr />
        <div className="grid grid-cols-2 mt-4 gap-3">
        <label className="m-2" htmlFor="username">Username</label>
        <input type="text" id="username" value={username} 
        onChange={(e)=>setUsername(e.target.value)}
        placeholder="Enter your username here."
        className="border border-black/10 focus:to-black p-1 rounded-md"
        />
        <label className="m-2" htmlFor="email">Email</label>
        <input type="email" id="email" value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Enter your Email here."
        className="border border-black/10 focus:to-black p-1 rounded-md"
        />
        <label className="m-2" htmlFor="password">Password</label>
        <input type="password" id="password" value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Enter your Password here."
        className="border border-black/10 focus:to-black p-1 rounded-md"
        />
        
        </div>
        <button onClick={onSignUp}  className=" btn bg-purple-300 rounded-lg tracking-wide p-3 hover:bg-purple-400 duration-300">{disabledButton ? "No SignUp kiddo" : "You can signup kiddo"}</button>
      <Link href={'/login'}> <button className="btn bg-red-300 rounded-lg tracking-wide p-4 hover:bg-red-400 duration-300">Login</button></Link> 

      </div>
      </>
    )
}