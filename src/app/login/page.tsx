'use client'
import React,{useState} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {toast,Toast, Toaster} from 'react-hot-toast'
export default function LoginPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const Router = useRouter()
    const onLogin = async()=>{
        try {
            const res = await axios.post("/api/users/login",{
                email,
                password
            })
            console.log(res.data)
            Router.push("/profile")
        } catch (error:any) {
           toast.error(error.message)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-3">
            <Toaster/>
            <h1 className="text-xl">
                Login
            </h1>
            <hr />
            <div className="grid grid-cols-2 gap-3">
                <label htmlFor="email">Email</label>
                <input type="email"
                placeholder="Enter your email"
                id="email"
                value={email}
                 className="border border-black/20 rounded-md p-1"
                onChange={(e)=>setEmail(e.target.value)}
                required={true}
                />  
                <label htmlFor="password">Password</label>
                <input type="password"
                placeholder="Enter your password"
                id="password"
                value={password}
                className="border border-black/20 rounded-md p-1"
                onChange={(e)=>setPassword(e.target.value)}
                required={true}
                />  
                
            </div>
            <button onClick={onLogin} className="btn bg-purple-300 hover:bg-purple-400 duration-300 p-4 pl-6 pr-6 rounded-md">Login</button>
            <Link href={'/signup'}><button className="btn bg-red-300 hover:bg-red-400 duration-200 rounded-md p-4 pl-6 pr-6">SignUp</button></Link>
        </div>
    )
}


