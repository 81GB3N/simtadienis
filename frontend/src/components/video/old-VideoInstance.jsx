import CONSTANTS from "../constants"
import VideoLike from "./old-VideoLike"

export default function VideoInstance({ position, screenSize, videoVotes, votesInstances }) {
    return (
        <div className="video">
            <iframe width={screenSize} height={screenSize}
                src={CONSTANTS.VIDEO_LIST[position].url}
                title={CONSTANTS.VIDEO_LIST[position].name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen">
            </iframe>
            <div className="video__bottom">
                <VideoLike id={position} videoVotes={videoVotes} votesInstances={votesInstances} />
                <h3 className={`video-title video-${position}`}>{CONSTANTS.VIDEO_LIST[position].name}</h3>
            </div>
        </div>
    )
}