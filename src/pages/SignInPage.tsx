// src/pages/SignInPage.tsx
import React, { useState } from 'react';
import { useThemeContext } from '../contexts/ThemeContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const SignInPage: React.FC = () => {
    const { theme } = useThemeContext();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign-in logic here
    };

    return (
        <Container style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: theme.palette.background.paper, p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom style={{ color: theme.palette.text.primary }}>
                    Sign In
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Sign In
                </Button>
            </Box>
        </Container>
    );
};

export default SignInPage;
