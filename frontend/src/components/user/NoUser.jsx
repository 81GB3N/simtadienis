import { FormattedMessage } from 'react-intl';
import { usePage } from '../../context/PageProvider';
import Login from "./Login";
import SignUp from "./SignUp";
import PageNav from "../page-control/PageNav";
import './user.css';
export default function NoUser({ onUserExists }) {
    const { loginActive, signupActive, toggleLoginActive, toggleSignupActive } = usePage();

    if (loginActive) {
        return <Login 
            handleUserExists={onUserExists}
        />
    }
    if (signupActive) {
        return <SignUp />
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
            <PageNav userExists={false} />
        </>
    )

}