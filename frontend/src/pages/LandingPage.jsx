// Landing page components
import HeroTicket from "../components/HeroTicket"
import Header from "../components/Header"
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
                <div className="content">
                </div>
            </div>
        </MenuProvider>
    )
}