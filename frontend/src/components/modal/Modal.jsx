import { useRef, useImperativeHandle, forwardRef } from "react"
import { createPortal } from "react-dom";
import './modal.css'

/**
 * Modal component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the modal.
 * @param {string} props.customClassNames - Additional custom class names for the modal.
 * @param {React.Ref} ref - The ref object for the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
const Modal = forwardRef(({ children, customClassNames, ...props }, ref) => {
    const dialogRef = useRef();

    useImperativeHandle(ref, () => ({
        open: () => {
            dialogRef.current.showModal();
        },
        close: () => {
            dialogRef.current.close();
        }
    }));

    return (
        createPortal(
            <dialog ref={dialogRef} className={`modal ${customClassNames ? customClassNames : ''}`} {...props}>
                {children}
            </dialog>,
            document.querySelector('#modal-root')
        )
    )
});

export default Modal;
