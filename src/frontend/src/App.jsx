import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home.jsx';
import Login from './pages/signin.jsx';
import Register from './pages/register.jsx';
import Profile from './pages/profile.jsx';
import Admin from './pages/admin.jsx';
import NotFound from './pages/notFound.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/profile' element={<Profile/>} />
          <Route exact path='/admin' element={<Admin/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;