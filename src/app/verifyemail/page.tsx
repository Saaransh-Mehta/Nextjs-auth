'use client'
import React,{useEffect,useState} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function verifyEmailPage(){
    const  [token ,setToken] = useState<any>();
    const [verified,setVerified] = useState<any>()
    const [error,setError] = useState<any>("")

    const verifyEmail = async() =>{
        try {
            await axios.post('/api/users/verifyemail',{token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.message)
        }
    }

    useEffect(()=>{
        const url = window.location.search.split('=')[1]
        setToken(url)
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyEmail()
        }
    },[token])
    return(
        <div className="flex flex-col items-center justify-center">
           <div className="text-4xl">
           VERIFY EMAIL PAGE
           <div>
            {token ? "Token present" : "Token not present"}
           </div>
           </div>
        </div>
    )
}