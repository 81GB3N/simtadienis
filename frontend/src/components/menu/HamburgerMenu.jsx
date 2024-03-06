import { useEffect, useRef, useState } from 'react';
import { usePage } from '../../context/PageProvider';
import UserProfile from '../user/UserProfile';
import NoUser from '../user/NoUser';
import hundredDollarsImg from '../../assets/images/heap-hundred-dollar-.webp';
import './menu.css'
export default function HamburgerMenu() {
    const { menuActive, userSubPageName, setUserId } = usePage();

    const userRef = useRef(null);
    const [user, setUser] = useState(null);

    const getCachedUser = async () => {
        try {
            const cachedUser = JSON.parse(localStorage.getItem('user'));
            if (cachedUser) {
                setUser(cachedUser);
                setUserId({name: cachedUser.name, surname: cachedUser.surname});
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