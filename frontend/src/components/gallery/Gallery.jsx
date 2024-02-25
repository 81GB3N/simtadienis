import { useSubPage } from '../../context/SubPageProvider';

import './gallery.css';

export default function Gallery() {
    const { userSubPageName } = useSubPage();
    
    return (
        <div className={`gallery ${userSubPageName==='gallery' ? 'active' : ''}`}>
            <h1>Gallery</h1>
        </div>
    )
}