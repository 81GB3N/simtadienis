import { createContext, useContext, useState } from "react";

// Create the context, necessary for other components in App.jsx to acces the ability to toggle the menu.
const PageContext = createContext();
export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("useSubPage must be used within a PageProvider");
    }
    return context;
};

export default function PageProvider({ children }) {
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
    const validUserSubPages = ['home', 'leaderboard', 'gallery', 'chat'];
    const changeUserSubPage = (pageName) => {
        if (validUserSubPages.includes(pageName)) {
            setUserSubPageName(pageName);
        }
    }
    
    const [userId, setUserId] = useState({ name: '', surname: '' });


    return (
        <PageContext.Provider value={{menuActive, toggleMenu, userSubPageName, changeUserSubPage, loginActive, toggleLoginActive, signupActive, toggleSignupActive, userId, setUserId }}>
            {children}
        </PageContext.Provider>
    );
}