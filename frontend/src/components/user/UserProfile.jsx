import { useSubPage } from "../../context/SubPageProvider";
import { getUserData } from "../../utils/api";
import { useState, useEffect, useRef } from "react";
// import Webcam from "react-webcam";
import CustomWebcam from "../CustomWebcam";
import unkownUserImg from "../../images/unknown-user.png";

export default function UserProfile({ userData, setUserExists }) {
    const { toggleMenu } = useSubPage();
    const [moneyAmount, setMoneyAmount] = useState(0);
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [open, setOpen] = useState(false);

    const logout = async () => {
        await localStorage.removeItem("user");
        setUserExists(false);
        toggleMenu();
    }

    const fetchMoney = async () => {
        try {
            const data = await getUserData(userData.name, userData.surname);
            console.log("in user: ", data);
            return data.result[0].money;
        }
        catch (err) {
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

    const openWebcam = () => {
        setOpen(true);
    }

    return (
        <div className="user__profile">
            <p>Logged in as {userData?.name}, {userData?.surname}<span ></span></p>
            <button>Current amount: <span>{moneyAmount}</span></button>
            <p>Discount code for <a href="https://weborado.lt" target="_blank">weborado.lt</a></p>
            <button onClick={logout}>LOGOUT</button>
            <div className="webcam-temp">
                {(open ?
                    <div className="webcam-modal">
                        <CustomWebcam ref={webcamRef} setImgSrc={setImgSrc}/>
                        <button onClick={() => {
                            webcamRef.current.capture();
                            setOpen(false);
                        }}>Capture</button>
                    </div>
                    :
                    <>
                        {(imgSrc ?
                            <img style={{ maxWidth: `10rem` }} src={imgSrc} alt="webcam capture" /> :
                            <img style={{ maxWidth: `10rem` }} src={unkownUserImg} alt="unknown user" />
                        )}
                        <button onClick={openWebcam}>
                            Upload {imgSrc ? "new" : "your"} photo
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}