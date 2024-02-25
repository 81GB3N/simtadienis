import { createContext, useContext, useState } from "react";

// Create the context, necessary for other components in App.jsx to acces the ability to toggle the menu.
const SubPageContext = createContext();
export const useSubPage = () => {
    const context = useContext(SubPageContext);
    if (!context) {
        throw new Error("useMenu must be used within a SubPageProvider");
    }
    return context;
};

export default function SubPageProvider({ children }) {
    const [menuActive, setMenuActive] = useState(false);
    const toggleMenu = () => {
        setMenuActive(prevState => !prevState);
    }

    const [loginActive, setLoginActive] = useState(false);
    const [signupActive, setSignupActive] = useState(false);

    const toggleLoginActive = () => {
        setLoginActive(prevState => !prevState);
    }
    const toggleSignupActive = () => {
        setSignupActive(prevState => !prevState);
    }

    const [userSubPageName, setUserSubPageName] = useState('home');
    const validUserSubPages = ['home', 'leaderboard', 'gallery'];
    const changeUserSubPage = (pageName) => {
        if (validUserSubPages.includes(pageName)) {
            setUserSubPageName(pageName);
        }
    }

    return (
        <SubPageContext.Provider value={{menuActive, toggleMenu, userSubPageName, changeUserSubPage, loginActive, toggleLoginActive, signupActive, toggleSignupActive }}>
            {children}
        </SubPageContext.Provider>
    );
}