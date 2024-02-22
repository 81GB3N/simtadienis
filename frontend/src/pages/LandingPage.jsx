// Landing page components
import Header from "../components/Header"
import HeroTicket from "../components/HeroTicket"
import LeaderBoard from "../components/LeaderBoard"
// Utilities
import ErrorModal from "../components/ErrorModal"
// Context provider
import MenuProvider from '../context/MenuProvider';
import { useEffect, useState } from "react";

export default function LandingPage() {

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
        <MenuProvider>
            <Header />
            <div className="landing">
                <HeroTicket />
                <LeaderBoard />
            </div>
        </MenuProvider>
    )
}