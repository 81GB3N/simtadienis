import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import {handleDriveData} from "../../utils/api"

export default function GalleryImage({ position, imgSrc, uploadImage }) {
    // very hacky, figure out how to nest svgs in input or upload file with <button>
    const inputRef = useRef(null);
    const [image, setImage] = useState(imgSrc);
    const [confirm, setConfirm] = useState(false);

    const handleInputButtonClick = () => {
        if (inputRef.current) inputRef.current.click();
    }

    const handleFileChange = async (e) => {
        const fileBlob = URL.createObjectURL(e.target.files[0]);
        console.log(fileBlob);
        if (!fileBlob) return;
        setImage(fileBlob);
        const user = JSON.parse(localStorage.getItem("user"));
        //TESTING

        //SETTING IMAGE SEEMS TO WORK
        //const testingImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAyklEQVQYV2NkIBIwEqOLpH0rZ2fPf5y1cgkUiEIwMjJCwDAZNAABmkIQ3D+DUJjgEBBgYGBiKxqZDH0b/Gycnh6xkIB8QIQAANRgko5zF4uAAAAAElFTkSuQmCC"
        //handleDriveData(user.name, user.surname, position, 'set', testingImage)

        //DELETING IMAGE SEEMS TO WORK
        //handleDriveData(user.name, user.surname, position, 'delete')

        //GETTING IMAGE SEEMS TO WORK (added async for this)
        //const data = await handleDriveData(user.name, user.surname, position, 'get')
        //console.log(data);

        setConfirm(true);
    }

    return (
        <ul className='gallery-image'>
            {image && <img className="gallery-img-src" src={image} alt={`submission ${position}`} />}
            {confirm &&
                <button className="gallery-btn gallery-submit-btn" onClick={() => { uploadImage(image); setConfirm(false); }}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            }
            {!image &&
                <>
                    <button type='file' className="gallery-btn gallery-upload-btn" onClick={handleInputButtonClick}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </button>
                    <input ref={inputRef} type='file' className='hidden' accept='image/*' onChange={handleFileChange} />
                </>
            }
        </ul >
    )
}