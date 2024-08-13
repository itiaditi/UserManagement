import React from 'react';

const DeleteUserPopup = ({ userId, closePopup, handleDelete }) => {
  const confirmDelete = () => {
    handleDelete(userId);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={closePopup}>&times;</span>
        <h2>Delete User ?</h2>
        <p>Are you sure you want to delete this user?</p>
        <button className="btn"onClick={confirmDelete}>DELETE</button>
        <button className="btn"onClick={closePopup}>CANCEL</button>
      </div>
    </div>
  );
};

export default DeleteUserPopup;
