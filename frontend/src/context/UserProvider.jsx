import { createContext, useContext, useState} from "react";

// Create the context, necessary for other components in App.jsx to acces the ability to toggle the menu.
const UserContext = createContext();
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export default function UserProvider({ children }) {
    const [user, setUser] = useState({});
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}