"use client";
import React from 'react'
import {signOut} from "next-auth/react";
import { Button } from './ui/button';

const Logout = () => {
  return (
    <div><Button className='hover:bg-foreground/80 hover:scale-105 transition transform duration-200 ease-in-out' onClick={() => signOut({callbackUrl:"/"})}>Logout</Button></div>
  )
}

export default Logout;