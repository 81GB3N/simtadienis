import { useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer';

import { getAllUsers } from "../../utils/api"

import LeaderBoardEntry from './LeaderBoardEntry'

import { usePage } from '../../context/PageProvider';

import { LiaPlusSquare, LiaMinusSquare } from 'react-icons/lia';
import './leaderboard.css'

import io from 'socket.io-client';

const isLocalhost = window.location.hostname === 'localhost';
const socketUrl = isLocalhost ? 'http://localhost:4000' : 'https://lic100.lt';

const socket = io.connect(socketUrl);

const MIN_DISPLAY_CNT = 5;

/**
 * Renders the LeaderBoard component.
 *
 * @returns {JSX.Element} The rendered LeaderBoard component.
 */

export default function LeaderBoard() {
    const [sortedUsers, setSortedUsers] = useState(null);
    const [error, setError] = useState(null);

    const [displayLimit, setDisplayLimit] = useState(MIN_DISPLAY_CNT);
    // to many states, fix l8r
    let maxDisplayLimit;
    const { ref, inView } = useInView({ threshold: 0, fallbackInView: true });
    const [animate, setAnimate] = useState(false);
    const { currentUserPageName } = usePage();

    /**
     * Fetches the leaderboard positions of all users.
     */
    const getLeaderBoardPositions = useCallback(() => {
        getAllUsers()
            .then(data => {
                maxDisplayLimit = data.result.length;
                if (maxDisplayLimit < MIN_DISPLAY_CNT) {
                    setDisplayLimit(undefined);
                }
                const sortedUsers = data.result.sort((a, b) => b.money - a.money);
                setSortedUsers(sortedUsers);
            })
            .catch(err => {
                console.error('error retrieving all users')
                setError(err);
            })
    }, [])

    useEffect(() => {
        getLeaderBoardPositions();
    }, [getLeaderBoardPositions])

    useEffect(() => {
        if (currentUserPageName !== 'leaderboard') {
            setDisplayLimit(5);
        }
        if (inView) {
            setAnimate(true);
        }
    }, [currentUserPageName, inView])

    /**
     * Toggles the display limit of the leaderboard.
     */
    const toggleDisplayLimit = () => {
        if (displayLimit !== maxDisplayLimit) {
            setDisplayLimit(maxDisplayLimit);
        } else {
            setDisplayLimit(5);
        }
    }

    /**
     * Listens for the 'getusers' event and fetches the leaderboard positions of all users.
     */
    socket.on('getusers', async () => {
        const ANIMATION_DURATION = 2500; // in ms, as set in css
        setAnimate(false);
        setTimeout(async () => {
            await getLeaderBoardPositions();
        }, ANIMATION_DURATION);
        setTimeout(() => {
            setAnimate(true);
        }, ANIMATION_DURATION);
    })

    if (error) return <div>{error}</div>
    if (!sortedUsers) return <div>Loading...</div>

    return (
        <div className={`user-page leaderboard ${animate ? 'in-view' : ''} ${currentUserPageName === 'leaderboard' ? 'active' : ''}`} ref={ref}>
            {(sortedUsers).slice(0, displayLimit).map((user, index) =>
                <LeaderBoardEntry key={user.name + user.surname} position={index + 1} user={user} mostMoney={sortedUsers[0].money} />
            )}
            <div className="leaderboard__controls">
                {displayLimit &&
                    <button onClick={toggleDisplayLimit}>
                        {displayLimit === maxDisplayLimit ?
                            <LiaMinusSquare /> :
                            <LiaPlusSquare />
                        }
                    </button>
                }
            </div>
        </div>
    )
}