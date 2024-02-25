import { FormattedMessage } from 'react-intl';
import { useSubPage } from "../../context/SubPageProvider";

export default function LeaderBordNav() {
    const { userSubPageName, changeUserSubPage, toggleMenu } = useSubPage();

    let button;
    if (userSubPageName === 'home') {
        button =
            <button className="leaderboard-button active" onClick={() => {
                changeUserSubPage('leaderboard');
                toggleMenu();
            }}>
                <FormattedMessage id='leaderboard' />
            </button>
    }
    if (userSubPageName === 'leaderboard') {
        button =
            <button className="leaderboard-button" onClick={() => {
                changeUserSubPage('home');
                toggleMenu();
            }}>
                <FormattedMessage id='landing' />
            </button>
    }

    return (
        <div className='leaderboard__navigation'>
            {button}
        </div>
    )
}