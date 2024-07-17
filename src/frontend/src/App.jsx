import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home.jsx';
import Login from './pages/signin.jsx';
import Register from './pages/singup.jsx';
import Profile from './pages/profile.jsx';
import {Admin, AdminScan, AdminScanUser} from './pages/admin.jsx';
import NotFound from './pages/notFound.jsx';
import Logout from './pages/logout.jsx';

function App() {
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
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;