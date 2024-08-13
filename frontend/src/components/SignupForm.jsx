import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = ({ closeForm }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://usermanagement-zczb.onrender.com/api/users', { email, firstName, lastName, password })
      .then(() => {
        setSuccess(`User with email ${email} was added successfully.`);
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setError('');
      })
      .catch(err => setError(err.response.data.message));
  };

  const handleClose = () => {
    setSuccess('');
    closeForm();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        
        {success ? (
          <div>
            <p className="success">{success}</p>
            <button style={{display:"flex",justifyContent:"flex-start"}} className="btn" onClick={handleClose}>CLOSE</button>
          </div>
        ) : (<>
            <h2 style={{textAlign:"left"}}>SIGN UP FORM</h2>
          <form onSubmit={handleSubmit}>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
           </div> <br />
           <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </div> <br />
           <div style={{display:"flex", justifyContent:"space-evenly"}}><label>Last Name:</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div><br />
            <div style={{display:"flex", justifyContent:"space-evenly"}}><label>Password:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>{error && <p className="error">{error}</p>}
           <div style={{display:"flex", justifyContent:"flex-end"}}>
           <button className="btn"type="submit">SIGN UP</button>
           <button className='btn' type="button" onClick={handleClose}>CANCEL</button>
           </div>
          </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
