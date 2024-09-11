// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext<any>(null);

export const useAuthContext = () => useContext(AuthContext);

// AuthContext Provider to wrap the app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for token in localStorage when the app loads
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Function to login and store token
    const login = (token: string) => {
        localStorage.setItem('access_token', token);
        setIsAuthenticated(true);  // Update state
    };

    // Function to logout and remove token
    const logout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);  // Update state
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
