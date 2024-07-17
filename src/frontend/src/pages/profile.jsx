import React, { useState, useEffect } from 'react';

function Profile() {
  document.title = 'Profile';

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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card">
        <div className="card-body">
          <div style={{textAlign: "center"}}>
            <h1 className="card-title">Profile</h1>
          </div>
          <div className='row' style={{justifyContent: "center"}}>
            <div className="mr-5 ml-3">
              <h2>User credentials</h2>
              <p>Username: {user.username}</p>
              <p>Name: {user.name}</p>
              <p>Surname: {user.surname}</p>
              <p>Phone: {user.phone}</p>
            </div>
            <div className="ml-5 mr-3" style={{textAlign:"center"}}>
              <h2>Electronic cart</h2>
              <img src={imageUrl} alt="QR code" className="img-fluid mb-2" />
              <p>Balance: {ecart.bonus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

export default Profile;