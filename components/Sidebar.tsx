"use client"
import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut } from 'next-auth/react'
import { ArrowLeftEndOnRectangleIcon} from '@heroicons/react/24/solid'

const Sidebar = () => {

    const { data: session } = useSession();

    return (
        <div className='p-2 flex flex-col h-screen'>
            <div className='flex-1'>
                <div>
                    <NewChat />
                    <div>
                        {/* ModelSelection */}
                    </div>
                    
                    {/* Map through the Chatrows */}
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
                        <ArrowLeftEndOnRectangleIcon className='h-5 w-5 mr-2' />
                        Sign Out
                    </button>
                </>
            )}
        </div>
    )
}

export default Sidebar
