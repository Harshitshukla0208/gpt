"use client"
import React from 'react'
import NewChat from './NewChat'
import ChatRow from './ChatRow'
import { useSession, signOut } from 'next-auth/react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from '@/firebase'
import { collection, orderBy, query, where } from "firebase/firestore"

const Sidebar = () => {

    const { data: session } = useSession();

    const userChatsRef = session
        ? query(
            collection(db, "users", session.user?.email!, "chats"),
            orderBy("createdAt", 'asc')
        )
        : null;

    const [chats, loading, error] = useCollection(userChatsRef);

    return (
        <div className='p-2 flex flex-col h-screen'>
            <div className='flex-1'>
                <div>
                    <NewChat />
                    <div>
                        {/* ModelSelection */}
                    </div>
                    
                    {/* Map through the Chatrows */}
                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id = {chat.id} />
                    ))}
                </div>
            </div>
            {session && (
                <>
                    <img 
                        src={session.user?.image!} 
                        alt='user profile picture' 
                        className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-6 hover:opacity-50'
                    />
                    <button 
                        onClick={() => signOut()} 
                        className='flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg mx-auto mb-4 hover:bg-gray-700'
                    >
                        <ArrowLeftOnRectangleIcon className='h-5 w-5 mr-2' />
                        Sign Out
                    </button>
                </>
            )}
        </div>
    )
}

export default Sidebar
