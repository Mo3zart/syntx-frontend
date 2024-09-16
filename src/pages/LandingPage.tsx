import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const generateStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        const starStyle = {
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
        };
        stars.push(<div key={i} className="star" style={starStyle}></div>);
    }
    return stars;
};

const generateMeteorites = (count: number) => {
    const meteorites = [];
    for (let i = 0; i < count; i++) {
        const meteorStyle = {
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
        };
        meteorites.push(<div key={i} className="meteorite" style={meteorStyle}></div>);
    }
    return meteorites;
};

const LandingPage: React.FC = () => {
    // Always use the dark mode logo
    const logoSrc = '/assets/syntx-tp-logo-white.png';
    const navigate = useNavigate();

    return (
        <div className="landing-container dark-mode">
            {/* Stars and Meteorites */}
            <div className="stars-container">
                {generateStars(100)} {/* Generate 100 stars */}
            </div>
            <div className="meteorites-container">
                {generateMeteorites(5)} {/* Generate 5 meteorites */}
            </div>

            {/* Branding and Logo */}
            <div className="brand-header">
                <p className="branding-text">Publish with Power</p>
            </div>

            <div className="logo-container">
                <img src={logoSrc} alt="Syntx Logo" className="logo" />
            </div>

            <p className="catchphrase">The Future of Blogging</p>

            {/* Buttons */}
            <div className="button-container">
                <button onClick={() => navigate('/auth')} className="primary-btn">Sign Up</button>
                <button onClick={() => navigate('/auth')} className="secondary-btn">Log In</button>
            </div>
        </div>
    );
};

export default LandingPage;
