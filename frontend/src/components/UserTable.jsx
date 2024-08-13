import React from 'react';

const UserTable = ({ users, setSelectedUsers, setShowDelete }) => {
  const handleCheckboxChange = (id) => {
    setSelectedUsers(prev => prev.includes(id)
      ? prev.filter(userId => userId !== id)
      : [...prev, id]
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th><input type="checkbox"/></th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td><input type="checkbox" onChange={() => handleCheckboxChange(user._id)} /></td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td><button className="btn" onClick={() => setShowDelete(user._id)}>DELETE</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
