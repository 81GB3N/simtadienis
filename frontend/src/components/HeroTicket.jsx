import { FormattedMessage } from 'react-intl';
import { useRef } from 'react';
import { useMenu } from '../context/MenuProvider';

export default function HeroTicket() {
    const ticketLoweref = useRef(null);
    const ticketUpperRef = useRef(null);
    const buttonRef = useRef(null);
    const { toggleMenu } = useMenu();

    const handleClick = () => {
        ticketLoweref.current.classList.add('clicked');
        ticketUpperRef.current.classList.add('clicked');
        buttonRef.current.classList.add('clicked');
        console.log(ticketLoweref.current);
        setTimeout(() => {
            toggleMenu();
        }, 600)
        ticketLoweref.current.addEventListener('animationend', () => {
            ticketLoweref.current.classList.remove('clicked');
            ticketUpperRef.current.classList.remove('clicked');
            buttonRef.current.classList.remove('clicked');
        });
    }
    return (
        <div id='ticket'>
            <div id='ticket__upper' ref={ticketUpperRef}>
                <div className='ticket__info'>
                    <p className='ticket-text'>
                        <FormattedMessage id='ticket.text' />
                    </p>
                    <p className='ticket-date'>
                        <FormattedMessage id='ticket.date' />
                    </p>
                </div>
            </div>
            <div id='ticket__lower' ref={ticketLoweref}>
                <button id='ticket-button' onClick={handleClick} ref={buttonRef}>
                    <FormattedMessage id='ticket.button' />
                </button>
            </div>
        </div>
    )
}