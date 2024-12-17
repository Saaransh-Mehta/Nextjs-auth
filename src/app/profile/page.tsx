'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const page = () => {
  const [user,setUser] = useState({})
  const router = useRouter()
  const onLogout = async()=>{
    try {
      const res = await axios.get('/api/users/logout')
    console.log("Successfully logged out",res.data)
    toast.success("Successfully logged out")
    router.push("/login")

    } catch (error:any) {
      toast.error(error.message)
    }
    
  }
  useEffect(()=>{
   const fetchData = async ()=>{
    const req = await axios.get('/api/users/get')
    .then((response)=>{  setUser(response.data.data)})
    
    return req
   }

   fetchData()
  },[])

  console.log(user)
  return (
    <div className='flex flex-col min-h-[100vh] justify-center items-center '>Profile page
  <div>
    <div className='flex flex-col justify-center'>
     Username: <span className='text-bold text-2xl '>{user.username}</span> 
    </div>
    <Toaster/>
    <button onClick={onLogout} className='btn bg-red-400 focus:bg-red-500 focus:outline-black duration-300 p-5 mt-10 rounded-lg'>Logout</button>
  </div>
    </div>
  )
}

export default page