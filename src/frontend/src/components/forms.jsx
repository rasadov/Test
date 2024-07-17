function RegisterForm() {

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRegisterForm();
    };


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" className="form-control"/>
            
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className="form-control"/>

            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" name="surname" className="form-control"/>

            <label htmlFor="phone">Phone number</label>
            <input type="text" id="phone" name="phone" className="form-control"/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control"/>

            <label htmlFor="confirm">Confirm password</label>
            <input type="password" id="confirm" name="confirm" className="form-control"/>

            <button type="submit">Register</button>
        </form>
    );
}

function validateRegisterForm() {
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if (password !== confirm) {
        alert('Passwords do not match');
        return false
    }

    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return false;
    }

    if (name.length < 3) {
        alert('Name must be at least 3 characters long');
        return false;
    }

    if (!username || !name || !surname || !phone || !password) {
        alert('Please fill in all fields');
        return false;
    }

    return true;
}

function sendRegisterForm() {
    if (!validateRegisterForm()) {
        return;
    }

    const data = {
        username: document.getElementById('username').value,
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
    };

    console.log(data);
    fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            window.location.href = '/profile';
        }
    });
}

function LoginForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        sendLoginForm();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" className="form-control"/>
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control"/>

            <button type="submit">Login</button>
        </form>
    );
}

function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return false;
    }

    return true;
}

function sendLoginForm() {
    if (!validateLoginForm()) {
        return;
    }

    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            window.location.href = '/profile';
        }
    });
}

export { RegisterForm, LoginForm };