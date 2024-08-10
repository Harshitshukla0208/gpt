import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { collection } from 'firebase/firestore';

type Props = {
    id: string;
};

const ChatRow = ({ id }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(id));
    }, [pathname, id]);

    const userEmail = session?.user?.email;
    const [messages] = useCollection(
        userEmail ? collection(db, 'users', userEmail, 'chats', id, 'messages') : null
    );

    return (
        <Link href={`/chat/${id}`} className={`chatRow ${active ? 'bg-gray-700/50' : ''} justify-center`}>
            <ChatBubbleLeftIcon className='h-5 w-5' />
            <p className='flex-1 hidden md:inline-flex truncate'>
                {messages?.docs[messages.docs.length - 1]?.data().text || 'New Chat'}
            </p>
            <TrashIcon className='h-5 w-5 text-gray-700 hover:text-red-700' />
        </Link>
    );
};

export default ChatRow;
