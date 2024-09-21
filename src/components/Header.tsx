import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Container, IconButton, Menu, MenuItem, Divider} from '@mui/material';
import {
    AccountBox as AccountBoxIcon,
    AccountCircle as AccountCircleIcon,
    Settings as SettingsIcon,
    ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Manage menu anchor
    const open = Boolean(anchorEl);
    const token = localStorage.getItem('access_token');  // Check if the user is logged in by looking for the JWT token

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Remove token to log out
        navigate('/auth');  // Redirect to the sign-in page
        handleMenuClose();
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the dropdown menu
    };

    return (
        <AppBar position="sticky" className="header" style={{ backgroundColor: 'rgb(78, 49, 170)' }}>
            {/* Container to limit the width and centralize content */}
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/* Wrap the Syntx text in a Link to the home/landing page */}
                    <Typography variant="h6" component="div" className="header-logo" sx={{ flexGrow: 1 }}>
                        <Link to="/" className="header-link">Syntx</Link>
                    </Typography>
                    <Link to="/" className="header-link">Home</Link>
                    <Link to="/" className="header-link">Feed</Link> {/*TODO: correct path*/}
                    <Link to="/" className="header-link">New Post</Link> {/*TODO: correct path*/}
                    {token ? (
                        <>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                color="inherit"
                                sx={{
                                    backgroundColor: '#915eff',
                                    borderRadius: '50%',
                                    padding: '8px',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#7a49d1',
                                    },
                                }}
                            >
                                <AccountBoxIcon fontSize="large" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                sx={{
                                    padding: '8px',
                                    borderRadius: '10px',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                    minWidth: '200px',
                                }}
                            >
                                {/* Profile */}
                                <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                                    <AccountCircleIcon fontSize="small" style={{ marginRight: '10px' }} />
                                    Profile
                                </MenuItem>

                                {/* Settings */}
                                <MenuItem onClick={handleMenuClose}>
                                    <SettingsIcon fontSize="small" style={{ marginRight: '10px' }} />
                                    Settings
                                </MenuItem>

                                {/* Divider */}
                                <Divider />

                                {/* Logout */}
                                <MenuItem onClick={handleLogout}>
                                    <ExitToAppIcon fontSize="small" style={{ marginRight: '10px' }} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link to="/auth" className="header-link">Sign In</Link>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
