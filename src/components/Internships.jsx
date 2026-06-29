import React from 'react';
import { Briefcase, Calendar, ChevronRight, BarChart3, Globe } from 'lucide-react';

const internshipsData = [
    {
        id: 1,
        role: 'Quant & Algo Intern',
        company: 'Futures First',
        duration: 'January 2026 - June 2026',
        theme: 'orange',
        icon: BarChart3,
        tags: ['Python', 'Multithreading', 'Low-Latency Systems', 'Selenium', 'Playwright', 'REST APIs'],
        bullets: [
            'Developed real-time market surveillance alerts and generated actionable trading signals from high-frequency streaming feeds for a user base of 200+ active traders.',
            'Engineered optimized multithreaded logic in Python to process over 10,000 market feeds per session, allowing prompt detection of sudden volatility and volume spikes.',
            'Automated complex data collection pipelines from multiple financial websites using Selenium, Playwright, and REST API calls, cutting down manual tracking workloads by 95%.'
        ]
    },
    {
        id: 2,
        role: 'Full Stack Developer',
        company: 'Neuxa Global',
        duration: 'May 2025 - October 2025',
        theme: 'violet',
        icon: Globe,
        tags: ['React.js', 'Figma', 'Node.js', 'MongoDB', 'Multer', 'UI/UX Design', 'Full-Stack'],
        bullets: [
            'Designed and engineered responsive user interfaces for the Seller Registration Platform using React.js to streamline user onboarding workflows.',
            'Crafted interactive high-fidelity UI/UX design wireframes and clickable prototypes using Figma, ensuring pixel-perfect transition to frontend code.',
            'Built robust API endpoints and server-side file management systems for a Dynamic Portfolio Management System using Node.js and MongoDB, integrating Multer to securely process and store user media uploads.'
        ]
    }
];

const Internships = () => {
    return (
        <div className="internships-container">
            <div className="timeline-spine"></div>
            {internshipsData.map((intern) => {
                const IconComponent = intern.icon;
                const isOrange = intern.theme === 'orange';
                const accentColor = isOrange ? 'var(--accent-orange)' : 'var(--accent-violet)';
                const glowShadow = isOrange ? 'var(--shadow-glow-orange)' : 'var(--shadow-glow-violet)';
                const pillBg = isOrange ? 'var(--accent-orange-glow)' : 'var(--accent-violet-glow)';

                return (
                    <div 
                        key={intern.id} 
                        className="internship-card-wrapper"
                        style={{ 
                            '--hover-glow': glowShadow,
                            '--card-accent': accentColor
                        }}
                    >
                        {/* Timeline node */}
                        <div className="timeline-icon-node">
                            <Briefcase size={18} style={{ color: accentColor }} />
                        </div>

                        {/* Experience Card */}
                        <div className="internship-card glass-panel">
                            <div className="internship-card-header">
                                <div className="role-company-wrapper">
                                    <div className="intern-icon-box" style={{ 
                                        background: pillBg,
                                        borderColor: `${accentColor}30`,
                                        color: accentColor
                                    }}>
                                        <IconComponent size={20} />
                                    </div>
                                    <div>
                                        <h3 className="intern-role">{intern.role}</h3>
                                        <h4 className="intern-company" style={{ color: accentColor }}>{intern.company}</h4>
                                    </div>
                                </div>
                                <div className="intern-duration">
                                    <Calendar size={14} className="calendar-icon" />
                                    <span>{intern.duration}</span>
                                </div>
                            </div>

                            <div className="intern-tags">
                                {intern.tags.map((tag, idx) => (
                                    <span 
                                        key={idx} 
                                        className="intern-tag"
                                        style={{ 
                                            background: pillBg, 
                                            borderColor: `${accentColor}20`,
                                            color: accentColor
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <ul className="intern-bullets">
                                {intern.bullets.map((bullet, idx) => (
                                    <li key={idx} className="intern-bullet-item">
                                        <ChevronRight size={14} className="bullet-arrow" style={{ color: accentColor }} />
                                        <p className="bullet-text">{bullet}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Internships;
