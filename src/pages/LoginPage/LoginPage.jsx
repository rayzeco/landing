import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login-page.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axios.post(`${process.env.REACT_APP_RYZ_SERVER}/authenticate`, formData);
      const token = response.data.access_token;
      sessionStorage.setItem('token', token);
      navigate('/invoice');
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Enter Rayze</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <h3>
          <Link to='/register'>
          <span style={{ color: '#000000' }}>{'>>>'} {'\u00A0'} Click to Register New User </span>
          </Link>
      </h3>
    </div>
  );
};

export default LoginPage;

