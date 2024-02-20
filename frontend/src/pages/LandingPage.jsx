// Landing page components
import Header from "../components/Header"
import HeroTicket from "../components/HeroTicket"
import LeaderBoard from "../components/LeaderBoard"
// Utilities
import ErrorModal from "../components/ErrorModal"
// Context provider
import MenuProvider from '../context/MenuProvider';

export default function LandingPage() {
    const isMobile = () => {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    };

    return (
        <MenuProvider>
            {!isMobile() ? <ErrorModal
                status='Desktop Detected!'
                errorMessage='This website was designed for mobile devices. 
      Proceed at your discretion'
                dismissable={true} /> : null}
            <Header />
            <div className="landing">
                <HeroTicket />
                <LeaderBoard />
            </div>
        </MenuProvider>
    )
}