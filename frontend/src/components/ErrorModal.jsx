import { useRef } from "react"

export default function ErrorModal({status, errorMessage, dismissable}) {
    const frameRef = useRef(null);

    const dismissModal = () => {
        frameRef.current.classList.add('hide');
    }

    return (
        <div className="frame" ref={frameRef}>
            <div className="modal">
                <img id='modal__image'src="https://100dayscss.com/codepen/alert.png" alt='alert' width="44" height="38" />
                <span id="modal__title">{status}</span>
                <p id='modal__message'>{errorMessage}</p>
                {dismissable && <div id="modal__button" onClick={dismissModal}>Dismiss</div>}
            </div>
        </div>
    )

}

