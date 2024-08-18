import React, { useState, useEffect } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { validateEmail, validateUsername, validatePassword } from '../utils/validation';
import { Container, TextField, Button, Typography, Box, Tabs, Tab, InputAdornment, IconButton, List, ListItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

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
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                    {activeTab === 0 ? 'Sign In' : 'Sign Up'}
                </Typography>
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
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError(validateUsername(e.target.value));
                            }}
                            error={Boolean(usernameError)}
                            helperText={usernameError || 'Username must be at least 3 characters long.'}
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
                            if (activeTab === 1) setEmailError(validateEmail(e.target.value));  // Only validate email on Sign Up
                        }}
                        error={Boolean(emailError)}
                        helperText={emailError || (activeTab === 1 ? 'Please enter a valid email address like user@example.com' : null)}
                        required
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        error={Boolean(passwordError)}
                        helperText={passwordError || 'Password must meet the requirements below.'}
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
                    {activeTab === 1 && (
                        <>
                            <List dense sx={{ paddingLeft: 2 }}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            checked={passwordRequirements.minLength}
                                            disabled
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="At least 8 characters long" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            checked={passwordRequirements.hasUppercase}
                                            disabled
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="At least one uppercase letter" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            checked={passwordRequirements.hasLowercase}
                                            disabled
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="At least one lowercase letter" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            checked={passwordRequirements.hasNumber}
                                            disabled
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="At least one number" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                            checked={passwordRequirements.hasSpecialChar}
                                            disabled
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="At least one special character (!@#$%^&*)" />
                                </ListItem>
                            </List>
                        </>
                    )}
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
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        {activeTab === 0 ? 'Sign In' : 'Sign Up'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AuthPage;
