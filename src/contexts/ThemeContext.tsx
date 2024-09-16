import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Theme } from '@mui/system';

const ThemeContext = createContext({
    isDarkMode: true, // Set default to dark mode
    theme: {} as Theme,
});

export const useThemeContext = () => useContext(ThemeContext);

// Remove lightTheme and only keep darkTheme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#915eff',  // Dark mode primary color
        },
        background: {
            default: '#121212',  // Dark background
            paper: '#1d1d1d',    // Paper background for cards, etc.
        },
        text: {
            primary: '#ffffff',  // White text on dark background
            secondary: '#bbbbbb', // Slightly lighter text for secondary elements
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",  // Default font for text fields, labels, etc.
        button: {
            fontFamily: "'Bandal', sans-serif",  // Use Bandal font for buttons
            fontSize: '1rem',
            color: '#ffffff',  // Ensure white text for buttons
        },
    },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useMemo(() => darkTheme, []); // Always use darkTheme

    return (
        <ThemeContext.Provider value={{ isDarkMode: true, theme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
