import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import HamburgerMenu from './HamburgerMenu';
// Internationalization
import { FormattedMessage } from 'react-intl';

export default function Header() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // arbitrary value for when to hide the header (unit: vh)
            const threshold = 100;
            console.log(currentScrollY)
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
                <HamburgerMenu />
            </div>
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
            <div className='content'></div>
        </header>
    )
}