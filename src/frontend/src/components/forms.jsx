function RegisterForm() {

    const handleSubmit = (event) => {
        event.preventDefault();
        sendRegisterForm();
    };


    return (
<div className="d-flex justify-content-center align-items-center">
  <div className="card my-5" style={{ width: "30rem" }}>
    <div className="card-body">
      <form onSubmit={handleSubmit} className="p-3">
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className="form-control"/>
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="form-control"/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="surname">Surname</label>
          <input type="text" id="surname" name="surname" className="form-control"/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone">Phone number</label>
          <input type="text" id="phone" name="phone" className="form-control"/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control"/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="confirm">Confirm password</label>
          <input type="password" id="confirm" name="confirm" className="form-control"/>
        </div>

        <button type="submit" className="btn btn-primary mt-4" style={{width: "100%"}}>Register</button>
      </form>
    </div>
  </div>
</div>
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
        <div className="d-flex justify-content-center align-items-center" >
        <div className="card my-5" style={{ width: "30rem", textAlign: "center" }}>
            <div className="card-body">
            <form onSubmit={handleSubmit} className="p-3">
                <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" className="form-control"/>
                </div>
                
                <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" className="form-control"/>
                </div>

                <button type="submit" className="btn btn-primary mt-4" style={{width: "100%"}}>Login</button>
            </form>
            </div>
        </div>
        </div>
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