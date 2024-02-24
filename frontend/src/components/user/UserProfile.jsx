import { useSubPage } from "../../context/SubPageProvider";
import { getUserData } from "../../utils/api";
import { useState, useEffect } from "react";

export default function UserProfile({ userData, setUserExists }) {
    console.log("in user: ", userData);

    const { toggleMenu } = useSubPage();
    const [moneyAmount, setMoneyAmount] = useState(0);

    const logout = async () => {
        await localStorage.removeItem("user");
        setUserExists(false);
        toggleMenu();
    }

    const fetchMoney = async () => {
        try{
            const data = await getUserData(userData.name, userData.surname);
            console.log("in user: ", data);
            return data.result[0].money;
        }
        catch(err){
            console.log("Error while fetching money: ", err);
        }
        
    }

    useEffect(() => {
        fetchMoney()
            .then((money) => {
                console.log(money);
                setMoneyAmount(money)
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div className="user__profile">
            <p>Logged in as {userData?.name}, {userData?.surname}<span ></span></p>
            <button>Current amount: <span>{moneyAmount}</span></button>
            <p>Discount code for <a href="https://weborado.lt" target="_blank">weborado.lt</a></p>
            <button onClick={logout}>LOGOUT</button>
            <div ></div>
        </div>
    )
}