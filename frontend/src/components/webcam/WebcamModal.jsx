import { useRef, useState } from "react"
import CustomWebcam from "./CustomWebcam"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCameraRetro, faXmark } from "@fortawesome/free-solid-svg-icons";

import { LiaCameraSolid, LiaTimesSolid } from "react-icons/lia";

import './webcam.css';

export default function WebcamModal({ changeImg, closeWebcam }) {
    const webcamRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);

    const takeScreenshot = () => {
        const imgSrc = webcamRef.current.capture();
        changeImg(imgSrc);
        closeWebcam();
    }

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        console.log("Let's get this party started")
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                setCameraActive(true);
            })
            .catch(error => {
                if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                    console.log('Camera permission denied by the user.');
                } else {
                    console.error('Error accessing camera:', error);
                }
            });
    }

    return (
        <div className="webcam-container">
            <div className="webcam">
                <CustomWebcam ref={webcamRef} enabled={cameraActive}/>
                <div className="webcam__controls">
                    <button className="webcam-control take-screenshot-btn" onClick={takeScreenshot}>
                        <LiaCameraSolid />
                    </button>
                    <button className="webcam-control close-webcam-btn" onClick={closeWebcam}>
                        <LiaTimesSolid />
                    </button>
                </div>
            </div>
        </div>
    )
}