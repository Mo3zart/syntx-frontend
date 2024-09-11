// src/pages/AuthPage.tsx
import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';  // Import AuthContext
import { validateEmail, validateUsername, validatePassword } from '../utils/validation';
import { Container, TextField, Button, Typography, Box, Tabs, Tab, InputAdornment, IconButton, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa';

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
        const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${endpoint}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log('API response data:', data);  // Log the response

            if (response.ok && activeTab === 1) {
                // If signing up, immediately log the user in after success
                console.log('Sign-up successful, logging in...');

                // Perform login with the same credentials
                const loginResponse = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/signin`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username_or_email: email, password }),
                });

                const loginData = await loginResponse.json();

                // Ensure token exists in the login response
                if (loginResponse.ok && loginData.access_token) {
                    console.log('Token received after login, redirecting...', loginData.access_token);

                    // Store the token and authenticate
                    login(loginData.access_token);

                    // Redirect to the feed page
                    navigate('/feed');
                } else {
                    setErrorMessage(loginData.error || 'Login after sign-up failed. Please try signing in.');
                }
            } else if (response.ok && data.access_token) {
                // If login is successful
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

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        {activeTab === 0 ? 'Sign In' : 'Sign Up'}
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Or sign in with
                    </Typography>

                    {/* OAuth Buttons (No functionality yet) */}
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <Button variant="contained" fullWidth startIcon={<FaGoogle />}>
                                Google
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" fullWidth startIcon={<FaApple />}>
                                Apple
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" fullWidth startIcon={<FaGithub />}>
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
