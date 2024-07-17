import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Admin() {

    document.title = 'Admin';

    return (
        <div style={{textAlign: "center"}}>
            <h1>Admin</h1>
            <p>Welcome to admin dashboard!</p>
            <p>Please select where would you like to continue.</p>
            <div>
                <a href="/admin/scan" className="btn btn-primary my-3">Scan QR code</a>
            </div>
            <div>
                <a href="/admin/users" className="btn btn-primary my-3">Manage users</a>
            </div>
        </div>
    );
}

function AdminScanUser() {

    document.title = 'Scan User';

    const username = useParams().username;
    console.log(username);

    const handleSubmit = (event) => {
        event.preventDefault();
        giftBonus(username);
    }

    const [response, setResponse] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/admin/scan/' + username, {
            method: 'GET',
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
                    console.log(data);
                    setResponse(data);
                }
            });
    }, []);

    const user = response.user;
    const ecart = response.ecart;

    return (
        <div>
            <h1>Admin Scan</h1>
            <form onSubmit={handleSubmit}>
            <p id='user-info'>User "{user?.username}" currently has {ecart?.bonus} bonuses</p>
            <button>Gift a bonus to user </button>
            </form>
        </div>
    );
}

function giftBonus(username) {
    console.log('Gift bonus');

    fetch('http://localhost:5000/admin/scan/'+username, {
        method: 'POST',
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
                document.getElementById('user-info').innerText = "User " + data.user.username + " now has " + data.ecart.bonus + " bonuses";
            }
        });
}

function AdminScan() {
    document.title = 'Scan';

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendPhoto();
    };

    return (
        <div>
            <h1>Admin Scan</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                />
                <button type='submit'>Scan</button>
            </form>
            {imagePreviewUrl && <img src={imagePreviewUrl} style={{maxHeight: '300px', maxWidth: '300px'}} alt="Preview" />}
        </div>
    );
}

function sendPhoto() {
    const fileInput = document.getElementById('photo-upload');
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        fetch('http://localhost:5000/admin/scan', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = data.decoded_str;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        console.log('No file selected.');
    }
}

function AdminUsers() {
    document.title = 'Manage Users';

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/admin/users', {
            method: 'GET',
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
                    setUsers(data.users);
                    setTotalUsers(data.total);
                }
            });
    })

    const userRows = [];

    for (let i = 0; i < users.length; i += 4) {
        const row = users.slice(i, i + 4);
        userRows.push(row);
    }

    return (
        <>
        <div>
        <div style={{textAlign: "center"}}>
            <h1>Admin Users</h1>
            <p>Total users: {totalUsers}</p>
        </div>
        <div className="container">
            {userRows.map((row, index) => (
                <div className="row" key={index} style={{display: "flex", justifyContent: "center"}}>
                    {row.map((user, index) => (
                        <div className="col" key={index} style={{width: "24%", textAlign: "center"}}>
                            <div className="card">
                                <div className="card-body">
                                <h5 className="card-title">{user.name} {user.surname}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{user.username}</h6>
                                <p className="card-text">Phone: {user.phone}</p>
                                <p className="card-text">Bonuses: {user.bonuses}</p>
                                <a href={"/admin/users/" + user.username} className="card-link">
                                    <button className='btn btn-primary'>
                                        Edit
                                    </button>
                                 </a>
                                <a href={`/admin/users/${user.username}/delete`} className="card-link"> 
                                    <button className='btn btn-danger'>
                                        Delete
                                    </button>
                                </a>                                
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

        </div>
        </div>
        </>
    );
}

function AdminUserDelete() {
    document.title = 'Delete User';

    const { username } = useParams();

    const submitDeleteUser = (event) => {
        event.preventDefault();
        deleteUser(username);
    }

    return (
        <div style={{textAlign: "center"}}>
            <h1>Admin User Delete</h1>
            <p>Are you sure you want to delete this user?</p>
            <button onClick={submitDeleteUser} className="btn btn-danger">Delete</button>
        </div>
    );
}

function deleteUser(username) {
    fetch('http://localhost:5000/admin/users/' + username, {
        method: 'DELETE',
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
                console.log(data);
                window.location.href = '/admin/users';
            }
        });
}

function AdminUserEdit() {
    document.title = 'Edit User';
    
    const { username } = useParams();
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        username: '',
        phone: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/admin/users/${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                console.log(data);
                console.log(data.name);
                setUserData({
                    name: data.name,
                    surname: data.surname,
                    username: data.username,
                    phone: data.phone
                });
            }
        })
        .catch(error => {
            setError(error.message);
        });
    }, [username]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const sendUserEditForm = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:5000/admin/users/${username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(userData)
        })
        console.log(userData);
    };

    return (
        <>
        <div className="card-container">
            <div className="card">
                <form onSubmit={sendUserEditForm}>
                    <h1>Admin User Edit</h1>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={userData.name} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" className="form-control" id="surname" value={userData.surname} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" value={userData.username} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className="form-control" id="phone" value={userData.phone} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        <link rel="stylesheet" href="src/static/admin_edit.css" />
        </>
    );
}

function sendUserEditForm() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;

    fetch('http://localhost:5000/admin/users/' + username, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            name: name,
            surname: surname,
            phone: phone
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                window.location.href = '/admin/users';
            }
        });
}

export { Admin, AdminScan, AdminScanUser, AdminUsers, AdminUserDelete, AdminUserEdit };