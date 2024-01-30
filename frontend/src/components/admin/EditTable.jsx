import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserProvider";
import { useEffect, useState } from "react";

export default function EditTable() {
    const { user } = useUser();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(Object.keys(user).length !== 0);
    }, [user])

    return (
        <div className="edit">
            <div className="edit__header">
                <FontAwesomeIcon className='edit-icon' icon={faUser} />
                <p className="edit__name">
                    {selected ? user.name : 'No user selected' }
                </p>
                <FontAwesomeIcon className='edit-icon' icon={faXmark} />
            </div>
            {selected ? (
                <div className="edit__info">
                    <p className="info-name">
                        {user.name} {user.surname}
                    </p>
                    <p className="info-money">
                        {user.money}
                    </p>
                </div>
            ) : (<p>Select a user to edit</p>)}
        </div>
    )
}