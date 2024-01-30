import { useState } from 'react';
import { useUser } from '../../context/UserProvider';

export default function UsersTable({ users }) {
    const { setUser } = useUser();
    const [focus, setFocus] = useState(null);
    const [rowInfo, setRowInfo] = useState({});

    const handleHover = (index) => {
        console.log(index);
        setFocus(index);
    }

    const handleEdit = (e) => {
        console.log('edit');
        console.log(e.target.parentElement);
        const name = e.target.parentElement.children[0].innerText;
        const surname = e.target.parentElement.children[1].innerText;
        const money = e.target.parentElement.children[2].innerText;
        const user = { name, surname, money };
        setUser(user);
    }

    const handleLeave = (e) => {
        console.log('left');
        setFocus(null);
    }

    return (
        <table className='user-table' onMouseLeave={handleLeave}>
            <thead className='table__head'>
                <tr>
                    <th className='head-prop'>Name</th>
                    <th className='head-prop'>Surname</th>
                    <th className='head-prop'>Money</th>
                </tr>
            </thead>
            <tbody className='table__body'
            >
                {users.map((user, index) => (
                    <tr key={user.name}
                        className={`body-row ${index === focus ? 'active' : ''}`}
                        onMouseOver={() => handleHover(index)}>
                        <td className='body-prop'>{user.name}</td>
                        <td className='body-prop'>{user.surname}</td>
                        <td className='body-prop'>{user.money}</td>
                        <button className={`edit-button ${index === focus ? 'active' : ''}`} onClick={handleEdit}>Edit</button>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};