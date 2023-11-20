import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Check token validity before removing it
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.post('http://localhost:5000/users/validateToken', {
          token,
        });
  
        if (response.status === 200 && response.data.valid) {
          // Token is valid, proceed with logout
          localStorage.removeItem('token'); // Clear the token from localStorage
          navigate('/login'); // Redirect to login page after logout
        } else {
          // Token is expired or invalid
          localStorage.removeItem('token'); // Still remove token even if it's invalid
          navigate('/login'); // Redirect to login page
        }
      } else {
        // No token present, just redirect to login page
        navigate('/login');
      }
    } catch (error) {
      console.error('An error occurred during token validation:', error);
      // Redirect to login page in case of error
      navigate('/login');
    }
  };
  const token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">ExcerTracker</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
            <Link to="/user" className="nav-link">Create User</Link>
          </li>
          {token && (
            <li className="navbar-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
