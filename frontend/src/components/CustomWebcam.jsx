import Webcam from "react-webcam";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const CustomWebcam = forwardRef(function CustomWebcam({ setImgSrc }, ref) {
    const containerRef = useRef(null);
    const webcamRef = useRef(null);

    useEffect(() => {
        const video = webcamRef.current.video;
        const container = containerRef.current;

        if (video && container) {
            video.width = container.clientWidth;
            video.height = container.clientHeight;
        }
    }, [])

    useImperativeHandle(ref, () => ({
        capture: () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc);
        },
    }));

    return (
        <div className="webcam-container" ref={containerRef}>
            <Webcam ref={webcamRef} audio={false} />
        </div>
    )
});

export default CustomWebcam;