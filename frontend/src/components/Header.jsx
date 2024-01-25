import { useState, useEffect, useRef } from 'react';
import LanguageSelector from './LanguageSelector';
import HamburgerMenu from './HamburgerMenu';
import moneyImg from '../assets/flying-money.png';
// Internationalization
import { FormattedMessage } from 'react-intl';

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const money = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // arbitrary value for when to hide the header (unit: vh)
            const threshold = 125;
            console.log(currentScrollY)
            setHidden(currentScrollY > threshold);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    if(money.current) {
        money.current.addEventListener('animationend', () => {
            console.log('animation ended');
        });
    }
    
    return (
        <header id='header' >
            <div id='header__selector' className={hidden ? 'hidden' : ''}>
                <LanguageSelector />
                <HamburgerMenu />
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
            <img className='header-money money-lower' ref={money} src={moneyImg} alt='flying money' />
        </header>
    )
}