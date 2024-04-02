import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        // Replace 'userId' with the actual user ID or retrieve it from your authentication system
        const userId = 1; // Example user ID

        const response = await fetch(`http://localhost:8080/api/profile/${userId}`);
        const data = await response.json();

        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {profileData.username}</p>
      <p>Full Name: {profileData.full_name}</p>
      <p>Bio: {profileData.bio}</p>
      <img src={profileData.avatar_url} alt="Avatar" style={{ maxWidth: '100px', maxHeight: '100px' }} />
    </div>
  );
};

export default Profile;
