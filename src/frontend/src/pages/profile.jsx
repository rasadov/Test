import React, { useState, useEffect } from 'react';

function Profile() {

  const [imageUrl, setImageUrl] = useState('');
  const [user, setUserdict] = useState({});
  const [ecart, setEcart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setImageUrl(data.qr_code);
        setUserdict(data.user);
        setEcart(data.ecart);
      }
    });
  }, []);

    return (
      <div>
        <h1>Profile</h1>

        <div>
          <h2>User credentials</h2>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          <p>Surname: {user.surname}</p>
          <p>Phone: {user.phone}</p>
        </div>
        <div>
          <h2>Electronic cart</h2>
          <img src={imageUrl} alt="QR code" />
          <p>Balance: {ecart.bonus}</p>
        </div>
        <p>This is the profile page</p>
      </div>
    );
  }

export default Profile;