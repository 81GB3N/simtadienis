import { FormattedMessage } from 'react-intl';
import { useSubPage } from '../../context/SubPageProvider';
import Login from "./Login";
import SignUp from "./SignUp";
import PageNav from "../page-control/PageNav";
import './user.css';
export default function NoUser({ setUserExists }) {
    const { loginActive, signupActive, toggleLoginActive, toggleSignupActive } = useSubPage();

    if (loginActive) {
        return <Login
            setUserExists={setUserExists}
            leave={toggleLoginActive}
        />
    }
    if (signupActive) {
        return <SignUp
            setUserExists={setUserExists}
            leave={toggleSignupActive}
        />
    }

    return (
        <>
            <div className="user__buttons">
                <button className="user-button login-btn" onClick={toggleLoginActive}>
                    <FormattedMessage id='login' />
                </button>
                <button className="user-button signup-btn" onClick={toggleSignupActive}>
                    <FormattedMessage id='signup' />
                </button>
            </div>
            <PageNav />
        </>
    )

}