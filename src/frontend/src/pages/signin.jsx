import React from 'react';
import { LoginForm } from '../components/forms.jsx';

function Login() {
    document.title = 'Login';

    return (
        <>
        <div style={{textAlign: "center"}}>
            <h1>Login</h1>
        </div>
        <LoginForm />
        </>
    );
}

export default Login;