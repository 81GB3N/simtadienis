import { useState } from "react"
import { FormattedMessage } from 'react-intl';
import Login from "./Login";
import SignUp from "./SignUp";
export default function NoUser({setRerender}) {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    if (login) {
        return <Login setRerender={setRerender}/>
    }
    if (signup) {
        return <SignUp setRerender={setRerender}/>
    }

    return (
        <div className="user__buttons">
            <button className="user-button login-btn" onClick={() => setLogin(!login)}>
                <FormattedMessage id='login' />
            </button>
            <button className="user-button signup-btn" onClick={() => setSignup(!signup)}>
                <FormattedMessage id='signup' />
            </button>
        </div>
    )

}