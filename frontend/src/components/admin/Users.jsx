export default function Users() {
    console.log('Users.jsx')
    return (
        <div className="page noflex" data-page="users">
            <div className="header">
                <div className="title">
                    <h2>Users</h2>
                </div>
            </div>
            <div className="grid">
                <div className="user-edit">
                    <div className="header">
                        <span className="icon">
                            <i className="icon ion-person"></i>
                        </span>
                        <span className="user-edit-name">$_USERNAME</span>
                        <a href="#" className="close"><i className="icon ion-close-round"></i></a>
                    </div>
                </div>
                <div className="users-table">
                    <div className="users-item header">
                        <div className="table-item noflex">
                            ID
                        </div>
                        <div className="table-item">
                            Email Address
                        </div>
                        <div className="table-item">
                            Username
                        </div>
                        <div className="table-item">
                            Nickname
                        </div>
                        <div className="table-item">
                            Active
                        </div>
                        <div className="table-item">
                            Premium
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}