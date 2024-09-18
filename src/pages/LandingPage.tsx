import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer"; // Social Icons

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
    const logoSrcWhite = '/assets/syntx-tp-logo-white.png';
    const navigate = useNavigate();

    return (
        <div className="landing-container dark-mode">
            {/* Stars and Meteorites */}
            <div className="stars-container">
                {generateStars(150)} {/* More stars */}
            </div>
            <div className="meteorites-container">
                {generateMeteorites(7)} {/* Meteorites */}
            </div>

            {/* Branding and Logo */}
            <div className="brand-header">
                <p className="branding-text">Publish with Power</p>
            </div>

            <div className="logo-container">
                <img src={logoSrcWhite} alt="Syntx Logo" className="logo" />
            </div>

            <p className="catchphrase">The Future of Blogging</p>

            {/* Buttons */}
            <div className="button-container">
                <button onClick={() => navigate('/auth')} className="primary-btn">Sign Up</button>
                <button onClick={() => navigate('/auth')} className="secondary-btn">Log In</button>
            </div>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose Syntx?</h2>
                <div className="features-container">
                    <div className="feature-card">
                        <h3 className="feature-title">Easy Content Creation</h3>
                        <p className="feature-description">
                            Create, edit, and publish blogs with an intuitive and user-friendly interface.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3 className="feature-title">Seamless Sharing</h3>
                        <p className="feature-description">
                            Share your blogs easily across platforms with built-in social sharing tools.
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3 className="feature-title">Fast & Secure</h3>
                        <p className="feature-description">
                            Experience fast load times and security features designed to keep your content safe.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default LandingPage;
