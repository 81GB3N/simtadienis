import { useEffect, useRef, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquarePlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LiaPlusSolid } from 'react-icons/lia';
import { handleDriveData } from "../../utils/api"

import { usePage } from '../../context/PageProvider';

export default function GalleryImage({ position }) {
    // very hacky, figure out how to nest svgs in input or upload file with <button>
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    // const [err, setErr] = useState(null);

    const { userId } = usePage();

    const fetchImage = async () => {
        const image = await handleDriveData(userId.name, userId.surname, position, 'get')
        if (!image.response) return '';
        return image;
    }

    useEffect(() => {
        if (!userId.name || !userId.surname) return;
        fetchImage().then(image => {setImage(image.response)});
    }, [userId])

    const handleInputButtonClick = () => {
        if (inputRef.current) inputRef.current.click();
    }

    const reader = new FileReader();
    reader.onload = () => {
        handleDriveData(userId.name, userId.surname, position, 'set', reader.result);
        setImage(reader.result);
    }

    const handleFileChange = async (e) => {
        console.log('submission: ', e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        
        // const fileBlob = URL.createObjectURL(e.target.files[0]);
        // console.log(fileBlob);
        // if (!fileBlob) return;
        // setImage(fileBlob);

        // handleDriveData(userId.name, userId.surname, position, 'set', fileBlob);

        //DELETING IMAGE SEEMS TO WORK
        //handleDriveData(userId.name, userId.surname, position, 'delete')

        //GETTING IMAGE SEEMS TO WORK (added async for this)
        //const data = await handleDriveData(userId.name, userId.surname, position, 'get')
        //console.log(data);
    }

    return (
        <ul className='gallery-image' onClick={handleInputButtonClick}>
            {image && <img className="gallery-img-src" src={image} alt={`submission ${position}`} />}
            {!image &&
                <>
                    <button type='file' className="gallery-btn gallery-upload-btn">
                        <LiaPlusSolid />
                    </button>
                    <input ref={inputRef} type='file' className='hidden' accept='image/*' onChange={handleFileChange} />
                </>
            }
        </ul >
    )
}