// import { }

export default function Form({ width, height}) {
    console.log(width, height)

    return (
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeeKmHieeZO_hWGT0upzwO98e0GnEDWYFliOVAGEB5S7632QQ/viewform?embedded=true"
            width={width}
            height={height}
            frameborder="0"
            marginheight="0"
            marginwidth="0">
            Įkeliama…
        </iframe>
    )
}