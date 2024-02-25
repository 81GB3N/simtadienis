import { FormattedMessage } from 'react-intl';
import { useSubPage } from "../../context/SubPageProvider";

export default function LeaderBordNav() {
    const { userSubPageName, changeUserSubPage, toggleMenu } = useSubPage();

    // button for navigating to and from the home page
    let homeBtn;
    if (userSubPageName !== 'home') {
        homeBtn =
            <button className="nav-btn home-button" onClick={() => {
                changeUserSubPage('home');
                toggleMenu();
            }}>
                <FormattedMessage id='landing' />
            </button>
    } else {
        homeBtn = null;
    }

    // button for navigating to and from the leaderboard page
    let leaderBoardBtn;
    if (userSubPageName !== 'leaderboard') {
        leaderBoardBtn =
            <button className="nav-btn leaderboard-button" onClick={() => {
                changeUserSubPage('leaderboard');
                toggleMenu();
            }}>
                <FormattedMessage id='leaderboard' />
            </button>
    } else {
        leaderBoardBtn = null;
    }

    // button for navigating to and from the gallery page
    let galleryBtn;
    if (userSubPageName !== 'gallery') {
        galleryBtn =
            <button className="nav-btn gallery-button" onClick={() => {
                changeUserSubPage('gallery');
                toggleMenu();
            }}>
                <FormattedMessage id='gallery' />
            </button>
    } else {
        galleryBtn = null;
    }


    return (
        <div className='page__navigation'>
            {homeBtn}
            {leaderBoardBtn}
            {galleryBtn}
        </div>
    )
}