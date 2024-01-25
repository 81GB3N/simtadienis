import { useRef } from 'react';
import { useMenu } from './MenuProvider';
import UserProfile from './UserProfile';
import LoginSignup from './LoginSignup';
import hundredDollars from '../images/heap-hundred-dollar-.webp';

export default function HamburgerMenu() {
    const { menuActive, toggleMenu } = useMenu();
    const userRef = useRef(null);
    const savedUserExists = localStorage.getItem('user') ? true : false;

    return (
        <>
            <button id="hamburger" className={menuActive ? 'active' : ''} onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
            <div id="menu" className={menuActive ? 'active' : ''}>
                <img src={hundredDollars} alt="hundred dollars" className='menu-img img-one'></img>
                <div id='user' ref={userRef}>
                    {
                        savedUserExists ? <UserProfile /> : < LoginSignup />
                    }
                </div>
                <img src={hundredDollars} alt="hundred dollars" className='menu-img img-two'></img>
            </div>
        </>
    )
}