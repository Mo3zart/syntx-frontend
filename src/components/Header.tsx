// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useAuthContext } from '../contexts/AuthContext';  // Import AuthContext
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header: React.FC = () => {
    const { toggleTheme, isDarkMode } = useThemeContext();
    const { isAuthenticated, logout } = useAuthContext();  // Use AuthContext to check auth state
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // Call logout from AuthContext
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
                    sx={{ flexGrow: 1, fontFamily: 'Julius Sans One, sans-serif', color: 'rgb(255, 255, 255)' }}
                >
                    TextTales
                </Typography>
                <Link to="/" style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit' }}>
                    Home
                </Link>
                {isAuthenticated ? (  // Check if authenticated instead of checking localStorage
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
