// src/components/Features.tsx
import React from 'react';
import { useThemeContext } from '../contexts/ThemeContext';

const Features: React.FC = () => {
    const { theme } = useThemeContext();

    const features = [
        { title: "Markdown Support", description: "Write posts using the intuitive Markdown syntax.", icon: "📝" },
        { title: "Organize with Tags", description: "Easily categorize your posts with tags.", icon: "🏷️" },
        { title: "Engage with Comments", description: "Allow readers to comment and discuss your posts.", icon: "💬" },
    ];

    return (
        <section style={{ padding: '2rem', backgroundColor: theme.palette.background.default }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {features.map((feature, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', color: theme.palette.text.primary }}>
                        <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{feature.icon}</span>
                        <div>
                            <h3 style={{ margin: 0, color: theme.palette.primary.main }}>{feature.title}</h3>
                            <p style={{ margin: 0 }}>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
