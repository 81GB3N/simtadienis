import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faServer } from "@fortawesome/free-solid-svg-icons"
// JSUT A TEST
export default function Dashboard() {
    return (
        <div className="page" data-page="dashboard">
            <div className="header">
                <h2>Dashboard</h2>
            </div>
            <div className="grid">
                <div className="card">
                    <div className="head">
                        <span className="icon">
                            <FontAwesomeIcon icon={faServer} />
                        </span>
                        <span className="stat">
                            Server Status
                        </span>
                        <div className="status">
                        </div>
                    </div>
                    <div className="body">
                        <h2>Server is currently $_status</h2>
                        <p>
                            The server is running normally and no issues have recently been detected. If you notice an outage, please report it to the administrator.
                        </p>
                    </div>
                    <div className="footer">
                        <div className="user">
                            <div className="user-icon">
                            </div>
                            <span className="username">
                                Administrator
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card__head">
                        <span className="icon">
                            <FontAwesomeIcon icon={faServer} />
                        </span>
                        <span className="stat">
                            CSGO Status
                        </span>
                        <div className="status">
                        </div>
                    </div>
                    <div className="body">
                        <h2>Cheat is currently $_status</h2>
                        <p>
                            The server is running normally and no issues have recently been detected. If you notice an outage, please report it to the administrator.
                        </p>
                    </div>
                    <div className="footer">
                        <div className="user">
                            <div className="user-icon">
                            </div>
                            <span className="username">
                                Admin
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-verticle">
                    <div className="card-small">
                        <span className="title">
                            Active Users
                        </span>
                        <h2 className="text">12</h2>
                        <div className="graph">
                            <div className="bar" data-day="sunday">
                                <div className="bar-content"></div>
                            </div>
                            <div className="bar" data-day="monday">
                                <div className="bar-content"></div>
                            </div>
                            <div className="bar" data-day="tuesday">
                                <div className="bar-content"></div>
                            </div>
                            <div className="bar" data-day="wednesday">
                                <div className="bar-content"></div>
                            </div>
                            <div className="bar" data-day="thursday">
                                <div className="bar-content"></div>
                            </div>
                            <div className="bar" data-day="friday">
                                <div className="bar-content"></div>
                            </div>
                            <div className="bar" data-day="saturday">
                                <div className="bar-content"></div>
                            </div>
                        </div>
                    </div>
                    <div className="card-small">
                        <span className="title">
                            Overview
                        </span>
                    </div>
                </div>
            </div>
            <div className="stats">
            </div>
        </div>
    )
}