// Landing page components
import Home from "../components/home/Home"
import Header from "../components/header/Header"
import HeroTicket from "../components/ticket/HeroTicket"
import HamburgerMenu from "../components/menu/HamburgerMenu"
import LeaderBoard from "../components/leaderboard/LeaderBoard"
import PageControls from "../components/page-control/PageControls"
// Utilities
import ErrorModal from "../components/error/ErrorModal"

import { useEffect, useState } from "react";

export default function UserPage() {
    const [showModal, setShowModal] = useState(false);
    const isMobile = () => {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    };

    useEffect(() => {
        setShowModal(!isMobile());
    }, [])

    if (showModal) {
        return (<ErrorModal
            status='Mobile Device Required!'
            errorMessage='This website was designed for mobile devices. 
      Please use a mobile device to proceed'
            dismissable={true}
            dismiss={() => setShowModal(false)}
        />)
    }

    return (
        <>
            <PageControls />
            <section className={`page-carousel`}>
                <Home />
                <HamburgerMenu />
                <LeaderBoard />
            </section>
        </>
    )
}