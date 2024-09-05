import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { validateEmail, validateUsername, validatePassword } from '../utils/validation';
import { Container, TextField, Button, Typography, Box, Tabs, Tab, InputAdornment, IconButton, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Icons for OAuth Providers
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa';

const AuthPage: React.FC = () => {
    const { theme } = useThemeContext();
    const [activeTab, setActiveTab] = useState(0);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });
    const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const {
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecialChar,
            error,
        } = validatePassword(password);

        setPasswordRequirements({
            minLength,
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecialChar,
        });

        setPasswordError(error);
    }, [password]);

    const handleUsernameFocus = () => {
        setUsernameTouched(true);
    };

    const handleEmailFocus = () => {
        setEmailTouched(true);
    };

    const handlePasswordFocus = () => {
        setShowPasswordTooltip(true);
        setPasswordTouched(true);
    };

    const handlePasswordBlur = () => {
        setShowPasswordTooltip(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab === 1 && password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (emailError || usernameError || passwordError) {
            alert('Please fix the errors before submitting.');
            return;
        }

        const endpoint = activeTab === 0 ? 'signin' : 'signup';
        const url = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${endpoint}`;
        const payload = activeTab === 0
            ? { username_or_email: email, password }
            : { username, email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Optionally store JWT token to localStorage or handle navigation
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                }
            } else {
                alert(data.error || 'Error occurred');
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert('Something went wrong. Please try again.');
        }
    };

    // const handleOAuthSignIn = (provider: string) => {
    //     // Redirect user to OAuth provider (e.g., Google, GitHub, Apple)
    //     window.location.href = `/auth/${provider}`;
    // };

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
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    color: theme.palette.text.primary,
                }}
            >
                <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ marginBottom: 4 }}>
                    <Tab label="Sign In" sx={{ color: theme.palette.primary.main }} />
                    <Tab label="Sign Up" sx={{ color: theme.palette.primary.main }} />
                </Tabs>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    {activeTab === 1 && (
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onFocus={handleUsernameFocus}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError(validateUsername(e.target.value));
                            }}
                            error={usernameTouched && Boolean(usernameError)}
                            helperText={usernameTouched && (usernameError || 'Username is valid!')}
                            required
                        />
                    )}
                    <TextField
                        label={activeTab === 0 ? "Email or Username" : "Email"}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onFocus={handleEmailFocus}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (activeTab === 1) setEmailError(validateEmail(e.target.value));  // Only validate email on Sign Up
                        }}
                        error={emailTouched && Boolean(emailError)}
                        helperText={emailTouched && (emailError || (activeTab === 1 ? 'Email is valid!' : null))}
                        required
                    />
                    <Box sx={{ position: 'relative', marginBottom: 1 }}>
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            error={passwordTouched && Boolean(passwordError)}
                            helperText={passwordTouched && (passwordError || (passwordRequirements.minLength && passwordRequirements.hasUppercase && passwordRequirements.hasLowercase && passwordRequirements.hasNumber && passwordRequirements.hasSpecialChar ? 'Password meets all requirements!' : 'Password must meet the requirements below.'))}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {activeTab === 1 && (
                        <TextField
                            label="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            margin="dense" // Use "dense" margin to reduce the space
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    )}

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        {activeTab === 0 ? 'Sign In' : 'Sign Up'}
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Or sign in with
                    </Typography>

                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`}
                                startIcon={<FaGoogle />}
                            >
                                Sign in with Google
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/apple`}
                                startIcon={<FaApple />}
                            >
                                Sign in with Apple
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/GitHub`}
                                startIcon={<FaGithub />}
                            >
                                Sign in with GitHub
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default AuthPage;
