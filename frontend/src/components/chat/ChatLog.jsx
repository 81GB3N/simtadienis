import { useEffect, useState, useRef } from 'react';
import { usePage } from '../../context/PageProvider';
import { getGlobalChat } from '../../utils/api';
import io from 'socket.io-client';

const isLocalhost = window.location.hostname === 'localhost';
const socketUrl = isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt';

const socket = io.connect(socketUrl);

export default function ChatLog() {
    const [chatLog, setChatLog] = useState([]);
    const [pagination, setPagination] = useState(1);
    const { currentUserPageName } = usePage();
    const chatLogRef = useRef(null);

    socket.on('chat', () => {
        getGlobalChat(pagination).then(data => {
            setChatLog(data);
        });
    });

    useEffect(() => {
        if (currentUserPageName !== 'chat') {
            socket.off('chat');
            return;
        }
        getGlobalChat(pagination).then(data => {
            console.log('chat log', data);
            setChatLog(data);
        });
    }, [currentUserPageName, pagination]);
    

    const handleScroll = () => {
        const chatLogContainer = chatLogRef.current;
        if (chatLogContainer.scrollTop === 0) {            // User has reached the top of the container
            setPagination(prevPage => prevPage + 1)
        }
    };

    return (
        <div className='chat__log' ref={chatLogRef} onScroll={handleScroll}>
            {chatLog.map((message, index) => (
                <div key={message.user + message.time} className='chat__message'>
                    <p>{message.message}</p>
                    <p>{message.user}</p>
                    <p className='digit'>{message.time}</p>
                </div>
            ))}
        </div>
    );
}