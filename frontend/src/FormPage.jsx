import LanguageSelector from "./components/header/LanguageSelector"
import Form from "./components/Form"

import { FormattedMessage } from "react-intl"

import { useState, useEffect } from "react";

// import moneyImg from "../assets/images/flying-money.png"
import "./css/app.css"
import "./components/header/header.css"
import "./components/ticket/ticket.css"

export default function FormPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    /**
    * Calculates the time left until a specific date.
    * @returns {string} The formatted time left.
    */
    const calculateTimeLeft = () => {
        const now = new Date();
        // march - 2, 25th - 25
        const endDate = new Date(now.getFullYear(), 2, 22);
        const timeDifference = endDate.getTime() - now.getTime();
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        return `${String(hours).padStart(2, '0')}h, ${String(minutes).padStart(2, '0')}m`;
    };

    /**
     * State for storing the time left.
     */
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    /**
     * Updates the time left every minute.
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {formOpen ? <Form width={screenWidth} height={screenHeight} /> :
                <>
                    <header id='header' >
                        <div id='header__selector'>
                            <LanguageSelector />
                        </div>
                        {/* <img className='header-money money-upper' src={moneyImg} alt='flying money' /> */}
                        <div id='header__title'>
                            <span className='title-text title-one'>
                                <FormattedMessage id="form.title.one" />
                            </span>
                            <span className='title-text title-two'>
                                <FormattedMessage id="form.title.two" />
                            </span>
                            <span className='title-text title-three'>
                                <FormattedMessage id="form.title.three" />
                            </span>
                            <span className='title-text title-four'>
                                <FormattedMessage id="form.title.four" />
                            </span>
                        </div>
                        {/* <img className='header-money money-lower' src={moneyImg} alt='flying money' /> */}
                    </header>
                    <div id='ticket'>
                        <div id='ticket__upper' >
                            <div className='ticket__info'>
                                <p className='ticket-text'>
                                    <FormattedMessage id='form.ticket.text' />
                                </p>
                                <p className='ticket-date'>
                                    {/* <FormattedMessage id='left' /> */}
                                    {timeLeft}
                                </p>
                            </div>
                        </div>
                        <div id='ticket__lower' ref={null}>
                            <button id='ticket-button' onClick={()=>setFormOpen(true)}>
                                <FormattedMessage id='form.ticket.button' />
                            </button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}