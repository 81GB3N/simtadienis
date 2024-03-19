import { getUserData } from "../../utils/api";
import { useEffect, useState, useCallback } from "react";

import unkownUserImg from "../../assets/images/unkown-user-new.png";
import { LiaMoneyBillSolid } from "react-icons/lia";


export default function UserWindow({ user, closeModal }) {
    const [userProfileData, setUserProfileData] = useState({});
    const [moneyEffectActive, setMoneyEffectActive] = useState(false);

    const fetchUserData = useCallback(async () => {
        try {
            const userId = user.split(' ');
            const name = userId[0];
            const surname = userId[1];
            const data = await getUserData({ name, surname });
            return data.response[0];
        } catch (err) {
            console.error(err);
        }
    }, [user]);

    useEffect(() => {
        fetchUserData().then(response => { setUserProfileData(response); console.log(response) });
    }, [fetchUserData]);

    const stopPropogation = (e) => {
        e.stopPropagation();
    }



    return (
        <div className="user__window" onClick={closeModal}>
            <div className="window__profile" onClick={(e)=>stopPropogation(e)}>
                <div className="profile-img-container">
                    <img className="profile-img" src={userProfileData?.image || unkownUserImg} alt="user">
                    </img>
                </div>
                <p className="user-name">{userProfileData?.name} {userProfileData?.surname}</p>
                <div className="user__money">
                    <LiaMoneyBillSolid className={`user-money-icon ${moneyEffectActive ? 'active' : ''}`} onClick={() => setMoneyEffectActive(prev => !prev)} />
                    <p className="digit">{userProfileData?.money || 0}</p>
                </div>
            </div>
        </div>
    )
}