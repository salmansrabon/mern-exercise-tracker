import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUsers = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login'); // Redirect to login if token is absent
    } else {
      axios.defaults.headers.common['Authorization'] = `${storedToken}`;
      axios.post('http://localhost:5000/users/validateToken')
        .catch(error => {
          // Redirect to login if token validation fails
          navigate('/login');
        });
    }
  }, [navigate]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };

    // Check if username is empty before submitting
    if (!user.username || !user.email || !user.password) {
      setError('Please fill in all fields');
      return; // prevent further execution
    }

    axios.post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log(res.data);
        // If submission is successful, clear error and reset username
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
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
          <label>Email: </label>
          <input
            type='email'
            required
            className='form-control'
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className='form-group'>
          <label>Password: </label>
          <input
            type='password'
            required
            className='form-control'
            value={password}
            onChange={onChangePassword}
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
