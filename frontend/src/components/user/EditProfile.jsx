import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRotate, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditProfile({ closeEdit, openWebcam, imgSrc, deleteImg }) {

    return (
        <div className="webcam-container" onClick={closeEdit}>
            <div className="webcam">
                <img src={imgSrc} alt='Current User Profile'></img>
                <div className="webcam__controls">
                    <button className="img-control new-profile-btn">
                        <FontAwesomeIcon icon={faCameraRotate} onClick={() => { closeEdit(); openWebcam(); }} />
                    </button>
                    <button className="img-control delete-profile-btn">
                        <FontAwesomeIcon icon={faTrashCan} onClick={deleteImg} />
                    </button>
                </div>
            </div>
        </div>
    )
}