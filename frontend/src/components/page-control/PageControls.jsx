import { useSubPage } from '../../context/SubPageProvider';
import BackArrow from "../BackArrow";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';

import './pageControls.css';

export default function PageControls() {
    const { menuActive, toggleMenu, toggleLoginActive, toggleSignupActive, loginActive, signupActive, userSubPageName, changeUserSubPage } = useSubPage();

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

    return (
        <div className={`page__controls ${menuActive ? 'active' : ''} in-${userSubPageName}`}>
            <BackArrow handleArrowClick={handleArrowClick} />
            {userSubPageName === 'leaderboard' && <button className='go-home' onClick={() => changeUserSubPage('home')}><FontAwesomeIcon icon={faHouseChimney} /></button>}
            <button id="hamburger" onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
        </div>
    )
}