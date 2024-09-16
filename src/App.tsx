// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuthContext } from './contexts/AuthContext'; // Import AuthContext
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import UserProfilePage from './pages/UserProfilePage';
import Navbar from './components/Header';
// import HomePage from './pages/HomePage';
import LandingPage from "./pages/LandingPage";

const App: React.FC = () => {
    const { isAuthenticated } = useAuthContext();  // Get isAuthenticated from context

    return (
        <ThemeProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/feed" element={isAuthenticated ? <FeedPage /> : <Navigate to="/auth" />} />
                    <Route path="/profile" element={isAuthenticated ? <UserProfilePage /> : <Navigate to="/auth" />} />
                    <Route path="/auth" element={isAuthenticated ? <Navigate to="/feed" /> : <AuthPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

// Wrap App component in AuthProvider in main.tsx
export default App;
