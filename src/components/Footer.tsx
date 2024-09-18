import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'; // Social Icons

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-brand">
                    <img src="/assets/syntx-tp-logo-white.png" alt="Syntx Logo" className="footer-logo" />
                    <span className="footer-logo-text">Syntx</span> {/* Updated class for footer text */}
                </div>

                <ul className="footer-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#privacy-policy">Privacy Policy</a></li>
                    <li><a href="#licensing">Licensing</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <div className="footer-socials">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaGithub />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaTwitter />
                    </a>
                </div>
            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Syntx™</p>
            </div>
        </footer>
    );
};

export default Footer;
