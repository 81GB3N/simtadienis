import { getAllUsers } from "../../utils/api"
import { useState, useEffect } from 'react'
import LeaderBoardEntry from './LeaderBoardEntry'
import { useInView } from 'react-intersection-observer';
import { useSubPage } from '../../context/SubPageProvider';
import { FormattedMessage } from 'react-intl';
import './leaderboard.css'

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

export default function LeaderBoard() {
    const [allUsers, setAllUsers] = useState(null);
    const [error, setError] = useState(null);
    let maxDisplayLimit;
    const [displayLimit, setDisplayLimit] = useState(5);
    // to many states, fix l8r
    const { ref, inView } = useInView({ threshold: 0, fallbackInView: true });
    const [animate, setAnimate] = useState(false);
    const { userSubPageName } = useSubPage();

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

    useEffect(() => {
        fetchUsers();
    }, [])

    useEffect(() => {
        if (userSubPageName !== 'leaderboard') {
            setDisplayLimit(5);
        }
        if (inView) {
            setAnimate(true);
        }
    }, [userSubPageName, inView])

    const toggleDisplayLimit = () => {
        if (displayLimit !== maxDisplayLimit) {
            setDisplayLimit(maxDisplayLimit);
        } else {
            setDisplayLimit(5);
        }
    }


    socket.on('getusers', async () => {
        const ANIMATION_DURATION = 2500; // in ms, as set in css
        setAnimate(false);
        setTimeout(async () => {
            await fetchUsers();
        }, ANIMATION_DURATION);
        setTimeout(() => {
            setAnimate(true);
        }, ANIMATION_DURATION);
    })

    if (error) return <div>{error}</div>
    if (!allUsers) return <div>Loading...</div>

    return (
        <div className={`leaderboard ${animate ? 'in-view' : ''} ${userSubPageName === 'leaderboard' ? 'active' : ''}`} ref={ref}>
            {(allUsers).slice(0, displayLimit).map((user, index) =>
                <LeaderBoardEntry key={user.name + user.surname} position={index + 1} user={user} mostMoney={allUsers[0].money} />
            )}
            <div className="leaderboard__controls">
                <button onClick={toggleDisplayLimit}>{displayLimit === maxDisplayLimit ?
                    <FormattedMessage id="leaderboard.less" defaultMessage="Less..." /> :
                    <FormattedMessage id="leaderboard.more" defaultMessage="More..." />
                }</button>
            </div>
        </div>
    )
}