import { useState } from "react"
import { FormattedMessage } from 'react-intl';
import Login from "./Login";
import SignUp from "./SignUp";
import UserGreeting from "./UserGreeting";
export default function NoUser({ setUserExists, firstTime, endGreeting }) {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    if (login) {
        return <Login
            setUserExists={setUserExists}
            leave={() => setLogin(!login)}
        />
    }
    if (signup) {
        return <SignUp
            setUserExists={setUserExists}
            leave={() => setSignup(!signup)}
        />
    }

    // if(firstTime){
    //     return (
    //         <UserGreeting endGreeting={endGreeting}/>
    //     )
    // }

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