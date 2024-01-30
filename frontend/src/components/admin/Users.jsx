// User Components
import UserLookup from "./UserLookup";
import UsersTable from "./UsersTable";
import EditTable from "./EditTable";

// Context
import UserProvider from "../../context/UserProvider";

import { getAllUsers } from '../../utils/api'

import { useState, useEffect } from "react";

export default function Users() {

    const [allUsers, setAllUsers] = useState(null);
    useEffect(() => {
        getAllUsers().then(data => {
            console.log('successfully retrieved all users')
            console.log(data.result);
            setAllUsers(data.result);
        });
    }, []);

    return (
        <div className="page">
            <div className="header">
                <h2>Users</h2>
            </div>
            <UserProvider>
            <div className='users'>
                <UserLookup />
                <EditTable />
                <UsersTable users={allUsers} />
            </div>
            </UserProvider>
        </div>
    )
}