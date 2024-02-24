import { createContext, useContext, useState} from "react";

// Create the context, necessary for other components in App.jsx to acces the ability to toggle the menu.
const MenuContext = createContext();
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};

export default function MenuProvider({ children }) {
    const [menuActive, setMenuActive] = useState(false);
    const toggleMenu = () => {
        setMenuActive(!menuActive);
        // Screen behaviour on menu toggle
        window.scrollTo(0, 0);
        document.body.classList.toggle('no-scroll');
    };

    const [loginActive, setLoginActive] = useState(false);
    const [signupActive, setSignupActive] = useState(false);

    const toggleLoginActive = () => {
        setLoginActive(prevState => !prevState);
    }
    const toggleSignupActive = () => {
        setSignupActive(prevState => !prevState);
    }

    return (
        <MenuContext.Provider value={{ menuActive, toggleMenu, loginActive, toggleLoginActive, signupActive, toggleSignupActive }}>
            {children}
        </MenuContext.Provider>
    );
}