import React from 'react';
import NavBar from './NavBar';

const BookPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '0', margin: '0', height: '100vh' }}>
            <NavBar/>
            <h1 style={{ display: 'none' }}>Book Page</h1>

            <iframe src="https://yournaturaldispensary.acuityscheduling.com" width="100%" height="100%"></iframe>
            <script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>
        </div>
    );
};

export default BookPage;