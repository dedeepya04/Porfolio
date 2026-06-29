import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from 'lucide-react';

const Education = () => {
    const educationData = [
        {
            id: 1,
            title: 'Bachelor of Engineering (B.E.)',
            branch: 'Computer Science and Engineering (AI & ML)',
            institution: 'Vasavi College of Engineering',
            location: 'Hyderabad, Telangana',
            duration: '2022 - 2026',
            scoreType: 'CGPA',
            scoreValue: '9.47 / 10',
            icon: GraduationCap,
            color: 'orange',
            details: 'Specializing in Artificial Intelligence and Machine Learning, studying core computer science curricula alongside advanced courses in deep learning, neural networks, and algorithmic design.'
        },
        {
            id: 2,
            title: 'Intermediate Board Education',
            branch: 'MPC (Maths, Physics, Chemistry)',
            institution: 'Narayana College',
            location: 'Ongole, Andhra Pradesh',
            duration: '2020 - 2022',
            scoreType: 'Percentage',
            scoreValue: '98%',
            icon: BookOpen,
            color: 'violet',
            details: 'Completed senior secondary education with a focus on mathematics, physics, and chemistry, graduating with top honors.'
        },
        {
            id: 3,
            title: 'Secondary School Certificate (SSC)',
            branch: 'General Education',
            institution: 'Montessori High School',
            location: 'Ongole, Andhra Pradesh',
            duration: '2020',
            scoreType: 'Percentage',
            scoreValue: '100%',
            icon: Award,
            color: 'orange',
            details: 'Completed secondary education with a perfect 100% academic record, establishing a strong academic foundation.'
        }
    ];

    return (
        <div className="education-timeline">
            {educationData.map((item) => {
                const IconComponent = item.icon;
                const accentColor = item.color === 'orange' ? 'var(--accent-orange)' : 'var(--accent-violet)';
                
                return (
                    <div key={item.id} className="education-item">
                        {/* Timeline Connector Line & Point */}
                        <div className="education-line-node">
                            <div className="education-node" style={{ borderColor: accentColor, boxShadow: `0 0 15px ${accentColor}40` }}>
                                <IconComponent size={18} style={{ color: accentColor }} />
                            </div>
                        </div>

                        {/* Education Card content */}
                        <div className="education-card glass-panel">
                            <div className="education-card-header">
                                <span className="education-duration">
                                    <Calendar size={14} />
                                    {item.duration}
                                </span>
                                <span className="education-score-pill" style={{ 
                                    background: item.color === 'orange' ? 'var(--accent-orange-glow)' : 'var(--accent-violet-glow)',
                                    border: `1px solid ${accentColor}40`,
                                    color: accentColor
                                }}>
                                    <Award size={14} />
                                    <span>{item.scoreType}: {item.scoreValue}</span>
                                </span>
                            </div>

                            <h3 className="education-card-title">{item.title}</h3>
                            {item.branch && <p className="education-card-branch">{item.branch}</p>}
                            <p className="education-card-details">{item.details}</p>

                            <div className="education-card-footer">
                                <span className="education-institution">{item.institution}</span>
                                <span className="education-location">
                                    <MapPin size={12} />
                                    {item.location}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Education;
