// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/fonts.css';
import './styles/global.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // Wrap with AuthProvider

const container = document.getElementById('root');
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </React.StrictMode>
    );
}
