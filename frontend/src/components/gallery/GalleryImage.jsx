import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquarePlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LiaPlusSolid, LiaTrashSolid } from 'react-icons/lia';
import { handleDriveData } from "../../utils/api"

import { usePage } from '../../context/PageProvider';

export default function GalleryImage({ position, increaseCnt, decreaseCnt }) {
    // very hacky, figure out how to nest svgs in input or upload file with <button>
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { userId } = usePage();

    const fetchImage = async () => {
        const savedImage = await localStorage.getItem(`${userId.name}${userId.surname}${position}`)
        if(savedImage) return savedImage;
        const image = await handleDriveData(userId.name, userId.surname, position, 'get')
        if (!image.response) return '';
        return image;
    }

    useEffect(() => {
        if (!userId.name || !userId.surname) return;
        fetchImage().then(image => {
            setImage(image.response);
            if (image.response) {
                increaseCnt();
            }
        });
    }, [userId])

    const handleUpload = () => {
        if (inputRef.current) inputRef.current.click();
    }

    const reader = new FileReader();
    reader.onload = async () => {
        try{
            setImage(reader.result);
            await handleDriveData(userId.name, userId.surname, position, 'set', reader.result);
            await localStorage.setItem(`${userId.name}${userId.surname}${position}`, reader.result);
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    }

    const isImage = (file) => {
        return file.type.includes('image');
    }

    const handleFileChange = async (e) => {
        if(!isImage(e.target.files[0])) return;
        setLoading(true);
        await reader.readAsDataURL(e.target.files[0]);
        increaseCnt();
        setLoading(false);

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

    const handleDelete = async () => {
        setImage(null);
        await handleDriveData(userId.name, userId.surname, position, 'delete');
        decreaseCnt();
    }

    return (
        <ul className='gallery-image' onClick={handleUpload}>
            {image && <img className="gallery-img-src" src={image} alt={`submission ${position}`} />}
            {!image
                ?
                (<>
                    <button type='file' className="gallery-btn gallery-upload-btn">
                        <LiaPlusSolid />
                    </button>
                    <input ref={inputRef} type='file' className='hidden' accept='image/*' onChange={handleFileChange} />
                </>)
                :
                (
                    <button className='gallery-btn gallery-delete-btn' onClick={handleDelete}>
                        <LiaTrashSolid />
                    </button>
                )
            }
            {loading && createPortal(<div className='gallery-loading'>Loading...</div>, document.getElementById('modal-root'))}
        </ul >
    )
}