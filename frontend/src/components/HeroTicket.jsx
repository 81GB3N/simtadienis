import { FormattedMessage } from 'react-intl';
import { useRef } from 'react';
import { useMenu } from './MenuProvider';

export default function HeroTicket() {
    const ticketRef = useRef(null);
    const { toggleMenu } = useMenu();

    const handleClick = () => {
        setTimeout(() => {
            toggleMenu();
        }, 2000);
        const ticket = ticketRef.current;
        if (ticket) {
            ticket.classList.add('clicked');
            ticket.addEventListener('animationend', () => {
                ticket.classList.remove('clicked');
            })
        }
    }
    return (
        <div id='ticket'>
            <div id='ticket__upper'>
                <p className='ticket-title' id='ticket-title-one'>
                    <p>
                        <FormattedMessage id='ticket.title.left.one' />
                    </p>
                    <p>
                        <FormattedMessage id='ticket.title.left.two' />
                    </p>
                </p>
                <p className='ticket-title' id='ticket-title-two'>
                    <p>
                        <FormattedMessage id='ticket.title.right.one' />
                    </p>
                    <p>
                        <FormattedMessage id='ticket.title.right.two' />
                    </p>
                </p>
            </div>
            <div id='ticket__lower' ref={ticketRef}>
                <button id='ticket-button' onClick={handleClick}>
                    <FormattedMessage id='ticket.button' />
                </button>
            </div>
        </div>
    )
}