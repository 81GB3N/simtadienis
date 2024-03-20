import { useState, useEffect, useCallback } from "react";
import { getUserData } from "../../utils/api";
import { FormattedMessage } from "react-intl";
import { useInView } from 'react-intersection-observer';
import Modal from "../modal/Modal"
import UserWindow from "../user/UserWindow";

import adBanner from '../../assets/images/weborado-full.png';
import unkownUserImg from "../../assets/images/unkown-user-new.png";

import currentDate from "../date";

const AD_URL = 'https://weborado.lt';

export default function ChatMessage({ message }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userProfileData, setUserProfileData] = useState({});
    const { ref, inView } = useInView({ threshold: 0, fallbackInView: true });

    const isAd = message?.ad;

    const fetchUserData = useCallback(async () => {
        try {
            const userId = message.user.split(' ');
            const name = userId[0];
            const surname = userId[1];
            const data = await getUserData({ name, surname });
            return data.response[0];
        } catch (err) {
            console.error(err);
        }
    }, [message.user]);

    useEffect(() => {
        if (inView) {
            fetchUserData().then(response => setUserProfileData(response));
        }
    }, [fetchUserData, inView]);

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
            <div key={message.user + message.time + message.content}
                className={`chat__message ${isAd ? 'ad' : ''}`}
                onClick={isAd ? () => window.open(AD_URL, '_blank', 'noopener,noreferrer') : openModal}
                ref={ref}>
                <div className='message__upper'>
                    <div className="message__user">
                        <p className='message-user'>
                            {message.user}
                        </p>
                        {!isAd &&
                            <div className="message-img-container">
                                <img className="message-img" src={userProfileData?.image || unkownUserImg} alt="user">
                                </img>
                            </div>
                        }
                    </div>
                    <p className='digit'>{isAd ? currentDate() : message.time}</p>
                </div>
                <p className='message-content'>
                    {messageContent}
                </p>
            </div>
            {
                modalIsOpen &&
                <Modal openOnMount>
                    <UserWindow userData={userProfileData} user={message.user} closeModal={closeModal} isAd={isAd} />
                </Modal>
            }
        </>
    )
}