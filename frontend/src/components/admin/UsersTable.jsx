import { useState } from 'react';

export default function UsersTable({ users }) {

    const [focus, setFocus] = useState(null);
    const [rowInfo, setRowInfo] = useState({});

    const handleHover = (index) => {
        console.log(index);
        setFocus(index);
    }

    const handleEdit = (e) => {
        
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