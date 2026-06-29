import React, { useState, useEffect } from 'react';
import {
    Home, User, GraduationCap, Terminal, Briefcase,
    FolderGit2, Trophy, Mail, Menu, X, ChevronLeft, ChevronRight, Award
} from 'lucide-react';

const Navbar = ({ activeSection, isCollapsed, setIsCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 'hero', label: 'Home', icon: Home },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'achievements', label: 'Achievements', icon: Award },
        { id: 'skills', label: 'Skills', icon: Terminal },
        { id: 'internships', label: 'Internships', icon: Briefcase },
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'activities', label: 'Activities', icon: Trophy },
        { id: 'contact', label: 'Contact', icon: Mail }
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    // Close on resize if open
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    return (
        <>
            {/* Mobile Navigation Toggle Button */}
            <button
                className="mobile-nav-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle navigation menu"
                style={{ display: window.innerWidth <= 768 ? 'flex' : '' }}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Navigation */}
            <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    <div className="avatar-ring">
                        <div className="avatar-content">DC</div>
                    </div>
                    <h2 className="sidebar-name">Developer</h2>
                    <p className="sidebar-tagline">CSE Graduate</p>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={(e) => handleLinkClick(e, item.id)}
                                    >
                                        <IconComponent size={20} />
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    {/* Status Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0.8rem', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: 'var(--border-radius-md)' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e', display: 'inline-block', animation: 'pulse-green 2s infinite' }}></span>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Open to Opportunities</span>
                    </div>

                    <style>{`
                        @keyframes pulse-green {
                            0% { transform: scale(0.95); opacity: 0.5; }
                            50% { transform: scale(1.1); opacity: 1; }
                            100% { transform: scale(0.95); opacity: 0.5; }
                        }
                    `}</style>

                    {/* Socials */}
                    <div className="sidebar-socials">
                        <a href="https://github.com/dedeepya04" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/dedeepya-chilakala-63054b279" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="https://leetcode.com/u/dedeepyachilakala/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="social-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        </a>
                        <a href="mailto:dedeepyachilakala@gmail.com" aria-label="Gmail" className="social-icon">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
            </aside>

            {/* Desktop Collapse Toggle Button */}
            <button
                className="desktop-collapse-toggle"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </>
    );
};

export default Navbar;
