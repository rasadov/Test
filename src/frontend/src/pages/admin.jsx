import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Admin() {
    return (
        <div>
            <h1>Admin</h1>
        </div>
    );
}

function AdminScan() {
    const username = useParams().username;
    console.log(username);

    const handleSubmit = (event) => {
        event.preventDefault();
        sendScanForm();
    }

    const [data, setData] = useState({});

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
                    setData(data);
                }
            });
    }, []);

    console.log(data);

    return (
        <div>
            <h1>Admin Scan</h1>
            <form onSubmit={handleSubmit}>
                <h2>User "{data.user} currently has {data.ecart} bonuses"</h2>
                <button>Gift a bonus to user </button>
            </form>
        </div>
    );
}

function sendScanForm() {

    const data = {
        username: document.getElementById('username').value,
    };

    fetch('http://localhost:5000/admin/scan/', {
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
                console.log(data);
            }
        });
}

export { Admin, AdminScan };