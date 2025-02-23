import React, { useEffect } from "react";

function Logout() {
    useEffect(() => {
        fetch("https://api.abyssara.tech/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
            console.log(data.error);
            } else {
            window.location.href = "/login";
            window.location.replace("/login");
            }
        });
    }, []);
    
    return <div>Logging out...</div>;
    }

export default Logout;