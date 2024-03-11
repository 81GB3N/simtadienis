import { useUser } from '../../context/UserProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { useState } from 'react';

import { useIntl } from 'react-intl';

import { sendGlobalChat } from '../../utils/api';

import { LiaPaperPlaneSolid } from "react-icons/lia";

const MAX_MESSAGE_LENGTH = 100;
const SHAKE_ANIMATION_DURATION = 500; // in ms, as defined in css 

export default function MessageInput() {
    const { userId } = useUser();

    const { locale } = useLanguage();
    const intl = useIntl();

    const [inputMessage, setInputMessage] = useState('');
    const [shake, setShake] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.length > MAX_MESSAGE_LENGTH || inputMessage.length <= 0) {
            setShake(true);
            setTimeout(() => {
                setShake(false);
            }, SHAKE_ANIMATION_DURATION);
            return;
        }
        const payload = {
            user: `${userId.name} ${userId.surname}`,
            content: inputMessage,
            time: new Date().toLocaleString(locale, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            })
        }
        sendGlobalChat(payload).then(data => {
            console.log('sent: ', data);
        });
        setInputMessage('');   
    }

    return (
        <form className='chat__form' onSubmit={sendMessage}>
            <div className='chat-input-container'>
                <input className='chat-input'
                    type="text"
                    name="message"
                    onChange={(e) => setInputMessage(e.target.value)}
                    value={inputMessage}
                    placeholder={intl.formatMessage({ id: 'message' })}>
                </input>
                <div className={`input-counter ${inputMessage.length > MAX_MESSAGE_LENGTH || inputMessage.length <= 0 ? 'invalid' : ''} ${shake ? 'shake' : ''} digit`}>
                    <p>{inputMessage.length}/{MAX_MESSAGE_LENGTH}</p>
                </div>
            </div>
            <button className='chat-submit-btn' type="submit">
                <LiaPaperPlaneSolid />
            </button>
        </form>
    )
}   