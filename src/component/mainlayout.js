// Dashboard.js
import React from 'react';

const Dashboard = ({ role, onLogout }) => {
  return (
    <div>
      
      <h1>Welcome to the Admin Dashboard</h1>
      <p>User Role: {role}</p>
      
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
