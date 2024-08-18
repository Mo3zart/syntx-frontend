// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage'; // Import the new AuthPage
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />} /> {/* Add this route */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
