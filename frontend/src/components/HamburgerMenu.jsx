import { useRef } from 'react';
import { useMenu } from './MenuProvider';
import hundredDollars from '../images/heap-hundred-dollar-.webp';

import UserProfile from './user/UserProfile';
import NoUser from './user/NoUser';

export default function HamburgerMenu() {
    const { menuActive, toggleMenu } = useMenu();
    const userRef = useRef(null);
    const hasUser = localStorage.getItem('user') !== null;

    return (
        <>
            <button id="hamburger" className={menuActive ? 'active' : ''} onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
            <div id="menu" className={menuActive ? 'active' : ''}>
                <img src={hundredDollars} alt="hundred dollars" className='menu-img img-one'></img>
                <div id='user' ref={userRef}>
                {
                    hasUser ? (
                        <UserProfile />
                    ) : (
                        <NoUser />
                    )
                }
                </div>
                <img src={hundredDollars} alt="hundred dollars" className='menu-img img-two'></img>
            </div>
        </>
    )
}