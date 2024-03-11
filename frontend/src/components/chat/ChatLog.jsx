import { useEffect, useState } from 'react';
import { usePage } from '../../context/PageProvider';
import { getGlobalChat } from '../../utils/api';

import io from 'socket.io-client';
const isLocalhost = window.location.hostname === 'localhost';
const socketUrl = isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt';

const socket = io.connect(socketUrl);

export default function ChatLog() {
    const [chatLog, setChatLog] = useState([]);
    const { currentUserPageName } = usePage();

    useEffect(() => {
        if (currentUserPageName !== 'chat') {
            socket.off('chat');
            return;
        }
        getGlobalChat().then(data => {
            setChatLog(data);
        });
        socket.on('chat', () => {
            getGlobalChat().then(data => {
                setChatLog(data);
            });
        });
    }, [currentUserPageName]);
    
    return (
        <div className='chat__log'>
            {chatLog.map((message, index) => (
                <div key={message.user + message.time} className='chat__message'>
                    <p>{message.message}</p>
                    <p>{message.user}</p>
                    <p className='digit'>{message.time}</p>
                </div>
            ))}
        </div>
    )
}