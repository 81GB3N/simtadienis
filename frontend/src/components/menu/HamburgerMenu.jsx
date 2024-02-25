import { useEffect, useRef, useState } from 'react';
import { useSubPage } from '../../context/SubPageProvider';
import UserProfile from '../user/UserProfile';
import NoUser from '../user/NoUser';
import hundredDollarsImg from '../../assets/images/heap-hundred-dollar-.webp';
import './menu.css'
export default function HamburgerMenu() {
    const { menuActive, userSubPageName, menuSlide } = useSubPage();

    const userRef = useRef(null);
    const [user, setUser] = useState(null);
    const [userExists, setUserExists] = useState(user !== null);

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
        <div id="menu" className={`${menuActive ? 'active' : ''} ${userSubPageName==='home' ? 'from-home' : ''} ${userSubPageName === 'leaderboard' ? 'from-leaderboard' : ''} ${menuSlide ? 'slide' : ''}`}>
            <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img img-one'></img>
            <div id='user' ref={userRef}>
                {
                    userExists ? (
                        <UserProfile userData={user} setUserExists={setUserExists} />
                    ) : (
                        <NoUser setUserExists={setUserExists} />
                    )
                }
            </div>
            <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img img-two'></img>
        </div>
    )
}