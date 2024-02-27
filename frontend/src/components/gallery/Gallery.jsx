import { useSubPage } from '../../context/SubPageProvider';
import { useState } from 'react';
import GalleryImage from './GalleryImage';
import './gallery.css';

export default function Gallery() {
    const { userSubPageName } = useSubPage();
    const GALLERY_LENGTH = 5
    const [galleryImages, setGalleryImages] = useState(Array(GALLERY_LENGTH).fill());

    const uploadImage = (position, imgSrc) => {
        const newGalleryImages = [...galleryImages]
        newGalleryImages[position] = imgSrc
        setGalleryImages(newGalleryImages)
    }

    const submittedCount = galleryImages.filter(image => image).length;

    return (
        <div className={`gallery ${userSubPageName === 'gallery' ? 'active' : ''}`}>
            <h3 className='gallery-title'>Your submissions</h3>
            <p className='gallery-info'>Already submitted: <span className='money-cnt'>{submittedCount} / {GALLERY_LENGTH}</span></p>
            <li className='gallery__images'>
                {galleryImages.map((_, i) => <GalleryImage position={i} uploadImage={(imgSrc)=>uploadImage(i, imgSrc)} imgSrc={_}/>)}
            </li>
        </div>
    )
}