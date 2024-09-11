// src/pages/HomePage.tsx
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Hero/>
            <Features/>
            <button onClick={() => navigate('/feed')}>Go to Feed</button>
        </div>
    );
};

export default HomePage;
