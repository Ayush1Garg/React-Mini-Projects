import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './FormPage';
import UsersPage from './UsersPage';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage users={users} setUsers={setUsers} editingUser={editingUser} setEditingUser={setEditingUser} />} />
        <Route path="/users" element={<UsersPage users={users} setUsers={setUsers} setEditingUser={setEditingUser} />} />
      </Routes>
    </Router>
  );
};

export default App;
