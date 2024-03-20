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

    let barWidth = (Number(user.money) / mostMoney) * 100;
    return (
        <>
            <div className={`entry pos-${position > 5 ? 'none' : position}`}
                onClick={() => setModalIsOpen(true)}
                style={{ '--transition-delay-multiplier': `${position - 1}` }}>
                <div className="entry-wrap">
                    {position <= 3 && (
                        <div className={`entry-ava`}>
                            <FontAwesomeIcon icon={faCrown} />
                        </div>)
                    }
                    <div className="entry__info">
                        <p className="entry-name"><span className="entry-pos">{position}</span>{user.name + ' ' + user.surname}</p>
                        <div className="entry-money">
                            <FontAwesomeIcon icon={faMoneyBill1Wave} className="money-icon" />
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
                    <UserWindow user={`${user.name} ${user.surname}`} closeModal={() => setModalIsOpen(false)} />
                </Modal>
            }
        </>
    )
}