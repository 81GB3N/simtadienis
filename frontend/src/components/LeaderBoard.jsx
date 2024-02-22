import { getAllUsers } from "../utils/api"
import { useState, useEffect } from 'react'
import LeaderBoardEntry from './LeaderBoardEntry'
import { useInView } from 'react-intersection-observer';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

export default function LeaderBoard() {
    const [allUsers, setAllUsers] = useState(null);
    const [error, setError] = useState(null);
    let maxDisplayLimit;
    const [displayLimit, setDisplayLimit] = useState(5);
    let threshold;
    if (displayLimit === 5) threshold = 0.3;
    else threshold = 0.05;
    const { ref, inView } = useInView({ threshold: threshold, fallbackInView: true });

    const fetchUsers = () => {
        getAllUsers()
            .then(data => {
                maxDisplayLimit = data.result.length;
                const sorted = data.result.sort((a, b) => b.money - a.money);
                setAllUsers(sorted);
            })
            .catch(err => {
                console.log('error retrieving all users')
                setError(err);
            })
    }

    const toggleDisplayLimit = () => {
        if (displayLimit !== maxDisplayLimit) {
            setDisplayLimit(maxDisplayLimit);
        } else {
            setDisplayLimit(5);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    socket.on('getusers', () => {
        console.log('user data updated');
        fetchUsers();
    })

    if (error) return <div>{error}</div>
    if (!allUsers) return <div>Loading...</div>

    return (
        <div className={`leaderboard ${inView ? 'in-view' : ''}`} ref={ref}>
            {(allUsers).slice(0, displayLimit).map((user, index) =>
                <LeaderBoardEntry key={user.name + user.surname} position={index + 1} user={user} mostMoney={allUsers[0].money} />
            )}
            <div className="leaderboard__controls">
                <button onClick={toggleDisplayLimit}>{displayLimit === maxDisplayLimit ? 'Retract' : 'Load All'}</button>
            </div>
        </div>
    )
}