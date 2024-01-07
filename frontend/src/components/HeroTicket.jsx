import { FormattedMessage } from 'react-intl';

export default function HeroTicket() {
    return (
        <div id='ticket'>
            <div id='ticket__upper'>
                <div id='ticket-title'>
                    <p id='ticket-title-one'>
                        <FormattedMessage id='ticket.title.left.one' />
                        <FormattedMessage id='ticket.title.right.one' />
                    </p>
                    <p id='ticket-title-two'>
                        <FormattedMessage id='ticket.title.left.two' />
                        <FormattedMessage id='ticket.title.right.two' />
                    </p>
                </div>
            </div>
            <div id='ticket__lower'>
                <button id='ticket-button'></button>
            </div>
        </div>
    )
}