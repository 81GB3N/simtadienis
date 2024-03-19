import { useEffect, useState, useRef } from 'react';
import { usePage } from '../../context/PageProvider';
import { getGlobalChat } from '../../utils/api';
import io from 'socket.io-client';
import ChatMessage from './ChatMessage';

const isLocalhost = window.location.hostname === 'localhost';
const socketUrl = isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt';

const socket = io.connect(socketUrl);

/**
 * Renders the chat log component.
 * @returns {JSX.Element} The chat log component.
 */
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
                <ChatMessage message={message} key={message.user + message.time + message.content} />
            ))}
        </div>
    );
}