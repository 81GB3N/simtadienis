import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Modal from "../modal/Modal"
import UserWindow from "../user/UserWindow";

const AD_URL = 'https://weborado.lt';

export default function ChatMessage({ message }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const isAd = message?.ad;

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const openModal = () => {
        setModalIsOpen(true);
    }

    return (
        <>
            <div key={message.user + message.time + message.content} className={`chat__message ${isAd ? 'ad' : ''}`} onClick={isAd ? () => window.open(AD_URL, '_blank', 'noopener,noreferrer') : openModal}>
                <div className='message__upper'>
                    <p className='message-user'>{message.user}</p>
                    <p className='digit'>{message.time}</p>
                </div>
                <p className='message-content'>
                    {
                        isAd ? <FormattedMessage id='ad' /> : message.content
                    }
                </p>
            </div>
            {
                modalIsOpen &&
                <Modal openOnMount>
                    <UserWindow user={message.user} closeModal={closeModal} isAd={isAd} />
                </Modal>
            }
        </>
    )
}