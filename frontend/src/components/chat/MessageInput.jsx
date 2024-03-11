import { useUser } from '../../context/UserProvider';
import { useLanguage } from '../../context/LanguageProvider';

import { sendGlobalChat } from '../../utils/api';

export default function MessageInput() {
    const { userId } = useUser();
    const { locale } = useLanguage();

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
    }

    return (
        <form onSubmit={sendMessage}>
            <input type="text" name="message" placeholder="Message"></input>
            <button type="submit"
            >
                Send
            </button>
        </form>
    )
}   