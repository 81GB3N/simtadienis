import '../css/admin.css'
// React utilities
import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
// Components
import Dashboard from '../components/admin/Dashboard';
import Users from '../components/admin/Users';
import AdminLogin from '../components/admin/AdminLogin';
// Icons
// import { faUser, faGauge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Context
import UserProvider from '../context/UserProvider';

export default function AdminPage() {
    const navigate = useNavigate();
    const [access, setAccess] = useState(false);
    const dialogRef = useRef(null);

    const handleLogout = (e) => {
        dialogRef.current.showModal();
        dialogRef.current.classList.add('active');
    }
    const cancelLogout = () => {
        dialogRef.current.close();
        dialogRef.current.classList.remove('active');
    }
    const confirmLogout = () => {
        localStorage.removeItem('user');
        dialogRef.current.close();
        dialogRef.current.classList.remove('active');
        navigate('/admin');
    }

    useEffect(() => {

    }, []);

    if (!localStorage.getItem('user')) {
        return <AdminLogin />
    }

    return (
        <UserProvider>
            <div className="container">
                <div className="drawer">
                    <div className="menu">
                        <NavLink to='dashboard' activeClassName='active' className='menu__icon'>
                            {/* <FontAwesomeIcon icon={faGauge} /> */}
                        </NavLink>
                        <NavLink to="users" activeClassName='active' className='menu__icon'>
                            {/* <FontAwesomeIcon icon={faUser} /> */}
                        </NavLink>
                        <button className='menu__icon logout' onClick={handleLogout}>
                            {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
                        </button>
                    </div>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="users" element={<Users />} />
                        <Route path="*" element={<Navigate to='/admin/dashboard' />} />
                    </Routes>
                </div>
                <div className="sidebar">
                </div>
                <dialog className="dialog" ref={dialogRef}>
                    <h2 className='dialog-title'>Are you sure you want to logout?</h2>
                    <div className="controls">
                        <button className="dialog-button logout" onClick={confirmLogout}>Logout</button>
                        <button className="dialog-button cancel" onClick={cancelLogout}>Cancel</button>
                    </div>
                </dialog>
            </div>
        </UserProvider>
    )
}