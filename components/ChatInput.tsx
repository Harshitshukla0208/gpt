"use client"
import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react'

type Props = {
    chatId: string;
}

const ChatInput = ({chatId} : Props) => {

    const [prompt, setPrompt] = useState("")
    const {data: session} = useSession();

    //useSWR to get model
    const model = "text-davinci-003"

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            }
        }

        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        //toast notification

        //backend communications
        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
            //toast notification to say sucessful
        })
    }

    return (
        <div className='bg-gray-700/50 text-gray-400 rounded-t-lg text-sm'>
            <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
                <input 
                    className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                    disabled={!session}
                    type="text" 
                    placeholder='Type your message here...'
                    value = {prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button disabled={!prompt || !session} type='submit' className='bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed'>
                    <PaperAirplaneIcon className='h-4 w-4 -rotate-45' />
                </button>
            </form>
            <div>
                {/* model selection */}
            </div>
        </div>
    )
}

export default ChatInput
