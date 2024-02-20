import { useState } from 'react';

export default function UserGreeting({ endGreeting }) {
    const [startBlueScreen, setStartBlueScreen] = useState(false);
    const [startLoading, setStartLoading] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const spinnerDuration = 3000; // in ms

    const getRandomDelay = () => {
        const upperBound = 1000; // max delay (100 = 1second)
        const lowerBound = 500; // min delay
        const delay = Math.round(Math.random() * (upperBound - lowerBound) + lowerBound);
        return delay;
    };

    const incrementPercentage = () => {
        setPercentage((prevPercentage) => {
            const newPercentage = prevPercentage + parseInt(Math.random() * 300);
            return newPercentage > 100 ? 100 : newPercentage;
        });
    };

    // increment loop
    function incrementLoop(){
        const interval = setInterval(() => {
            if (percentage < 100) {
                console.log('incrementing: ', percentage);
                incrementPercentage();
            } else {
                console.log('endGreeting');
                endGreeting();
            }
        }, getRandomDelay());
    
        return () => {
            clearInterval(interval);
        };
    }




    const handleChestOpen = () => {
        setStartLoading(true);
        setTimeout(() => {
            setStartBlueScreen(true);
            setStartLoading(false);
            setPercentage(0);
            incrementLoop();
        }, spinnerDuration);
    }


    return (
        <div className='greeting'>
            {/* <TreasureChest handleChestOpen={handleChestOpen} /> */}
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

