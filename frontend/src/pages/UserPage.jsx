// Landing page components
import Home from "../components/home/Home"
import HamburgerMenu from "../components/menu/HamburgerMenu"
import LeaderBoard from "../components/leaderboard/LeaderBoard"
import PageControls from "../components/page-control/PageControls"
import Gallery from "../components/gallery/Gallery"
// Utilities
import ErrorModal from "../components/error/ErrorModal"

import { usePage } from "../context/PageProvider"

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GlobalChat from "../components/chat/GlobalChat"

export default function UserPage() {
    const { userSubPageName } = usePage();

    const [showModal, setShowModal] = useState(false);
    const isMobile = () => {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    };

    useEffect(() => {
        setShowModal(!isMobile());
    }, [])

    if (showModal) {
        return createPortal(<ErrorModal
            status='Mobile Device Required!'
            errorMessage='This website was designed for mobile devices. 
      Please use a mobile device to proceed'
            dismissable={true}
            dismiss={() => setShowModal(false)}
        />, document.getElementById('modal-root'));
    }

    return (
        <>
            <PageControls />
            <section className={`page-carousel in-${userSubPageName}`}>
                <HamburgerMenu />   
                <Home />
                <LeaderBoard />
                <Gallery />
                <GlobalChat />
            </section>
        </>
    )
}