import { getUserData, sendUserData } from "../../utils/api";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// import Webcam from "react-webcam";
import WebcamModal from "../webcam/WebcamModal";
import EditProfile from "./EditProfile";
import unkownUserImg from "../../assets/images/unknown-user.png";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMoneyBill1Wave, faPenToSquare, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// a collection of icons from Icons8 Line Awesome
import { LiaEdit, LiaMoneyBillSolid } from "react-icons/lia";

import { IoIosLogOut } from "react-icons/io";

import './user.css';
import PageNav from "../page-control/PageNav";

export default function UserProfile({ savedUser, removeUserExists }) {
    const [webcamOpen, setWebcamOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [moneyEffectActive, setMoneyEffectActive] = useState(false);

    const logout = async () => {
        await localStorage.removeItem("user");
        removeUserExists();
    }

    const fetchData = async () => {
        console.log('fetching data...')
        try {
            const data = await getUserData({ name: savedUser.name, surname: savedUser.surname });
            console.log('data: ', data);
            return data.result[0];
        }
        catch (err) {
            console.log("Error while fetching money: ", err);
        }
    }

    useEffect(() => {
        fetchData().then(data => setUserData(data));
    }, [])

    const openEdit = () => setEditOpen(true);
    const closeEdit = () => setEditOpen(false);

    const openWebcam = () => setWebcamOpen(true);
    const closeWebcam = () => {
        // navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        //     stream.getVideoTracks().forEach(track => {
        //         console.log('stopping track: ', track);
        //         track.stop();
        //         console.log('stopped')
        //     })
        // });
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            stream.getVideoTracks().forEach(track => track.stop())
        });
        setWebcamOpen(false);
        console.log('webcam closed');
    };

    const changeImg = (imgSrc) => {
        sendUserData({ image: imgSrc, name: userData.name, surname: userData.surname }, 'update-picture')
            .then(res => {
                console.log('change image res: ', res);
                setUserData(prev => ({ ...prev, image: imgSrc }));
            })
            .catch(err => console.log(err));

    }

    const deleteImg = () => {
        sendUserData({ image: '', name: userData.name, surname: userData.surname }, 'update-picture')
            .then(res => {
                console.log(res);
                fetchData().then(data => setUserData(data));
            })
            .catch(err => console.log(err));
    }


    return (
        <>
            <div className="user__profile">
                <div className="profile__img">
                    <div className="profile-img-container">
                        <img className="profile-img" src={userData?.image || unkownUserImg} alt="user">
                        </img>
                    </div>
                    <div className="profile-img__controls">
                        <button className="profile-control edit-profile-btn">
                            <LiaEdit onClick={openEdit} />
                        </button>

                    </div>
                </div>
                <p className="user-name">{userData?.name}, {userData?.surname}</p>
                <div className="user__money">
                    <LiaMoneyBillSolid className={`user-money-icon ${moneyEffectActive ? 'active' : ''}`} onClick={() => setMoneyEffectActive(prev => !prev)} />
                    <p className="money-cnt">{userData?.money}</p>
                </div>
                {editOpen && createPortal(<EditProfile closeEdit={closeEdit} deleteImg={deleteImg} openWebcam={openWebcam} imgSrc={userData.image || unkownUserImg} />, document.getElementById('modal-root'))}
                {webcamOpen && createPortal(<WebcamModal changeImg={changeImg} closeWebcam={closeWebcam} />, document.getElementById('modal-root'))}
                {/* <p>Discount code for <a href="https://weborado.lt" target="_blank">weborado.lt</a></p> */}
            </div>
            <div className="user__extra-btns">
                <PageNav userExists={true} />
                <button className="profile-control user-logout-btn" onClick={logout}>
                    <IoIosLogOut />
                </button>
            </div>
        </>
    )
}