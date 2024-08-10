"use client";
import Image from 'next/image';
import React from 'react';
import logo from '../public/gpt-logo-light.svg';
import googleLogo from '../public/google-logo.svg';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    return (
        <AnimatePresence mode="popLayout">
            <div className='min-h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden'>
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 25, // Duration of the entire animation cycle
                        ease: "linear",
                        repeat: Infinity, // Animation will loop infinitely
                    }}
                >
                    <Image
                        src={logo}
                        width={150}
                        height={150}
                        alt="logo"
                    />
                </motion.div>
                <button
                    onClick={() => signIn('google')}
                    className='text-white font-bold text-3xl animate-pulse mt-8 px-8 py-4 flex items-center'
                    style={{ zIndex: 10 }}
                >
                    <Image className="h-8 mt-1 w-8 mr-4 text-white" src={googleLogo} alt="google-logo" />
                    Sign In to use GPT
                </button>
            </div>
        </AnimatePresence>
    );
}

export default Login;
