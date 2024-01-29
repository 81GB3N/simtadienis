import { useState } from "react"
import { FormattedMessage } from 'react-intl';
import Login from "./Login";
import SignUp from "./SignUp";

export default function NoUser({ setSavedUser }) {
    const [activeComponent, setActiveComponent] = useState({});

    const handleClick = (component) => {
        setActiveComponent(component);
    }

    if (activeComponent === 'login')
        return (<Login setSavedUser={setSavedUser}/>)
    if (activeComponent === 'signup')
        return (<SignUp setSavedUser={setSavedUser}/>)
    return (
        <div className="user__buttons">
            <button className="user-button login-btn"
                onClick={() => handleClick('login')}>
                <FormattedMessage id='login' />
            </button>
            <button className="user-button signup-btn"
                onClick={() => handleClick('signup')}>
                <FormattedMessage id='signup' />
            </button>
        </div>
    )

}