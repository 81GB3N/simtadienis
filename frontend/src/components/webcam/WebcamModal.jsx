import { useRef } from "react"
import CustomWebcam from "./CustomWebcam"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faXmark } from "@fortawesome/free-solid-svg-icons";

import './webcam.css';

export default function WebcamModal({ changeImg, closeWebcam }) {
    const webcamRef = useRef(null);

    const takeScreenshot = () => {
        const imgSrc = webcamRef.current.capture();
        changeImg(imgSrc);
        closeWebcam();
    }

    return (
        <div className="webcam-container">
            <div className="webcam">
                <CustomWebcam ref={webcamRef} />
                <div className="webcam__controls">
                    <button className="webcam-control take-screenshot-btn" onClick={takeScreenshot}>
                        <FontAwesomeIcon icon={faCameraRetro} />
                    </button>
                    <button className="webcam-control close-webcam-btn" onClick={closeWebcam}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>
        </div>
    )
}