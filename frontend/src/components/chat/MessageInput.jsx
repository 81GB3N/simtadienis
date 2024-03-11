import { useUser } from '../../context/UserProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { useRef } from 'react';

import { useIntl } from 'react-intl';

import { sendGlobalChat } from '../../utils/api';

import { LiaPaperPlaneSolid } from "react-icons/lia";

export default function MessageInput() {
    const { userId } = useUser();

    const { locale } = useLanguage();
    const intl = useIntl();

    const inputRef = useRef();

    const sendMessage = async (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const payload = {
            user: `${userId.name} ${userId.surname}`,
            message: message,
            time: new Date().toLocaleString(locale)
        }
        sendGlobalChat(payload).then(data => {
            console.log('sent: ', data);
        });
        inputRef.current.value = '';
    }

    return (
        <form className='chat__form' onSubmit={sendMessage}>
            <input className='chat-input'
                ref={inputRef}
                type="text"
                name="message"
                placeholder={intl.formatMessage({ id: 'message' })}></input>
            <button className='chat-submit-btn' type="submit">
                <LiaPaperPlaneSolid />
            </button>
        </form>
    )
}   