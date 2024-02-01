import '../css/admin.css'
// React utilities
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useRef } from 'react';
// Components
import Dashboard from '../components/admin/Dashboard';
import Users from '../components/admin/Users';
// Icons
import { faUser, faGauge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admin() {
    const dialogRef = useRef(null);

    const handleLogout = (e) => {
        dialogRef.current.showModal();
        dialogRef.current.classList.add('active');
    }
    const cancelLogout = () => {
        console.log('cancel');
        dialogRef.current.close();
        dialogRef.current.classList.remove('active');
    }
    const confirmLogout = () => {

    }

    return (
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
    )
}