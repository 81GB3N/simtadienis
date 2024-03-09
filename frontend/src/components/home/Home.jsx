import Header from "../header/Header"
import HeroTicket from "../ticket/HeroTicket"
import { usePage } from "../../context/PageProvider"
import './home.css'
export default function Home() {
    const { userSubPageName } = usePage();
    return (
        <div className={`user-page home-page ${userSubPageName === 'home' ? 'active' : ''}`}>
            <Header />
            <HeroTicket />
        </div>
    )
}