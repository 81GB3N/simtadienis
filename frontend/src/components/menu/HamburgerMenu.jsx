import { useEffect, useRef, useState } from 'react';
import { useSubPage } from '../../context/SubPageProvider';
import UserProfile from '../user/UserProfile';
import NoUser from '../user/NoUser';
import hundredDollarsImg from '../../assets/images/heap-hundred-dollar-.webp';
import './menu.css'
export default function HamburgerMenu() {
    const { menuActive, userSubPageName } = useSubPage();

    const userRef = useRef(null);
    const [user, setUser] = useState(null);

    // function getCachedUser() {
    //     return new Promise((resolve, reject) => {
    //         const user = JSON.parse(localStorage.getItem('user'));
    //         console.log('Cached user: ', user);
    //         if (user) resolve(user);
    //         else reject('No Cached User Info');
    //     });
    // }

    // useEffect(() => {
    //     getCachedUser()
    //         .then((user) => {
    //             setUser(user)
    //             // setUserExists(true);
    //         })
    //         .catch((err) => {
    //             if (err !== 'No Cached User Info') {
    //                 console.log(err);
    //             }
    //             // setUserExists(false);
    //         });
    // }, [userExists])

    const getCachedUser = async () => {
        try {
            const cachedUser = JSON.parse(localStorage.getItem('user'));
            if (cachedUser) {
                setUser(cachedUser);
            }
        } catch (error) {
            if (error !== 'No Cached User Info') {
                console.error('Error while getting cached user:', error);
            }
        }
    };

    useEffect(() => {
        getCachedUser();
    }, []);

    const handleUserExists = async (exists) => {
        if(exists) {
            getCachedUser();
        } else{
            setUser(null);
        }
    }

    return (
        <div id="menu" className={`${menuActive ? 'active' : ''} from-${userSubPageName}`}>
            <div className='menu-img-container img-one'>
                <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img'></img>
            </div>
            <div id='user' className={user ? 'user-exists' : 'no-user'} ref={userRef}>
                {
                    user ? (
                        <UserProfile savedUser={user} removeUserExists={()=>handleUserExists(false)} />
                    ) : (
                        <NoUser onUserExists={handleUserExists} />
                    )
                }
            </div>
            <div className='menu-img-container img-two'>
                <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img'></img>
            </div>
        </div>
    )
}