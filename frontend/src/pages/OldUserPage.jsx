// Landing page components
import Home from "../components/home/Home"
import HamburgerMenu from "../components/menu/HamburgerMenu"
import LeaderBoard from "../components/leaderboard/LeaderBoard"
import PageControls from "../components/page-control/PageControls"
import Gallery from "../components/gallery/Gallery"
// Utilities
import ErrorModal from "../components/modal/ErrorModal"

import { usePage } from "../context/PageProvider"

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GlobalChat from "../components/chat/GlobalChat"

export default function UserPage() {
    const { currentUserPageName } = usePage();

    const [showModal, setShowModal] = useState(true);
    const isMobile = () => {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        console.log('agent: ', navigator.userAgent)
        console.log('isMobile: ', regex.test(navigator.userAgent));
        return regex.test(navigator.userAgent);
    };

    console.log('looking for modal');
    if (!isMobile()) {
        console.log(isMobile());
        return createPortal(<ErrorModal
            status='Mobile Device Required!'
            errorMessage='This website was designed for mobile devices. 
      Please use a mobile device to proceed'
            dismissable={true}
            dismiss={() => setShowModal(false)}
        />, document.getElementById('modal-root'));
    }
    console.log('UserPage mounted w/out modal');
    return (
        <>
            <PageControls />
            <section className={`page-carousel in-${currentUserPageName}`}>
                <HamburgerMenu />   
                <Home />
                <LeaderBoard />
                <Gallery />
                <GlobalChat />
            </section>
        </>
    )
}