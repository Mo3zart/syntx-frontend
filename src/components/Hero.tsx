// src/components/Hero.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';

const Hero: React.FC = () => {
    const { theme } = useThemeContext();

    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
            }}
        >
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: theme.typography.h1.color }}>
                Share Your Thoughts in TextTales
            </h2>
            <p
                style={{
                    fontSize: '1.5rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    maxWidth: '600px',
                }}
            >
                TextTales is the simplest way to create, manage, and share your blog posts. With full Markdown support, you can write in a way that feels natural and intuitive.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                <Link to="/signup" style={{ marginBottom: '1rem', textDecoration: 'none' }}>
                    <button
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            backgroundColor: theme.palette.primary.main,
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: theme.palette.text.primary,
                        }}
                    >
                        Don't have an account? Create one
                    </button>
                </Link>
                <Link to="/signin" style={{ textDecoration: 'none' }}>
                    <button
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            backgroundColor: 'transparent',
                            border: `2px solid ${theme.palette.primary.main}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: theme.palette.primary.main,
                        }}
                    >
                        Already have an account? Sign In
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
