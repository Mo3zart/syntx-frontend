// src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <Hero />
            <Features />
        </div>
    );
};

export default HomePage;
