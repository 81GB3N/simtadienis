import './chat.css';

import { usePage } from "../../context/PageProvider";

export default function GlobalChat() {

    const { userSubPageName } = usePage();

    return (
        <div className={`user-page chat-page ${userSubPageName === 'chat' ? 'active' : ''}`}>
            <h1>Global Chat</h1>
        </div>
    )
}