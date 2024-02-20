import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";

export default function LeaderBoardEntry({ user, position, mostMoney }) {
    const OFFSET = 10; // % of the bar width

    function getEntryProps(position) {
        switch (position) {
            case 1:
                return { customClass: 'first', crown: true };
            case 2:
                return { customClass: 'second', crown: true };
            case 3:
                return { customClass: 'third', crown: true };
            case 4:
                return { customClass: 'fourth', crown: false };
            case 5:
                return { customClass: 'fifth', crown: false };
            default:
                return { customClass: 'none', crown: false };
        }
    }

    const entryProps = getEntryProps(position);
    let barWidth = (Number(user.money) / mostMoney) * 100;
    if(entryProps.customClass === 'first') barWidth -= OFFSET; 
    console.log(barWidth);
    
    return (
        <div className={`entry ${entryProps.customClass}`}>
            <div className="entry-wrap">
                {entryProps.crown && (
                    <div className={`entry-ava`}>
                        <FontAwesomeIcon icon={faCrown} />
                    </div>)
                }
                <div className="entry__info">
                    <p className="entry-name"><span className="entry-pos">{position}</span>{user.name + ' ' + user.surname}</p>
                    <div className="entry-money">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} className="money-icon"/>
                        <span className="money-cnt">{user.money}</span>
                    </div>
                </div>
            </div>
            <div className="entry-bar">
                <div className="bar" style={{ width: `${barWidth}%` }}></div>
            </div>
        </div>
    )
}