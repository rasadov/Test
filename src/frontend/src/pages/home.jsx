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
                        <h1 className="header-h1">ПРЕВРАТИТЕ</h1>
                        <h1 className="header-h1">УЕЗДНОЙ ГОРОД</h1>
                        <h1 className="header-h1" style={{marginLeft: "70px"}}>В СТОЛИЦУ</h1>
                        <h1 className="header-h1" style={{marginLeft: "30px"}}>ЗЕМНОГО ШАРА!</h1>
                    </div>
                    <div>
                    <p>
                        Оплатите взнос на телеграммы для организации
                        Международного васюкинского турнира по шахматам
                     </p>
                    </div>
                </div>
            </div>
        </>
    );
}