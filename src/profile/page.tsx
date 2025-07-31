"use client"
import LoginButton from '@/components/login';
import { useSession } from 'next-auth/react';
import React from 'react'

const Profile = () => {
    const user = useSession();
        if (!user)
        return( 
        <div className='flex'><LoginButton /></div>
        )
  return (
    <div>{JSON.stringify({user})}</div>
  )
}

export default Profile