import { createContext, useContext, useState} from "react";

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
    };

    return (
        <MenuContext.Provider value={{ menuActive, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
}