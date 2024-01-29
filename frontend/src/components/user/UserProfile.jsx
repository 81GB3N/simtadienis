import { useMenu } from "../MenuProvider";
import { getUserData } from "../../utils/api";
import { useState, useEffect } from "react";

export default function UserProfile({ userData, setUserExists }) {
    console.log('rendering user profile');

    const { toggleMenu } = useMenu();
    const [moneyAmount, setMoneyAmount] = useState(0);

    const logout = async () => {
        console.log("logging out");
        await localStorage.removeItem("user");
        setUserExists(false);
        toggleMenu();
    }

    const fetchMoney = async () => {
        if(!userData) return null;
        const data = await getUserData(userData.name, userData.surname);
        return new Promise((resolve, reject) => {
            if (data.success) resolve(data.result[0].money);
            else reject(data.error);
        })
    }

    useEffect(() => {
        fetchMoney()
            .then((money) => setMoneyAmount(money))
            .catch((err) => console.log(err));
    }, [moneyAmount])

    return (
        <div className="user__profile">
            <p>Logged in as {userData?.name}, {userData?.surname}<span ></span></p>
            <button>Current amount: <span>{moneyAmount}</span></button>
            <button onClick={logout}>LOGOUT</button>
            <div ></div>
        </div>
    )
}