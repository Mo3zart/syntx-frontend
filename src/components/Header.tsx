import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './Header.css';  // Keep the custom CSS

const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');  // Check if the user is logged in by looking for the JWT token

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Remove token to log out
        navigate('/auth');  // Redirect to the sign-in page
    };

    return (
        <AppBar position="sticky" style={{ backgroundColor: 'rgb(78, 49, 170)' }}>
            <Toolbar>
                {/* Wrap the Syntx text in a Link to the home/landing page */}
                <Typography variant="h6" component="div" className="header-logo" sx={{ flexGrow: 1 }}>
                    <Link to="/" className="header-link">Syntx</Link>
                </Typography>
                <Link to="/" className="header-link">Home</Link>
                {token ? (
                    <>
                        <Button className="header-link" onClick={() => navigate('/profile')}>
                            Profile
                        </Button>
                        <Button className="header-link" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link to="/auth" className="header-link">Sign In</Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
