const isLocalhost = window.location.hostname === 'localhost';

const CONSTANTS = {
    GALLERY_CNT: 2,
    VIDEO_LIST: [
        {
            url: 'https://www.youtube.com/embed/vPY1s-wp1sc?si=0SbToIp1vPdmUKLc',
            name: 'Video 1'
        },
        {
            url: 'https://www.youtube.com/embed/vPY1s-wp1sc?si=0SbToIp1vPdmUKLc',
            name: 'Video 2'
        },
        {
            url: 'https://www.youtube.com/embed/vPY1s-wp1sc?si=0SbToIp1vPdmUKLc',
            name: 'Video 3'
        }
    ],
    SOCKET_URL : isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt',
    LEADERBOARD_ENTRY_HEIGHT: 120 // in pixels
}

export default CONSTANTS;