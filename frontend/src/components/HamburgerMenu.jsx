import { useEffect, useRef, useState } from 'react';
import { useMenu } from '../context/MenuProvider';
import UserProfile from './user/UserProfile';
import NoUser from './user/NoUser';
import hundredDollarsImg from '../images/heap-hundred-dollar-.webp';

export default function HamburgerMenu() {
    const { menuActive, toggleMenu } = useMenu();
    const userRef = useRef(null);
    const [user, setUser] = useState(null);
    const [userExists, setUserExists] = useState(user !== null);

    const [firstTime, setFirstTime] = useState(localStorage.getItem('firstTime') === null);

    const endGreeting = () => {
        setFirstTime(false);
        localStorage.setItem('firstTime', 'false');
    }

    function getCachedUser() {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) resolve(user);
            else reject('No Cached User Info');
        });
    }

    useEffect(() => {
        getCachedUser()
            .then((user) => {
                setUser(user);
                setUserExists(true);
            })
            .catch((err) => {
                if (err !== 'No Cached User Info') {
                    console.log(err);
                }
                setUserExists(false);
            });
    }, [userExists])


    return (
        <>
            <button id="hamburger" className={`${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
                <div id='bar'></div>
            </button>
            <div id="menu" className={menuActive ? 'active' : ''}>
                <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img img-one'></img>
                <div id='user' ref={userRef}>
                    {
                        userExists ? (
                            <UserProfile userData={user} setUserExists={setUserExists} />
                        ) : (
                            <NoUser setUserExists={setUserExists} firstTime={firstTime} endGreeting={endGreeting} />
                        )

                    }
                </div>
                <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img img-two'></img>
            </div>
        </>
    )
}