// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header: React.FC = () => {
    const { toggleTheme, isDarkMode } = useThemeContext();

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
                <IconButton onClick={toggleTheme} color="inherit">
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
