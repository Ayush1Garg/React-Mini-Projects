import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './FormPage.css';

const FormPage = ({ users, setUsers, editingUser, setEditingUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const userId = editingUser ? editingUser.id : uuid();

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
            setImage(editingUser.image);
        }
    }, [editingUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            setError('Please upload an image.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const newUser = {
                id: userId,
                name,
                email,
                image: reader.result,
            };

            const updatedUsers = editingUser ? users.map(user => (user.id === userId ? newUser : user)) : [...users, newUser];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            setEditingUser(null);
            navigate('/users');
        };
        reader.readAsDataURL(image);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setError('');
        } else {
            setImage(null);
            setError('Please upload a valid image file.');
        }
    };

    return (
        <div className='formPage'>
            <button className='btn' onClick={() => { setEditingUser(null); navigate('/users') }} >View All Existing Users</button>
            <h1>{editingUser ? 'Edit' : 'Enter'} your data</h1>
            <form onSubmit={handleSubmit} className='infoForm'>
                <div className='formfield'>
                    <label className='form_label' htmlFor='name'>Name:</label>
                    <input className='form_input' type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='formfield'>
                    <label className='form_label' htmlFor='email'>Email:</label>
                    <input className='form_input' type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='formfield img-feild'>
                    <label className='form_label' htmlFor='image'>Image:</label>
                    <input className='imgInput' type="file" accept="image/*" id='image' onChange={handleFileChange} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className='submission' type="submit">{editingUser ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    );
};

export default FormPage;
