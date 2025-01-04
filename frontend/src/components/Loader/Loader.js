import React, { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        'Now Loading',
        'Now Loading.',
        'Now Loading..',
        'Now Loading...'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 500);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div className="loadercontainer">
            <div className="loader"></div>
            <p id="message-1">{messages[messageIndex]}</p>
        </div>
    );
};

export default Loader;
