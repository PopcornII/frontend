import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/login';
import Dashboard from './component/mainlayout';
import ClientSide from './component/client';
import MenuList from './component/viewMenu';
import Profile from './component/profile';
import MenuForm from './component/imageupload';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
   
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = decodeToken(token); 
      
      if (decodedToken) {
        setLoggedIn(true);
        setUserRole(decodedToken.userRole); // Extract user role from the token
      }
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleLogin = (token) => {
    console.log('success login');
    localStorage.setItem('token', token)
    const decodedToken = decodeToken(token);
    if(decodedToken){
      setLoggedIn(true);
      setUserRole(decodeToken.userRole)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserRole('');

    fetch('http://localhost:8080/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'autherziation': 'asdJHFKJWIEla$!%afgaSDGWGE',
      },
    });
  };
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
    
        <Route path="/dashboard" element={<Dashboard role={userRole} onLogout={handleLogout} />} />
        <Route path="/client-side" element={<ClientSide role={userRole} onLogout={handleLogout} />} />
        <Route path='/viewMenuList' element={<MenuList role={userRole}/>}/>
        <Route path='/profile' element={<Profile role={userRole}/>}/>
        <Route path='/menu' element={<MenuForm role={userRole}/>}/>

      </Routes>
       
    </Router>
  );
};

export default App;
