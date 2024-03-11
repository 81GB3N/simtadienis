import './form.css'

export default function Form({ width, height }) {
    return (
        <>
            <iframe
                title="Form"
                className="form-iframe"
                src="https://docs.google.com/forms/d/e/1FAIpQLSeeKmHieeZO_hWGT0upzwO98e0GnEDWYFliOVAGEB5S7632QQ/viewform?embedded=true"
                width={width}
                height={height}
                frameborder="0"
                marginheight="0"
                marginwidth="0">
                Įkeliama…
            </iframe>
            <div className='loading form-loading'></div>
        </>
    )
}