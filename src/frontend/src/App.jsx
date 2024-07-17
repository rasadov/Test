import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home.jsx';
import Login from './pages/signin.jsx';
import Register from './pages/singup.jsx';
import Profile from './pages/profile.jsx';
import {Admin, AdminScan, AdminScanUser, AdminUsers, AdminUserDelete, AdminUserEdit} from './pages/admin.jsx';
import NotFound from './pages/notFound.jsx';
import Logout from './pages/logout.jsx';

function App() {
    const checkLoginStatus = async () => {
      try {
          const response = await fetch('http://localhost:5000/credentials', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
              credentials: 'include',
          }
          );
          if (response.ok) {
              const data = await response.json();
              console.log('User is logged in', data);
              if (data.is_authenticated) {

                document.cookie = `username=${data.user.username}`;
                document.getElementById('nav-link-list').innerHTML = `
                <li class="nav-item">
                <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item"><a class="nav-link" href="/profile">Profile</a></li>`;
                if (data.user.role === 'admin') {
                  document.getElementById('nav-link-list').innerHTML += `<li class="nav-item"><a class="nav-link" href="/admin">Admin</a></li>`;
                }
              } else {
                document.getElementById('nav-link-list').innerHTML = `
                <li class="nav-item active">
                  <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/register">Register</a>
                </li>
                `;
              }
          } else {
              console.log('User is not logged in');

          }
      } catch (error) {
          console.error('Failed to check login status', error);
      }
  };

  const usernameCookie = document.cookie.split(';').map(cookie => cookie.trim().split('=')).find(cookie => cookie[0] === 'username');
  const isLoggedIn = usernameCookie !== undefined;


  useEffect(() => {
    if (isLoggedIn) {
    checkLoginStatus();
  }
}, []);
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/logout' element={<Logout/>} />
          <Route exact path='/profile' element={<Profile/>} />
          <Route exact path='/admin' element={<Admin/>} />
          <Route exact path='/admin/scan' element={<AdminScan/>} />
          <Route exact path='/admin/scan/:username' element={<AdminScanUser/>} />
          <Route exact path='/admin/users/:username' element={<AdminUserEdit/>} />
          <Route exact path='/admin/users/:username/delete' element={<AdminUserDelete/>} />
          <Route exact path='/admin/users' element={<AdminUsers/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;