import VideoLike from "./old-VideoLike"

export default function VideoInstance({ video, videoVotes, voteManipulation, position, screenSize}) {
    return (
        <div className="video">
            <iframe width={screenSize} height={screenSize}
                src={video.url}
                title={video.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen">
            </iframe>
            <div className="video__bottom">
                <VideoLike id={position} videoVotes={videoVotes} voteManipulation={voteManipulation} />
                <h3 className={`video-title video-${position}`}>{video.name}</h3>
            </div>
        </div>
    )
}