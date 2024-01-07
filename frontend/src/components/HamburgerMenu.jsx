import { useState } from 'react';
import hundredDollars from '../images/heap-hundred-dollar-.webp';

export default function HamburgerMenu() {
    const [active, setActive] = useState(false);
    
    const handleClick = () => {
        setActive(!active);
        document.getElementById('hamburger').classList.toggle('active');
        document.getElementById('menu').classList.toggle('active');
    }

    return (
        <>
            <button id="hamburger" onClick={handleClick}>
                <div id='bar'></div>
            </button>
            <div id="menu">
                <img src={hundredDollars} alt="hundred dollars" class='menu-img img-one'></img>
                <p>cia kazkada profile bus</p>
                <img src={hundredDollars} alt="hundred dollars" class='menu-img img-two'></img>
            </div>
        </>
    )
}