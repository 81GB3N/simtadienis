import UsersTable from "./UsersTable";

export default function Users() {

    const users = [
        { name: 'John', surname: 'Doe', money: 100 },
        { name: 'Jane', surname: 'Smith', money:69 },
      ];


    return (
        <div className="page" data-page="users">
            <div className="header">
                    <h2>Users</h2>
            </div>
            <UsersTable users={users} />
        </div>
    )
}