import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserProvider";

export default function EditTable() {
    const { user } = useUser();

    return (
        <div className="edit">
            <div className="edit__header">
                <FontAwesomeIcon className='edit-icon' icon={faUser}  />
                <p className="edit-user__name">
                    {Object.keys(user).length === 0 ? 'No user selected' : user.name}
                </p>
                <FontAwesomeIcon className='edit-icon' icon={faXmark} />
            </div>
        </div>
    )
}