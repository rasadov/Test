import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Admin() {
    return (
        <div>
            <h1>Admin</h1>
        </div>
    );
}

function AdminScanUser() {
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
                    capture="environment" // Use "user" for front camera on supported devices
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

        // Replace 'your-server-endpoint' with the actual endpoint where you're sending the file
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


export { Admin, AdminScan, AdminScanUser };