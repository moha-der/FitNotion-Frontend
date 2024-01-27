'use client'
import React from 'react'
import { useSession } from "next-auth/react"
import ButtonAuth from '../components/SignOut/SignOut';

const page = () => {
  const { data: session, status } = useSession();
  console.log(session?.user);
  return (
    <div className='ml-4 mt-4'>
      <div>Hola Berfin te quieroooo ❤</div>
      <ButtonAuth/>
    </div>
    
  )
}

export default page