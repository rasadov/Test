import React from "react";

export default function NotFound() {
    document.title = "404 Not Found";
    return (
        <div>
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}