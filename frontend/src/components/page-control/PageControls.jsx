import { usePage } from '../../context/PageProvider';
import BackArrow from "../BackArrow";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { LiaHomeSolid } from "react-icons/lia";

import './pageControls.css';

export default function PageControls() {
    const { menuActive, toggleMenu, toggleLoginActive, toggleSignupActive, loginActive, signupActive, userSubPageName, changeUserSubPage } = usePage();

    let handleArrowClick;
    if (!loginActive && !signupActive) {
        handleArrowClick = () => toggleMenu();
    }
    if (loginActive) {
        handleArrowClick = () => toggleLoginActive();
    }
    if (signupActive) {
        handleArrowClick = () => toggleSignupActive();
    }

    const nonHomeValidPages = ['leaderboard', 'gallery', 'chat'];

    return (
        <div className={`page__controls ${menuActive ? 'active' : ''} in-${userSubPageName}`}>
            <BackArrow handleArrowClick={handleArrowClick} />
            {nonHomeValidPages.includes(userSubPageName) &&
                <button className='go-home' onClick={() => changeUserSubPage('home')}>
                    <LiaHomeSolid />
                </button>}
            <button id="hamburger" onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
        </div>
    )
}