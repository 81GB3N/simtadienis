import CONSTANTS from "../constants"
import VideoLike from "./VideoLike"

export default function VideoInstance({ position, screenSize }) {
    return (
        <div className="video">
            <h3 className="video-title">{CONSTANTS.VIDEO_LIST[position].name}</h3>
            <iframe width={screenSize} height={screenSize}
                src={CONSTANTS.VIDEO_LIST[position].url}
                title={CONSTANTS.VIDEO_LIST[position].name}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen">
            </iframe>
            <VideoLike id={position}/>
        </div>
    )
}