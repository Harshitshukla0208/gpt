import React from 'react'
import Chat from "../../../components/Chats"
import ChatInput from '@/components/ChatInput'

type Props ={
    id: string;
}

const ChatPage = ({id} : Props) => {
    return (
        <div className='flex flex-col h-screen overflow-hidden'>
            <Chat chatId={id} />
            <ChatInput chatId={id} />
        </div>
    )
}

export default ChatPage
