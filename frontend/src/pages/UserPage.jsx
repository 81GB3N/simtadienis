// Landing page components
import Header from "../components/Header"
import HeroTicket from "../components/HeroTicket"
import HamburgerMenu from "../components/HamburgerMenu"
import LeaderBoard from "../components/LeaderBoard"
// Utilities
import ErrorModal from "../components/ErrorModal"
// Context provider
import { useSubPage } from "../context/SubPageProvider"

import { useEffect, useState } from "react";

export default function UserPage() {
    const [showModal, setShowModal] = useState(false);
    const { userSubPageName } = useSubPage();

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
        <section className={`page-container ${userSubPageName}-page`}>
            {/* {userSubPageName === 'home' &&
                <>
                    <Header />
                    <HeroTicket />
                </>
            }
            {userSubPageName === 'leaderboard' && <LeaderBoard />} */}
            <div className="home">
                <Header />
                <HeroTicket />
            </div>
            <HamburgerMenu />
            <LeaderBoard />
        </section>
    )
}