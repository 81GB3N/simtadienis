import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import moneyImg from '../../assets/images/flying-money.png';
// Internationalization
import { FormattedMessage } from 'react-intl';

import './header.css'

export default function Header() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // arbitrary value for when to hide the header (unit: vh)
            const threshold = 125;
            setHidden(currentScrollY > threshold);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
    return (
        <header id='header' >
            <div id='header__selector' className={hidden ? 'hidden' : ''}>
                <LanguageSelector />
            </div>
            <img className='header-money money-upper' src={moneyImg} alt='flying money' />
            <div id='header__title'>
                <span className='title-text title-one'>
                    <FormattedMessage id="header.title.one" />
                </span>
                <span className='title-text title-two'>
                    <FormattedMessage id="header.title.two" />
                </span>
                <span className='title-text title-three'>
                    <FormattedMessage id="header.title.three" />
                </span>
                <span className='title-text title-four'>
                    <FormattedMessage id="header.title.four" />
                </span>
            </div>
            <img className='header-money money-lower' src={moneyImg} alt='flying money' />
        </header>
    )
}