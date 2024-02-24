import { FormattedMessage } from 'react-intl';
import { useMenu } from '../../context/MenuProvider';
import Login from "./Login";
import SignUp from "./SignUp";

export default function NoUser({ setUserExists }) {
    const { loginActive, signupActive, toggleLoginActive, toggleSignupActive } = useMenu();

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
        <div className="user__buttons">
            <button className="user-button login-btn" onClick={toggleLoginActive}>
                <FormattedMessage id='login' />
            </button>
            <button className="user-button signup-btn" onClick={toggleSignupActive}>
                <FormattedMessage id='signup' />
            </button>
        </div>
    )

}