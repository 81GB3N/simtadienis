import { usePage } from "../../context/PageProvider"

export default function Video(){
    const { currentUserPageName } = usePage();

    return (
        <div className={`user-page video-page ${currentUserPageName === 'video' ? 'active' : ''}`}>
            <h1>Video</h1>
        </div>
    )
}