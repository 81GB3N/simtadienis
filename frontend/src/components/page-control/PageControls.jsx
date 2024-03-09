import BackArrow from "../BackArrow";
import { LiaHomeSolid } from "react-icons/lia";

import { usePage } from '../../context/PageProvider';
import { useMenu } from '../../context/MenuProvider';
import { useUser } from '../../context/UserProvider';

import './pageControls.css';

/**
 * Renders the page controls component.
 * @returns {JSX.Element} The rendered page controls component.
 */
export default function PageControls() {
    const { menuActive, closeMenu, toggleMenu } = useMenu();
    const {closeLogin, closeSignup, loginActive, signupActive } = useUser();
    const { currentUserPageName, validUserPageNames, changeUserPage } = usePage();

    let handleArrowClick;
    if (!loginActive && !signupActive) {
        handleArrowClick = () => closeMenu();
    }
    else if (loginActive) {
        handleArrowClick = () => closeLogin();
    }
    else if (signupActive) {
        handleArrowClick = () => closeSignup();
    }

    const nonHomeValidPages = validUserPageNames.filter(page => page !== 'home');

    return (
        <div className={`page__controls ${menuActive ? 'active' : ''} in-${currentUserPageName}`}>
            <BackArrow handleArrowClick={handleArrowClick} />
            {nonHomeValidPages.includes(currentUserPageName) &&
                <button className='go-home' onClick={() => changeUserPage('home')}>
                    <LiaHomeSolid />
                </button>}
            <button id="hamburger" onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
        </div>
    )
}