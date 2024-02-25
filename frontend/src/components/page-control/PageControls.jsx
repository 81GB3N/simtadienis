import { useSubPage } from '../../context/SubPageProvider';
import BackArrow from "../BackArrow";
import './pageControls.css';

export default function PageControls() {
    const { menuActive, toggleMenu, toggleLoginActive, toggleSignupActive, loginActive, signupActive } = useSubPage();

    let handleArrowClick;
    if (!loginActive && !signupActive) {
        handleArrowClick = () => toggleMenu();
        console.log('closing menu')
    }
    if (loginActive) {
        handleArrowClick = () => toggleLoginActive();
        console.log('closing login')
    }
    if (signupActive) {
        handleArrowClick = () => toggleSignupActive();
        console.log('closing signup')
    }

    return (
        <div className={`page__controls ${menuActive ? 'active' : ''}`}>
            <BackArrow handleArrowClick={handleArrowClick} />
            <button id="hamburger" onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
        </div>
    )
}