// Landing page components
import HeroTicket from "../components/HeroTicket"
import Header from "../components/Header"

export default function LandingPage() {
    return (
        <>
            <Header />
            <div className="landing">
                <HeroTicket />
                <div className="content">
                </div>
            </div>
        </>
    )
}