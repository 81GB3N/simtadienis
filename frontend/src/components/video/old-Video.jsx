import { usePage } from "../../context/PageProvider"
import { useUser } from "../../context/UserProvider"
import { useState, useEffect, useCallback } from "react"
import { handleVotes } from "../../utils/api"
import VideoInstance from "./old-VideoInstance"
import './video.css'

import CONSTANTS from "../constants"

export default function Video() {
    const { currentUserPageName } = usePage();
    const { userId } = useUser();

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    console.log(CONSTANTS.VIDEO_LIST);
    const [totalVotes, setTotalVotes] = useState(Array(CONSTANTS.VIDEO_LIST.length).fill(0));

    const getTotalVotes = useCallback(async () => {
        try {
            const data = await handleVotes({ name: userId.name, surname: userId.surname, action: "get" });
            return data.response;
        } catch (err) {
            console.error(err);
        }
    }, [userId.name, userId.surname]);

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth > 500 ? 500 : window.innerWidth);
            console.log(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        getTotalVotes().then((res) => {
            for (const item in res) {
                setTotalVotes((prev) => {
                    const newVotes = [...prev];
                    newVotes[res[item].video] = res[item].vote || 0;
                    return newVotes;
                });
            }
        });

        return () => window.removeEventListener('resize', handleResize);
    }, [getTotalVotes]);

    const deductVote = (id) => {
        setTotalVotes((prev) => {
            const newVotes = [...prev];
            newVotes[id] -= 1;
            return newVotes;
        });
    };

    const addVote = (id) => {
        setTotalVotes((prev) => {
            const newVotes = [...prev];
            newVotes[id] += 1;
            return newVotes;
        });
    }

    const votesInstances = {
        deductVote,
        addVote
    }

    return (
        <div className={`user-page side-page video-page ${currentUserPageName === 'video' ? 'active' : ''}`}>
            <div className="video__container">
                {Array(CONSTANTS.VIDEO_LIST.length).fill().map((_, i) =>
                    {
                    console.log('videoVotes', totalVotes);
                    return  <VideoInstance key={i} videoVotes={totalVotes[i]} votesInstances={votesInstances} position={i} screenSize={screenSize} />
                    }
                )}
            </div>
        </div>
    )
}