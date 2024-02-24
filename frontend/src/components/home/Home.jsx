import Header from "../header/Header"
import HeroTicket from "../ticket/HeroTicket"
import { useSubPage } from "../../context/SubPageProvider"

export default function Home() {
    const { userSubPageName } = useSubPage();
    return (
        <div className={`home-page ${userSubPageName === 'home' ? 'active' : ''}`}>
            <Header />
            <HeroTicket />
        </div>
    )
}