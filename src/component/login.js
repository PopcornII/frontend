// Login.js
import React, { useState } from 'react';
import './login.css'
const Token = 'asdJHFKJWIEla$!%afgaSDGWGE';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    // Send login request to the server
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': Token,
            },
            body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

           // onLogin(Token);

            console.log('Login response:', response); // Add this log
            console.log('Login data:', data); // Add this log

            if (response.ok) {
            localStorage.setItem('token', data.token);
            onLogin();
            } else {
            console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };
    

  return (
    <div className='login-container'>
        <form>
          <div className='lbName' style={{textAlign:"center", fontSize:'36px'}}>Login</div>
          <label>Username: </label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password: </label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='button' onClick={handleLogin}>Login</button>
        </form>
        
    </div>
  );
};

export default Login;
