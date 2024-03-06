import { usePage } from '../../context/PageProvider';
import GalleryImage from './GalleryImage';
import './gallery.css';

export default function Gallery() {
    const { userSubPageName } = usePage();
    const GALLERY_LENGTH = 5
    let submittedCount = 0;
    const mutateSubmittedCount = (count) => submittedCount += count;

    return (
        <div className={`user-page gallery ${userSubPageName === 'gallery' ? 'active' : ''}`}>
            <h3 className='gallery-title'>Your submissions</h3>
            <p className='gallery-info'>Already submitted: <span className='money-cnt'>{submittedCount} / {GALLERY_LENGTH}</span></p>
            <li className='gallery__images'>
                {Array(GALLERY_LENGTH).fill().map((_, i) => <GalleryImage position={i} mutateSubmittedCount={mutateSubmittedCount} key={i}/>)}
            </li>
        </div>
    )
}