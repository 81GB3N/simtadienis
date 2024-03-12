import '../css/admin.css'
// React utilities
import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
// Components
import Dashboard from '../components/admin/Dashboard';
import Users from '../components/admin/Users';
import AdminLogin from '../components/admin/AdminLogin';
// Icons
import { faUser, faGauge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Context
import AdminProvider from '../context/AdminProvider';
import { checkIfAdmin } from '../utils/api'

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
        localStorage.removeItem('admin');
        dialogRef.current.close();
        dialogRef.current.classList.remove('active');
        navigate('/admin');
    }


    const validateCache = useCallback(async function() {
        try {
            const savedCache = localStorage.getItem('admin');
            if (!savedCache) {
                return { isAdmin: false, response: 'No admin cache' };
            }
            const admin = JSON.parse(savedCache);
            if (typeof admin !== 'object' || !admin.name || !admin.surname || !admin.token) {
                return { isAdmin: false, response: 'Invalid admin cache' };
            }
            const isAdmin = await checkIfAdmin(admin.name, admin.surname);
            if (!isAdmin) {
                return { isAdmin: false, response: 'Not an admin' };
            }
            return true;
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        validateCache().then((res) => {
            if (res === true) {
                setAccess(true);
            }
            else {
                console.error(res);
                setAccess(false);
                localStorage.removeItem('admin');
                navigate('/admin');
            }
        });
    }, [navigate, validateCache]);

    if (!access) {
        return <AdminLogin />
    }

    return (
        <AdminProvider>
            <div className="container">
                <div className="drawer">
                    <div className="menu">
                        <NavLink to='dashboard' activeClassName='active' className='menu__icon'>
                            <FontAwesomeIcon icon={faGauge} />
                        </NavLink>
                        <NavLink to="users" activeClassName='active' className='menu__icon'>
                            <FontAwesomeIcon icon={faUser} />
                        </NavLink>
                        <button className='menu__icon logout' onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
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
        </AdminProvider>
    )
}