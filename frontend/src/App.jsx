import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import UserTable from './components/UserTable';
import SignUpForm from './components/SignupForm';  // Ensure correct filename
import DeleteUserPopup from './components/DeleteUserPopup';
import './App.css'
const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showDelete, setShowDelete] = useState(null);

  useEffect(() => {
    axios.get('https://usermanagement-zczb.onrender.com/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, [users]);

  const handleDelete = (id) => {
    axios.delete(`https://usermanagement-zczb.onrender.com/api/users/${id}`)
      .then(() => {
        setShowDelete(null);
      })
      .catch(error => console.error(error));
  };

  const handleExport = () => {
    const data = users.filter(user => selectedUsers.includes(user._id));
    return data.map(user => ({
      id: user._id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    }));
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <div style={{display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
      <button className="btn"onClick={() => setShowSignUp(true)}>SIGN UP</button>
      <button className="btn" disabled={selectedUsers.length === 0}>
        <CSVLink data={handleExport()} filename="users.csv">EXPORT</CSVLink>
      </button>
      </div>
      <UserTable
        users={users}
        setSelectedUsers={setSelectedUsers}
        setShowDelete={setShowDelete}
      />
      {showSignUp && (
        <SignUpForm closeForm={() => setShowSignUp(false)} />
      )}
      {showDelete && (
        <DeleteUserPopup
          userId={showDelete}
          closePopup={() => setShowDelete(null)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
