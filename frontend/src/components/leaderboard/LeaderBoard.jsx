import { useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer';

import { getAllUsers } from "../../utils/api"

import LeaderBoardEntry from './LeaderBoardEntry'

import { usePage } from '../../context/PageProvider';

import { LiaPlusSquare, LiaMinusSquare } from 'react-icons/lia';
import './leaderboard.css'

import io from 'socket.io-client';

import CONSTANTS from '../constants';

const socket = io.connect(CONSTANTS.SOCKET_URL);

const MIN_DISPLAY_LIMIT = 5;

/**
 * Renders the LeaderBoard component.
 * @param {boolean} desktopMode - Whether the component is being rendered in desktop mode.
 * @returns {JSX.Element} The rendered LeaderBoard component.
 */

export default function LeaderBoard({ desktopMode = false }) {
    const [leaderBoardPos, setLeaderBoardPos] = useState(null);
    const [error, setError] = useState(null);

    const [displayLimit, setDisplayLimit] = useState(MIN_DISPLAY_LIMIT);
    // to many states, fix l8r
    const [maxDisplayLimit, setMaxDisplayLimit] = useState(0);
    const { ref, inView } = useInView({ threshold: 0, fallbackInView: true });
    const [animate, setAnimate] = useState(false);
    const { currentUserPageName } = usePage();
    const [mostMoney, setMostMoney] = useState(0);

    /**
     * Fetches the leaderboard positions of all users.
     */
    const getLeaderBoardPositions = useCallback(async () => {
        try {
            const data = await getAllUsers();

            setMaxDisplayLimit(data.result.length);
            if (data.result.length <= MIN_DISPLAY_LIMIT || desktopMode) {
                setDisplayLimit(undefined);
            }

            const sortedPositions = data.result.sort((a, b) => b.money - a.money);
            return sortedPositions;

        } catch (err) {
            console.error('error retrieving all users')
            setError(err);
            return null;
        }
    }, [desktopMode])

    /**
     * Toggles the display limit of the leaderboard.
     */
    const toggleDisplayLimit = () => {
        if (displayLimit !== maxDisplayLimit) {
            setDisplayLimit(maxDisplayLimit);
        } else {
            setDisplayLimit(MIN_DISPLAY_LIMIT);
        }
    }

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            const data = await getLeaderBoardPositions();
            setLeaderBoardPos(data);
            setMostMoney(data[0].money);
        }
        fetchLeaderBoard();
        // not sure how to handle newUser?
        socket.on('newUser', () => {
            fetchLeaderBoard();
            if (displayLimit > MIN_DISPLAY_LIMIT) setDisplayLimit(prev => prev + 1);
        })

        socket.on('updateUser', (updatedUser) => {
        })

        return () => {
            socket.off('newUser');
            socket.off('updateUser');
        }
    }, [getLeaderBoardPositions, mostMoney, displayLimit])

    useEffect(() => {
        if (currentUserPageName !== 'leaderboard') {
            setDisplayLimit(5);
        }
        if (inView) {
            setAnimate(true);
        }
    }, [currentUserPageName, inView])


    if (error) return <div>{error}</div>
    if (!leaderBoardPos) return <div></div>

    return (
        <div
            className={`user-page side-page leaderboard ${animate ? 'in-view' : ''} ${desktopMode ? 'active desktop' : currentUserPageName === 'leaderboard' ? 'active' : ''}`}
            ref={ref}
            style={{ gridTemplateRows: `repeat(${displayLimit}, min-content)` }}>
            {

                leaderBoardPos.slice(0, desktopMode ? maxDisplayLimit : displayLimit).map((user, index) =>
                    <LeaderBoardEntry key={user.name + user.surname} position={index + 1} user={user} mostMoney={mostMoney} />
                ) 

            }
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