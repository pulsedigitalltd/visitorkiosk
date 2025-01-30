import React from 'react';
import NavBar from './NavBar';

const BookPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '0', margin: '0', height: '100vh' }}>
            <NavBar/>
            <h1 style={{ display: 'none' }}>Book Page</h1>

            <iframe src="https://bookings.gettimely.com/yournaturaldispensary2/book?uri=https%3A%2F%2Fbook.gettimely.com%2FBooking%2FLocation%2F270666%3Fmobile%3DTrue%26params%3D%25253fclient-login%25253dtrue" width="100%" height="100%"></iframe>
        </div>
    );
};

export default BookPage;