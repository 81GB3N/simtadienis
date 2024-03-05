import './chat.css';

import { useSubPage } from "../../context/SubPageProvider";

export default function GlobalChat() {

    const { userSubPageName } = useSubPage();

    return (
        <div className={`user-page chat-page ${userSubPageName === 'chat' ? 'active' : ''}`}>
            <h1>Global Chat</h1>
        </div>
    )
}