import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";

import Modal from "../modal/Modal";
import UserWindow from "../user/UserWindow";

import { useState } from "react";
/**
 * Renders a leaderboard entry component.
 * @param {Object} props.user - The user object containing name, surname, and money.
 * @param {number} props.position - The position of the user in the leaderboard.
 * @param {number} props.mostMoney - The highest amount of money among all users.
 * @returns {JSX.Element} The rendered leaderboard entry component.
 */
export default function LeaderBoardEntry({ user, position, mostMoney }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const OFFSET = 10; // % of the bar width

    /**
     * Gets the custom class and crown status for the given position.
     * @param {number} position - The position of the user in the leaderboard.
     * @returns {Object} The custom class and crown status.
     */
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
    
    return (
        <>
        <div className={`entry ${entryProps.customClass}`} onClick={()=>setModalIsOpen(true)}>
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
                        <span className="digit">{user.money}</span>
                    </div>
                </div>
            </div>
            <div className="entry-bar">
                <div className="bar" style={{ '--bar-width': `${barWidth}%` }}></div>
            </div>
        </div>
        {
            modalIsOpen && 
            <Modal openOnMount>
                <UserWindow user={`${user.name} ${user.surname}`} closeModal={()=>setModalIsOpen(false)}/>
            </Modal>
        }
        </>
    )
}