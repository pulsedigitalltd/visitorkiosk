import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AppPage from './components/AppPage';
import BookPage from './components/BookPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/book" element={<BookPage />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
