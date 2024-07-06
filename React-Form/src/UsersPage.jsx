import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersPage.css';

const UsersPage = ({ users, setUsers, setEditingUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers) {
            setUsers(storedUsers);
        }
    }, [setUsers]);

    const deleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const editUser = (id) => {
        const userToEdit = users.find(user => user.id === id);
        setEditingUser(userToEdit);
        navigate('/');
    };

    const deleteAllUsers = () => {
        localStorage.removeItem('users');
        setUsers([]);
    };

    if (users.length === 0) {
        return (
            <div className='noUser'>
                No user data available. Please submit the form first.
                <button className='btn' onClick={() => navigate('/')}>Go to Form</button>
            </div>
        );
    }

    return (
        <div className='displayPage'>
            <h1>All Users</h1>
            <button className='btn' onClick={deleteAllUsers}>Delete All Users</button>
            <ul>
                {users.map(user => (
                    <li className='user' key={user.id}>
                        <div>
                            <img src={user.image} alt="User uploaded" style={{ width: '100px' }} />
                        </div>
                        <div>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <div>
                            <button className='btn small' onClick={() => editUser(user.id)}>Edit</button>
                            <button className='btn small' onClick={() => deleteUser(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className='btn' onClick={() => { setEditingUser(null); navigate('/') }}>Go to Form</button>
        </div>
    );
};

export default UsersPage;
