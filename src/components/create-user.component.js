import React, { useState } from 'react';
import axios from 'axios';

const CreateUsers = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username
    };

    // Check if username is empty before submitting
    if (!user.username) {
      setError('Please enter a username');
      return; // prevent further execution
    }

    axios.post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log(res.data);
        // If submission is successful, clear error and reset username
        setError('');
        setUsername('');
      })
      .catch(error => {
        // Handle specific errors from the server if needed
        if (error.response && error.response.status === 409) {
          setError('User already exists');
        } else {
          setError('An error occurred');
        }
      });

    setUsername('');
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input
            type='text'
            required
            className='form-control'
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className='form-group'>
          <input type='submit' value='Create User' className='btn btn-primary' />
        </div>
      </form>
      {error && (
        <div className='error-label'>
          <label style={{ color: 'red' }}>{error}</label>
        </div>
      )}
    </div>
  );
};

export default CreateUsers;
