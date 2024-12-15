'use client'

import React from 'react'

const userProfile = ({params}:any) => {
  return (
    <div className='h-[100vh] flex justify-center items-center flex-col'>
      <div>Profile Page
        <div>
            Profile of Person {params.id}
        </div>
        

    </div>
    </div>

  )
}

export default userProfile