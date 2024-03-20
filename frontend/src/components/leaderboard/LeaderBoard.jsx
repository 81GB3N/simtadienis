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

const MIN_DISPLAY_CNT = 5;

/**
 * Renders the LeaderBoard component.
 * @param {boolean} desktopMode - Whether the component is being rendered in desktop mode.
 * @returns {JSX.Element} The rendered LeaderBoard component.
 */

export default function LeaderBoard({ desktopMode = false }) {
    const [leaderBoardPos, setLeaderBoardPos] = useState(null);
    const [error, setError] = useState(null);

    const [displayLimit, setDisplayLimit] = useState(MIN_DISPLAY_CNT);
    // to many states, fix l8r
    const [maxDisplayLimit, setMaxDisplayLimit] = useState(0);
    const { ref, inView } = useInView({ threshold: 0, fallbackInView: true });
    const [animate, setAnimate] = useState(false);
    const { currentUserPageName } = usePage();

    /**
     * Fetches the leaderboard positions of all users.
     */
    const getLeaderBoardPositions = useCallback(async () => {
        try {
            const data = await getAllUsers();

            setMaxDisplayLimit(data.result.length);
            if (data.result.length < MIN_DISPLAY_CNT || desktopMode) {
                console.log('setting display limit to undefined')
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

    useEffect(() => {
        getLeaderBoardPositions().then((res) => {
            setLeaderBoardPos(res);
        })
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
    // socket.on('getusers', async () => {
    //     const ANIMATION_DURATION = 2500; // in ms, as set in css
    //     setAnimate(false);
    //     setTimeout(async () => {
    //         await getLeaderBoardPositions();
    //     }, ANIMATION_DURATION);
    //     setTimeout(() => {
    //         setAnimate(true);
    //     }, ANIMATION_DURATION);
    // })
    
    socket.on('newUser', async (payload) => {
        console.log('new user added', payload);
    })

    socket.on('updateUser', async (payload) => {
        console.log('user updated', payload);
    })

    if (error) return <div>{error}</div>
    if (!leaderBoardPos) return <div></div>

    return (
        <div
            className={`user-page side-page leaderboard ${animate ? 'in-view' : ''} ${desktopMode ? 'active desktop' : currentUserPageName === 'leaderboard' ? 'active' : ''}`}
            ref={ref}
            style={{ 'grid-template-rows': `repeat(${leaderBoardPos.length}, min-content)` }}>
            {(leaderBoardPos).slice(0, displayLimit).map((user, index) =>
                <LeaderBoardEntry key={user.name + user.surname} position={index + 1} user={user} mostMoney={leaderBoardPos[0].money} />
            )}
            <div className="leaderboard__controls">
                {displayLimit && !desktopMode &&
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