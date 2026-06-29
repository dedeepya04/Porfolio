import React from 'react';
import { Award, Award as CertificateIcon, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

const certificationsData = [
    {
        id: 1,
        title: 'NPTEL Elite Gold Certificate',
        course: 'Programming in Java',
        issuer: 'NPTEL',
        badge: 'Top 5% Candidate',
        desc: 'Successfully completed the advanced Programming in Java course, achieving elite status and securing a rank in the top 5% of all candidates nationwide.',
        color: 'orange',
        icon: Award
    },
    {
        id: 2,
        title: 'Oracle Certified Associate',
        course: 'MySQL Database Administration',
        issuer: 'Oracle University',
        badge: 'Oracle Certified',
        desc: 'Earned professional database credential from Oracle University, verifying expertise in relational database design, query optimization, and server configuration.',
        color: 'violet',
        icon: ShieldCheck
    },
    {
        id: 3,
        title: 'Certificate of Merit',
        course: 'Academic Excellence (CSE)',
        issuer: 'Vasavi College of Engineering',
        badge: 'Highest CGPA',
        desc: 'Awarded the prestigious Certificate of Merit for academic distinction, securing the highest Cumulative Grade Point Average (CGPA) in the department.',
        color: 'orange',
        icon: CertificateIcon
    }
];

const Certifications = () => {
    return (
        <div className="certifications-grid">
            {certificationsData.map((cert) => {
                const IconComponent = cert.icon;
                const isOrange = cert.color === 'orange';
                const accentColor = isOrange ? 'var(--accent-orange)' : 'var(--accent-violet)';
                const glowShadow = isOrange ? 'var(--shadow-glow-orange)' : 'var(--shadow-glow-violet)';
                const pillBg = isOrange ? 'var(--accent-orange-glow)' : 'var(--accent-violet-glow)';

                return (
                    <div
                        key={cert.id}
                        className="certification-card glass-panel"
                        style={{
                            '--hover-glow': glowShadow,
                            '--card-accent': accentColor
                        }}
                    >
                        <div className="cert-card-header">
                            <div className="cert-icon-container" style={{
                                background: pillBg,
                                borderColor: `${accentColor}30`,
                                color: accentColor
                            }}>
                                <IconComponent size={22} />
                            </div>
                            <span
                                className="cert-badge"
                                style={{
                                    background: pillBg,
                                    borderColor: `${accentColor}20`,
                                    color: accentColor
                                }}
                            >
                                {cert.badge}
                            </span>
                        </div>

                        <div className="cert-body">
                            <h4 className="cert-title">{cert.title}</h4>
                            <p className="cert-course">{cert.course}</p>
                            <p className="cert-issuer">{cert.issuer}</p>
                            <p className="cert-desc">{cert.desc}</p>
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default Certifications;
