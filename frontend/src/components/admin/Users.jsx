import UsersTable from "./UsersTable";
import EditTable from "./EditTable";
import UserProvider from "../../context/UserProvider";

export default function Users() {

    const users = [
        { name: 'John', surname: 'Doe', money: 100 },
        { name: 'Jane', surname: 'Smith', money: 69 },
    ];

    return (
        <div className="page">
            <div className="header">
                <h2>Users</h2>
            </div>
            <UserProvider>
            <div className='users'>
                <UsersTable users={users} />
                <EditTable />
            </div>
            </UserProvider>
        </div>
    )
}