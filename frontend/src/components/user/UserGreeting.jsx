import '../../css/chest.css'
import TreasureChest from './TreasureChest'
import { useState, useEffect } from 'react';

export default function UserGreeting() {
    const [startBlueScreen, setStartBlueScreen] = useState(false);
    const [startLoading, setStartLoading] = useState(false);
    const [percentage, setPercentage] = useState(null);

    const getRandomDelay = () => {
        const upperBound = 1000; // max delay (100 = 1second)
        const lowerBound = 500; // min delay
        const delay = Math.round(Math.random() * (upperBound - lowerBound) + lowerBound);
        return delay;
    };

    // const incrementPercentage = () => {
    //     setPercentage((prevPercentage) => {
    //         const newPercentage = prevPercentage + parseInt(Math.random() * 10);
    //         return newPercentage > 100 ? 100 : newPercentage;
    //     });
    //     if (percentage < 100) {
    //         console.log('new percent', percentage)
    //         setTimeout(() => {
    //             incrementPercentage();
    //         }, getRandomDelay());
    //     }
    // };

    const incrementPercentage = () => {
        setPercentage((prevPercentage) => {
            const newPercentage = prevPercentage + parseInt(Math.random() * 10);
            return newPercentage > 100 ? 100 : newPercentage;
        });
    };

    useEffect(() => {
        if (percentage < 100) {
            console.log('new percent', percentage);
            const timeoutId = setTimeout(() => {
                incrementPercentage();
            }, getRandomDelay());

            return () => {
                // Cleanup to prevent setting state on unmounted component
                clearTimeout(timeoutId);
            };
        }
    }, [percentage]);

    const handleChestOpen = () => {
        setStartLoading(true);
        setTimeout(() => {
            setStartBlueScreen(true);
            setStartLoading(false);
            setPercentage(0);
            incrementPercentage();
        }, 1);
    }


    return (
        <div className='greeting'>
            <TreasureChest handleChestOpen={handleChestOpen} />
            <div className={`spinner ${startLoading ? 'active' : ''}`} >
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={`blue-screen ${startBlueScreen ? 'active' : ''}`}>
                <h2 className='screen-face'>:(</h2>
                <p className='screen-info'>
                    Your Phone ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for
                    you.
                </p>
                <p className='screen-percentage'>{percentage}% Complete</p>
            </div>
        </div>
    )
}

