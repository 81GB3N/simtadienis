import '../css/admin.css'
// React utilities
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
// Components
import Dashboard from '../components/admin/Dashboard';
import Users from '../components/admin/Users';
// Icons
import { faUser, faGauge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admin() {
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
                    <button className='menu__icon logout'>
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
            <div className="dialog">
                <div className="dialog-block">
                    <h2>Are you sure you want to logout?</h2>
                    <div className="controls">
                        <a href="#" className="button">Logout</a>
                        <a data-dialog-action="cancel" href="#" className="button">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    )
}