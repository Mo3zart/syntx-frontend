// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header: React.FC = () => {
    const { toggleTheme, isDarkMode } = useThemeContext();
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');  // Check if the user is logged in by looking for the JWT token

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Remove token to log out
        navigate('/auth');  // Redirect to the sign-in page
    };

    return (
        <AppBar
            position="sticky"
            style={{
                backgroundColor: isDarkMode ? 'rgb(78, 49, 170)' : 'rgb(78, 49, 170)',
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontFamily: 'Julius Sans One, sans-serif', color: isDarkMode ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)' }}
                >
                    TextTales
                </Typography>
                <Link to="/" style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit' }}>
                    Home
                </Link>
                {token ? (
                    <>
                        <Button
                            style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit' }}
                            onClick={() => navigate('/profile')}
                        >
                            Profile
                        </Button>
                        <Button
                            style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link to="/auth" style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit' }}>
                        Sign In
                    </Link>
                )}
                <IconButton onClick={toggleTheme} color="inherit">
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
