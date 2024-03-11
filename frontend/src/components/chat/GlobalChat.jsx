import './chat.css';
import MessageInput from './MessageInput';

import { getGlobalChat } from '../../utils/api';
import { usePage } from "../../context/PageProvider";

import { useEffect, useState } from 'react';

import io from 'socket.io-client';
const isLocalhost = window.location.hostname === 'localhost';
const socketUrl = isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt';

const socket = io.connect(socketUrl);

export default function GlobalChat() {
    const { currentUserPageName } = usePage();
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        getGlobalChat().then(data => {
            setChatLog(data);
        });
    }, [])

    socket.on('chat', () => {
        getGlobalChat().then(data => {
            setChatLog(data);
        });
    })

    return (
        <div className={`user-page chat-page ${currentUserPageName === 'chat' ? 'active' : ''}`}>
            <div className='chat__log'>
                {chatLog.map((message, index) => (
                    <div key={index} className='chat__message'>
                        <p>{message.message}</p>
                        <p>{message.user}</p>
                        <p className='digit'>{message.time}</p>
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    )
}