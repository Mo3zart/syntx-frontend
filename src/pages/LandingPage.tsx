import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    // Always use the dark mode logo
    const logoSrc = '/assets/syntx-tp-logo-white.png';

    return (
        <div className="landing-container dark-mode">
            <div className="brand-header">
                <p className="branding-text">Publish with Power</p>
            </div>

            <div className="logo-container">
                <img src={logoSrc} alt="Syntx Logo" className="logo" />
            </div>

            <p className="author-name">The Future of Blogging</p>

            <div className="button-container">
                <button className="primary-btn">Sign Up</button>
                <button className="secondary-btn">Log In</button>
            </div>
        </div>
    );
};

export default LandingPage;
