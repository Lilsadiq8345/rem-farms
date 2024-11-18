import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '4rem', color: '#ff0000' }}>404</h1>
            <h2>The page you are looking for does not exist.</h2>
            <p>Please check the URL or go back to the homepage.</p>
            <Link to="/" style={{ fontSize: '1.5rem', color: '#007bff' }}>Go to Homepage</Link>
        </div>
    );
};

export default NotFound;
