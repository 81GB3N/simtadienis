// User Components
import NewUserLookup from "./UserLookup";
import UsersTable from "./UsersTable";
import EditTable from "./EditTable";

import { getAllUsers } from '../../utils/api'
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserProvider";


//SOCKET CODE
//--------------------------------------------------------
// import io from 'socket.io-client';
// const socket = io.connect('http://localhost:5000');
//--------------------------------------------------------

export default function Users() {
    const [allUsers, setAllUsers] = useState(null);
    const { refresh } = useUser();
    
    //SOCKET CODE
    //--------------------------------------------------------
    // socket.on("getusers", (res)=>{
    //     //MAKE THIS UPDATE THE BOARD
    //     console.log('users updtated');
    //     console.log(res);
    // });
    //DO THE SAME IN THE LEADERBOARD PAGE
    //-------------------------------------------------------

    // socket.on('userUpdate', (res) => {
    //     console.log('user data updated');
    //     console.log(res);
    // })

    useEffect(() => {
        getAllUsers().then(data => {
            console.log(data.result);
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
