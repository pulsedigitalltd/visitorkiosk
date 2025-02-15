import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import KioskPage from './pages/KioskPage';
import BookPage from './pages/BookPage';

const App = () => {
    return (
        <Router  >
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<KioskPage />} />
                <Route path="/book" element={<BookPage />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
