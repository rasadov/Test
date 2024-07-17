import React from 'react';
import { RegisterForm } from '../components/forms.jsx';

function Register() {
  document.title = 'Register';

  return (
    <div>
      <div style={{textAlign: "center"}}>
      <h1>Register</h1>
      </div>
      <RegisterForm />
    </div>
  );
}

export default Register;