import { useEffect, useState, useRef } from 'react';
import { usePage } from '../../context/PageProvider';
import { getGlobalChat } from '../../utils/api';
import io from 'socket.io-client';

const isLocalhost = window.location.hostname === 'localhost';
const socketUrl = isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt';

const socket = io.connect(socketUrl);

export default function ChatLog() {
    const [chatLog, setChatLog] = useState([]);
    const { currentUserPageName } = usePage();
    const chatLogRef = useRef(null);


    useEffect(() => {
        if (currentUserPageName !== 'chat') {
            socket.off('chat');
            return;
        }
        getGlobalChat().then(data => {
            setChatLog(data.payload);
            setTimeout(() => {
                chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
            }, 1);
        });
        socket.on('chat', (message) => {
            console.log('socket message: ', message);
            setChatLog(prev => [...prev, message]);
            setTimeout(() => {
                chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
            }, 1);
        });
    }, [currentUserPageName]);


    return (
        <div className='chat__log' ref={chatLogRef}>
            {chatLog.map(message => (
                <div key={message.user + message.time + message.content} className='chat__message'>
                    <div className='message__upper'>
                        <p className='message-user'>{message.user}</p>
                        <p className='digit'>{message.time}</p>
                    </div>
                    <p className='message-content'>{message.content}</p>

                </div>
            ))}
        </div>
    );
}