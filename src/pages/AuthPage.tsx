import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { validateEmail, validateUsername, validatePassword } from '../utils/validation';
import { Container, TextField, Button, Typography, Box, Tabs, Tab, InputAdornment, IconButton, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa';
import './AuthPage.css'; // Import the custom styles

const AuthPage: React.FC = () => {
    const { theme } = useThemeContext();
    const { login } = useAuthContext();  // Use login function from context
    const [activeTab, setActiveTab] = useState(0);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false); // Track if password has been interacted with
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // For displaying errors

    const navigate = useNavigate();

    useEffect(() => {
        if (passwordTouched) {
            const { error } = validatePassword(password);
            setPasswordError(error);
        }
    }, [password, passwordTouched]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessage(null);

        // If signing up, check if passwords match
        if (activeTab === 1 && password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // If there are validation errors, don't proceed
        if (emailError || usernameError || passwordError) {
            setErrorMessage('Please fix the errors before submitting.');
            return;
        }

        const endpoint = activeTab === 0 ? 'signin' : 'signup';
        const payload = activeTab === 0 ? { username_or_email: email, password } : { username, email, password };
        const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL_AUTH}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                // Set error message from backend if exists, otherwise a default error message
                setErrorMessage(data.message || 'Authentication failed. Please try again.');
                return;
            }

            // If signup or login is successful and token is returned
            if (response.ok && data.access_token) {
                console.log('Token received, logging in and redirecting...', data.access_token);

                // Call login to store the token and update isAuthenticated
                login(data.access_token);

                // Redirect to the feed page
                navigate('/feed');
            } else {
                setErrorMessage(data.error || 'Authentication failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
            console.error('Sign-in/Sign-up failed: ', error);
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    padding: 4,
                    borderRadius: 2,
                    width: '100%',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered>
                    <Tab label="Sign In" />
                    <Tab label="Sign Up" />
                </Tabs>

                {/* Display error message if any */}
                {errorMessage && (
                    <Typography color="error" align="center" sx={{ marginTop: 2 }}>
                        {errorMessage}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    {activeTab === 1 && (
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError(validateUsername(e.target.value));
                            }}
                            error={Boolean(usernameError)}
                            helperText={usernameError}
                            required
                        />
                    )}

                    <TextField
                        label={activeTab === 0 ? "Email or Username" : "Email"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (activeTab === 1) setEmailError(validateEmail(e.target.value));
                        }}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        required
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setPasswordTouched(true)}  // Mark as touched on blur
                        error={passwordTouched && Boolean(passwordError)}  // Show error only after touched
                        helperText={passwordTouched && passwordError}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {activeTab === 1 && (
                        <TextField
                            label="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    )}

                    <Button type="submit" className="auth-button" fullWidth sx={{border: '2px solid #915eff !important',}}>
                        {activeTab === 0 ? 'Log In' : 'Sign Up'}
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        {activeTab === 0 ? 'Log In with' : 'Sign Up with'}
                    </Typography>

                    {/* OAuth Buttons */}
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <Button className="oauth-button" fullWidth sx={{border: '2px solid #915eff !important',}} startIcon={<FaGoogle />}>
                                Google
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className="oauth-button" fullWidth sx={{border: '2px solid #915eff !important',}} startIcon={<FaApple />}>
                                Apple
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className="oauth-button" fullWidth
                                    sx={{border: '2px solid #915eff !important',}}
                                    startIcon={<FaGithub />}>
                                GitHub
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default AuthPage;
