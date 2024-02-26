import { FormattedMessage } from 'react-intl';
import { useRef, useEffect, useState } from 'react';
import { useSubPage } from '../../context/SubPageProvider';
import './ticket.css';

export default function HeroTicket() {
    const ticketLoweref = useRef(null);
    const ticketUpperRef = useRef(null);
    const buttonRef = useRef(null);
    const { toggleMenu } = useSubPage();

    const handleClick = () => {
        ticketLoweref.current.classList.add('clicked');
        ticketUpperRef.current.classList.add('clicked');
        // buttonRef.current.classList.add('clicked');
        setTimeout(() => {
            toggleMenu();
        }, 600)
        ticketLoweref.current.addEventListener('animationend', () => {
            ticketLoweref.current.classList.remove('clicked');
            ticketUpperRef.current.classList.remove('clicked');
            // buttonRef.current.classList.remove('clicked');
        });
    }

    const calculateTimeLeft = () => {
        const now = new Date();
        // march - 2, 25th - 25
        const endDate = new Date(now.getFullYear(), 2, 25);
        const timeDifference = endDate.getTime() - now.getTime();
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        return `${String(hours).padStart(2, '0')}h, ${String(minutes).padStart(2, '0')}m`;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    // Update time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id='ticket'>
            <div id='ticket__upper' ref={ticketUpperRef}>
                <div className='ticket__info'>
                    <p className='ticket-text'>
                        <FormattedMessage id='ticket.text' />
                    </p>
                    <p className='ticket-date'>
                        <FormattedMessage id='left' />
                        {timeLeft}
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