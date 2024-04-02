import React from 'react';

const ClientSide = ({ role, onLogout }) => {
    
    <div>
    <h1>Welcome to the client Page</h1>
    <p>User Role: {role}</p>
    
    <button onClick={onLogout}>Logout</button>
  </div>
    
}

export default ClientSide;