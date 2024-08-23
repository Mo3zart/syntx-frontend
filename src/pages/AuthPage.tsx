import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { validateEmail, validateUsername, validatePassword } from '../utils/validation';
import { Container, TextField, Button, Typography, Box, Tabs, Tab, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab === 1 && password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (emailError || usernameError || passwordError) {
            alert('Please fix the errors before submitting.');
            return;
        }
        // Handle sign-in or sign-up logic here
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
                        {showPasswordTooltip && !(
                            passwordRequirements.minLength &&
                            passwordRequirements.hasUppercase &&
                            passwordRequirements.hasLowercase &&
                            passwordRequirements.hasNumber &&
                            passwordRequirements.hasSpecialChar
                        ) && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 'calc(100% + 5px)',
                                    left: 0,
                                    backgroundColor: theme.palette.background.paper,
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                    padding: 2,
                                    borderRadius: 2,
                                    zIndex: 2, // Ensure this is higher than other elements
                                    width: '300px',
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                                    Password Requirements:
                                </Typography>
                                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                                    - At least 8 characters long<br />
                                    - At least one uppercase letter<br />
                                    - At least one lowercase letter<br />
                                    - At least one number<br />
                                    - At least one special character (!@#$%^&*-)
                                </Typography>
                            </Box>
                        )}
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
                </Box>
            </Box>
        </Container>
    );
};

export default AuthPage;
