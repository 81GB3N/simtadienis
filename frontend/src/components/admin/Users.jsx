// User Components
import UserLookup from "./UserLookup";
import UsersTable from "./UsersTable";
import EditTable from "./EditTable";

import { getAllUsers } from '../../utils/api'
import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminProvider";

import io from 'socket.io-client';
import CONSTANTS from "../constants";

const socket = io.connect(CONSTANTS.SOCKET_URL);

export default function Users() {
    console.log('----------RENDERING----------');
    const [allUsers, setAllUsers] = useState([]);
    const { refresh } = useAdmin();

    useEffect(() => {
        console.log('----------USERS USEEFFECT----------');
        getAllUsers().then(data => {
            setAllUsers(data.result);
            console.log(data.result);
        });
        socket.on('newUser', (newUser) => {
            console.log('new user: ', newUser);
            setAllUsers(prev => [...prev, newUser]);
        });
        return () => {
            socket.off('newUser');
        }
    }, [refresh]);


    return (
        <div className="page">
            <div className="header">
                <h2>Users</h2>
            </div>
            <div className='users'>
                <UserLookup users={allUsers} />
                <EditTable />
                <UsersTable users={allUsers} />
            </div>
        </div>
    )
}
