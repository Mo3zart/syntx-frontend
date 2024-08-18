// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

// Light theme colors
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(78, 49, 170)',  // Purple for Buttons, Links, Navbar
        },
        secondary: {
            main: 'rgb(55, 149, 189)',  // Secondary elements
        },
        background: {
            default: 'rgb(246, 248, 250)',  // Light grey background, like GitHub
            paper: 'rgb(255, 255, 255)',    // White background for cards, papers, etc.
        },
        text: {
            primary: 'rgb(36, 41, 46)',     // Dark grey text, similar to GitHub
            secondary: 'rgb(88, 96, 105)',  // Lighter grey for less emphasized text
        },
    },
    typography: {
        h1: {
            color: 'rgb(78, 49, 170)',     // Purple header color in light mode
        },
        h2: {
            color: 'rgb(78, 49, 170)',     // Purple header color in light mode
        },
        h3: {
            color: 'rgb(78, 49, 170)',     // Purple header color in light mode
        },
        h4: {
            color: 'rgb(78, 49, 170)',     // Purple header color in light mode
        },
        h5: {
            color: 'rgb(78, 49, 170)',     // Purple header color in light mode
        },
        h6: {
            color: 'rgb(78, 49, 170)',     // Purple header color in light mode
        },
        // Other heading styles...
    },
});

// Dark theme colors
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'rgb(78, 49, 170)',  // Purple navbar in dark mode
        },
        secondary: {
            main: 'rgb(55, 149, 189)',  // Secondary elements
        },
        background: {
            default: 'rgb(24, 27, 31)',  // Dark grey background, like GitHub's dark mode
            paper: 'rgb(32, 34, 37)',    // Slightly lighter grey for cards, papers, etc.
        },
        text: {
            primary: 'rgb(201, 209, 217)',  // Light grey text for readability
            secondary: 'rgb(139, 148, 158)',  // Less emphasized light grey text
        },
    },
    typography: {
        h1: {
            color: 'rgb(78, 49, 170)',   // Purple header color in dark mode
        },
        h2: {
            color: 'rgb(78, 49, 170)',   // Purple header color in dark mode
        },
        h3: {
            color: 'rgb(78, 49, 170)',   // Purple header color in dark mode
        },
        h4: {
            color: 'rgb(78, 49, 170)',   // Purple header color in dark mode
        },
        h5: {
            color: 'rgb(78, 49, 170)',   // Purple header color in dark mode
        },
        h6: {
            color: 'rgb(78, 49, 170)',   // Purple header color in dark mode
        },
        // Other heading styles...
    },
});
