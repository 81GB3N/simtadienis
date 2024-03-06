import { usePage } from '../../context/PageProvider';
import { useRef } from 'react';
import GalleryImage from './GalleryImage';
import GalleryCount from './GalleryCount';
import './gallery.css';

export default function Gallery() {
    const { userSubPageName } = usePage();
    const galleryCntRef = useRef();
    const GALLERY_LENGTH = 5
    
    const increaseCnt = () => {
        galleryCntRef.current.increaseCnt();
    }
    const decreaseCnt = () => {
        galleryCntRef.current.decreaseCnt();
    }

    return (
        <div className={`user-page gallery ${userSubPageName === 'gallery' ? 'active' : ''}`}>
            <h3 className='gallery-title'>Your submissions</h3>
            <GalleryCount ref={galleryCntRef} totalCnt={GALLERY_LENGTH} />
            <li className='gallery__images'>
                {Array(GALLERY_LENGTH).fill().map((_, i) => <GalleryImage position={i} increaseCnt={increaseCnt} decreaseCnt={decreaseCnt} key={i}/>)}
            </li>
        </div>
    )
}