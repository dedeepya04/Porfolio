import React from 'react';
import { Users, Trophy, Cloud, HeartHandshake, ArrowUpRight, BrainCircuit, Brush, BookOpen, GraduationCap } from 'lucide-react';

const activitiesCategories = [
    {
        id: 'clubs',
        title: 'Club Memberships',
        icon: Users,
        theme: 'orange',
        items: [
            {
                name: 'Toastmasters Club',
                role: 'Active Member',
                tag: 'Communication & Leadership',
                desc: 'Participating in public speaking tracks, developing professional communication skills, speech structure, and feedback methodologies.',
                detailIcon: Users
            },
            {
                name: 'Alankrita Club',
                role: 'Active Member',
                tag: 'Arts & Creative Design',
                desc: 'Engaging in campus creative initiatives, artistic expressions, event styling, and collaborative design projects.',
                detailIcon: Brush
            }
        ]
    },
    {
        id: 'hackathons',
        title: 'Hackathons & Competitions',
        icon: Trophy,
        theme: 'violet',
        items: [
            {
                name: 'Innovasia Hackathon',
                role: 'Participant',
                tag: 'Innovation & Pitching',
                desc: 'Collaborated in building prototype solutions to tackle real-world challenges, pitching ideas to developer juries.',
                detailIcon: Trophy
            },
            {
                name: 'Gen AI Hackathon',
                role: 'Participant',
                tag: 'Artificial Intelligence',
                desc: 'Built applications leveraging large language models (LLMs), prompt engineering pipelines, and semantic intelligence.',
                detailIcon: BrainCircuit
            },
            {
                name: 'Hacktoberfest Hackathon',
                role: 'Open Source Contributor',
                tag: 'Git & Collaboration',
                desc: 'Contributed to global open-source software repositories, resolving issues, and merging pull requests via Git.',
                detailIcon: Trophy
            }
        ]
    },
    {
        id: 'training',
        title: 'Training & Workshops',
        icon: Cloud,
        theme: 'orange',
        items: [
            {
                name: 'Google Cloud Arcade Program',
                role: 'Participant',
                tag: 'GCP & Cloud Infrastructure',
                desc: 'Gained hands-on experience with Google Cloud Platform, completing cloud shell quests, deployments, and security configurations.',
                detailIcon: Cloud
            },
            {
                name: 'Speech Analysis & Processing Course',
                role: 'Certified Student',
                tag: 'IIIT Hyderabad',
                desc: 'Completed advanced academic coursework at IIITH and attended an intensive workshop engaging directly with MS Scholars.',
                detailIcon: BookOpen
            }
        ]
    },
    {
        id: 'volunteering',
        title: 'Summits & Volunteering',
        icon: HeartHandshake,
        theme: 'violet',
        items: [
            {
                name: 'Student Summits',
                role: 'Attendee',
                tag: 'Networking & Technology',
                desc: 'Attended regional developer assemblies and student leader gatherings, networking with industry experts.',
                detailIcon: GraduationCap
            },
            {
                name: 'Cube Competitions & Events',
                role: 'Volunteer Coordinator',
                tag: 'Event Orchestration',
                desc: 'Volunteered for campus Rubik’s cube competitions and community events, managing participant coordination.',
                detailIcon: HeartHandshake
            }
        ]
    }
];

const Activities = () => {
    return (
        <div className="activities-grid">
            {activitiesCategories.map((category) => {
                const HeaderIcon = category.icon;
                const isOrange = category.theme === 'orange';
                const accentColor = isOrange ? 'var(--accent-orange)' : 'var(--accent-violet)';
                const glowShadow = isOrange ? 'var(--shadow-glow-orange)' : 'var(--shadow-glow-violet)';
                const iconBg = isOrange ? 'var(--accent-orange-glow)' : 'var(--accent-violet-glow)';

                return (
                    <div
                        key={category.id}
                        className="activity-category-card glass-panel"
                        style={{
                            '--hover-glow': glowShadow,
                            '--card-accent': accentColor
                        }}
                    >
                        <div className="activity-category-header">
                            <div className="activity-icon-container" style={{
                                background: iconBg,
                                borderColor: `${accentColor}30`,
                                color: accentColor
                            }}>
                                <HeaderIcon size={20} />
                            </div>
                            <h3 className="activity-category-title">{category.title}</h3>
                        </div>

                        <div className="activity-items-list">
                            {category.items.map((item, idx) => {
                                const ItemIcon = item.detailIcon;
                                return (
                                    <div key={idx} className="activity-item">
                                        <div className="activity-item-header">
                                            <div className="activity-item-title-wrapper">
                                                <h4 className="activity-item-name">{item.name}</h4>
                                                <span className="activity-item-role">{item.role}</span>
                                            </div>
                                            <span
                                                className="activity-item-tag"
                                                style={{
                                                    background: iconBg,
                                                    borderColor: `${accentColor}20`,
                                                    color: accentColor
                                                }}
                                            >
                                                {item.tag}
                                            </span>
                                        </div>
                                        <p className="activity-item-desc">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Activities;
