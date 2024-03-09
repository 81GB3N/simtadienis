import './chat.css';

import { usePage } from "../../context/PageProvider";

export default function GlobalChat() {

    const { currentUserPageName } = usePage();

    return (
        <div className={`user-page chat-page ${currentUserPageName === 'chat' ? 'active' : ''}`}>
            <h1>Global Chat</h1>
        </div>
    )
}