import { usePage } from "../../context/PageProvider"
import { useState, useEffect } from "react"
import VideoInstance from "./VideoInstance"
import './video.css'

import CONSTANTS from "../constants"

export default function Video() {
    const { currentUserPageName } = usePage();

    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth > 500 ? 500 : window.innerWidth);
            console.log(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`user-page side-page video-page ${currentUserPageName === 'video' ? 'active' : ''}`}>
            <div className="video__container">
                {Array(CONSTANTS.VIDEO_LIST.length).fill().map((_, i) => <VideoInstance key={i} position={i} screenSize={screenSize } />)}
            </div>
        </div>
    )
}