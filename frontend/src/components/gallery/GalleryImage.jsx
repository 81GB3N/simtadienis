import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function GalleryImage({ position, imgSrc, uploadImage }) {
    // very hacky, figure out how to nest svgs in input or upload file with <button>
    const inputRef = useRef(null);
    const [image, setImage] = useState(imgSrc);
    const [confirm, setConfirm] = useState(false);

    const handleInputButtonClick = () => {
        if (inputRef.current) inputRef.current.click();
    }

    const handleFileChange = (e) => {
        const fileBlob = URL.createObjectURL(e.target.files[0]);
        if (!fileBlob) return;
        setImage(fileBlob);
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