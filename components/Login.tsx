"use client"
import Image from 'next/image'
import React from 'react'
import logo from '../public/gpt-logo-light.svg'
import { signIn } from 'next-auth/react'

const Login = () => {
    return (
        <div className='h-screen flex flex-col items-center justify-center text-center'>
            <Image
                src={logo}
                width={150}
                height={150}
                alt="logo"
                color='white'
            />
            <button 
                onClick={() => signIn('google')} 
                className='text-white font-bold text-3xl animate-pulse'
            >
                Sign In to use GPT
            </button>
        </div>
    )
}

export default Login
