import { useState } from "react";
import { FormattedMessage } from "react-intl";
import Modal from "../modal/Modal"
import UserWindow from "../user/UserWindow";

import adBanner from '../../assets/images/weborado-full.png';

import currentDate from "../date";

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

    let messageContent = message?.content;
    if (isAd) {
        messageContent = (
            <>
                <FormattedMessage id='ad' />
                <img className="ad-banner" src={adBanner} alt="domenai.lt banner"></img>
            </>)
    }

    return (
        <>
            <div key={message.user + message.time + message.content} className={`chat__message ${isAd ? 'ad' : ''}`} onClick={isAd ? () => window.open(AD_URL, '_blank', 'noopener,noreferrer') : openModal}>
                <div className='message__upper'>
                    <p className='message-user'>{message.user}</p>
                    <p className='digit'>{isAd ? currentDate() : message.time}</p>
                </div>
                <p className='message-content'>
                    {messageContent}
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