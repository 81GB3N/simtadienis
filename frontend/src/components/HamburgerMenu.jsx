import { useMenu } from './MenuProvider';
import hundredDollars from '../images/heap-hundred-dollar-.webp';

export default function HamburgerMenu() {
    const { menuActive, toggleMenu } = useMenu();
    return (
        <>
            <button id="hamburger" className={menuActive ? 'active' : ''} onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
            <div id="menu" className={menuActive ? 'active' : ''}>
                <img src={hundredDollars} alt="hundred dollars" className='menu-img img-one'></img>
                <p>cia kazkada profile bus</p>
                <img src={hundredDollars} alt="hundred dollars" className='menu-img img-two'></img>
            </div>
        </>
    )
}