import { useState } from "react"
import { FormattedMessage } from 'react-intl';
import Login from "./Login";
import SignUp from "./SignUp";

export default function NoUser() {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleClick = (component) => {
        setActiveComponent(component);
    }

    const resetMenu = () => {
        setActiveComponent(null);
    }

    if (activeComponent === 'login')
        return (<Login resetMenu={resetMenu}/>)
    if (activeComponent === 'signup')
        return (<SignUp resetMenu={resetMenu}/>)
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