// User Components
import NewUserLookup from "./UserLookup";
import UsersTable from "./UsersTable";
import EditTable from "./EditTable";

import { getAllUsers } from '../../utils/api'
import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminProvider";


//SOCKET CODE
//--------------------------------------------------------
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:5000');
//--------------------------------------------------------

export default function Users() {
    const [allUsers, setAllUsers] = useState(null);
    const { refresh } = useAdmin();

    useEffect(() => {
        getAllUsers().then(data => {
            setAllUsers(data.result);
        });
    }, [refresh]);

    return (
        <div className="page">
            <div className="header">
                <h2>Users</h2>
            </div>
            <div className='users'>
                <NewUserLookup users={allUsers} />
                <EditTable />
                <UsersTable users={allUsers} />
            </div>
        </div>
    )
}
