import { useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react"
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
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        dialogRef.current.showModal();
        setIsOpen(true);
    }

    const closeModal = () => {
        dialogRef.current.close();
        setIsOpen(false);
    }

    useImperativeHandle(ref, () => ({
        open: openModal,
        close: closeModal
    }));

    useEffect(()=>{
        openModal();
    }, [])

    return (
        createPortal(
            <dialog ref={dialogRef} className={`modal ${customClassNames ? customClassNames : ''} ${isOpen ? 'open' : 'closed'}`} {...props}>
                {children}
            </dialog>,
            document.querySelector('#modal-root')
        )
    )
});

export default Modal;
