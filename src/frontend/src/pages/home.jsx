import React from "react";

export default function Home() {
    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: -1, // Ensures the image stays behind other content
    };

    return (
        <>
        <link rel="stylesheet" href="src/static/index.css"/>
        <link href='https://fonts.googleapis.com/css?family=Merriweather' rel='stylesheet'/>
        <link href='https://fonts.googleapis.com/css?family=Golos Text' rel='stylesheet'/>
            <div>
                <img src="src/assets/images/main.png" alt="background image" style={backgroundStyle} />
                <div className="header-div" style={{ position: 'relative', zIndex: 1 }}> {/* Ensures content is above the background */}
                    <div >
                        <h1 className="header-h1">ECART</h1>
                        <h1 className="header-h1">Save</h1>
                        <h1 className="header-h1" >your money</h1>
                        <h1 className="header-h1" >and time</h1>
                    </div>
                </div>
            </div>
        </>
    );
}