import { getUserData, sendUserData } from "../../utils/api";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// import Webcam from "react-webcam";
import WebcamModal from "../webcam/WebcamModal";
import EditProfile from "./EditProfile";
import unkownUserImg from "../../assets/images/unknown-user.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave, faCameraRotate, faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import './user.css';
import PageNav from "../page-control/PageNav";

export default function UserProfile({ savedUser, removeUserExists }) {
    const [webcamOpen, setWebcamOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [userData, setUserData] = useState({});

    const logout = async () => {
        await localStorage.removeItem("user");
        removeUserExists();
    }

    const fetchData = async () => {
        console.log('fetching data...')
        try {
            const data = await getUserData(savedUser.name, savedUser.surname);
            console.log("Data: ", data.result[0]);
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
    const closeWebcam = () => setWebcamOpen(false);

    const changeImg = (imgSrc) => {
        sendUserData({ imgSrc: imgSrc, name: userData.name, surname: userData.surname }, 'update-picture')
            .then(res => {
                console.log(res);
                fetchData().then(data => setUserData(data));
            })
            .catch(err => console.log(err));
    }

    const deleteImg = () => {
        sendUserData({ imgSrc: '', name: userData.name, surname: userData.surname }, 'update-picture')
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
                        <img className="profile-img" src={userData?.imgSrc || unkownUserImg} alt="user">
                        </img>
                    </div>
                    <div className="profile-img__controls">
                        <button className="profile-control edit-profile-btn">
                            <FontAwesomeIcon icon={faPenToSquare} onClick={openEdit}/>
                        </button>

                    </div>
                </div>
                <p className="user-name">{userData?.name}, {userData?.surname}</p>
                <div className="user__money">
                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="money-icon" />
                    <p className="money-cnt">{userData?.money}</p>
                </div>
                <button className="user-logout" onClick={logout}>LOGOUT</button>
                {editOpen && createPortal(<EditProfile closeEdit={closeEdit} deleteImg={deleteImg} openWebcam={openWebcam} imgSrc={userData.imgSrc}/>, document.getElementById('modal-root'))}  
                {webcamOpen && createPortal(<WebcamModal changeImg={changeImg} closeWebcam={closeWebcam} />, document.getElementById('modal-root'))}
                {/* <p>Discount code for <a href="https://weborado.lt" target="_blank">weborado.lt</a></p> */}
            </div>
            <PageNav userExists={true} />
        </>
    )
}