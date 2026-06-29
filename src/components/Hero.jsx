import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Terminal as TerminalIcon, Cpu, Code, Layers } from 'lucide-react';

const Hero = () => {
    // Typewriter effect variables
    const roles = ['Fullstack Developer', 'AIML Engineer', 'UI/UX Enthusiast', 'CSE Graduate', 'Absolute Learner'];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        let timer;
        const currentRole = roles[currentRoleIndex];

        const handleType = () => {
            if (!isDeleting) {
                // Typing text
                setDisplayedText(currentRole.substring(0, displayedText.length + 1));
                setTypingSpeed(100);

                if (displayedText === currentRole) {
                    // Finished typing, pause before deleting
                    timer = setTimeout(() => setIsDeleting(true), 2000);
                    return;
                }
            } else {
                // Deleting text
                setDisplayedText(currentRole.substring(0, displayedText.length - 1));
                setTypingSpeed(50);

                if (displayedText === '') {
                    setIsDeleting(false);
                    // Move to next role
                    setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
                    return;
                }
            }

            timer = setTimeout(handleType, typingSpeed);
        };

        timer = setTimeout(handleType, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex]);

    const scrollToProjects = (e) => {
        e.preventDefault();
        const projectsSec = document.getElementById('projects');
        if (projectsSec) {
            projectsSec.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="section hero-section">
            <div className="section-container" style={{ position: 'relative' }}>
                {/* Floating Quote Badge */}
                <div className="floating-quote-badge">
                    <span className="quote-dot"></span>
                    <span>Hungry to learn, grow and explore</span>
                </div>
                <div className="hero-grid">

                    {/* Left Column: Title and details */}
                    <div className="hero-content">
                        <div className="badge">Hello World!</div>
                        <h1>Hi, I'm <span style={{ color: 'var(--accent-orange)' }}>Dedeepya</span></h1>
                        <h2 className="hero-subtitle">
                            I am a <span>{displayedText}</span>
                            <span style={{ borderLeft: '2px solid var(--accent-orange)', marginLeft: '2px', animation: 'blink 0.7s infinite' }}></span>
                        </h2>

                        <p className="hero-description">
                            Passionate about building responsive, high-performance and scalable software applications and leveraging machine learning algorithms to solve real-world problems. Focused on modern web interfaces and smart applications.
                        </p>

                        <div className="hero-ctas">
                            <a href="#projects" className="btn btn-primary" onClick={scrollToProjects}>
                                View Projects
                                <ArrowRight size={18} />
                            </a>
                            <a href="/Dedeepya_Resume.pdf" download="Dedeepya_Resume.pdf" className="btn btn-secondary">
                                Download CV
                                <Download size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: AI/ML Dashboard Visual Terminal (Reference 3 & 4 style) */}
                    <div className="hero-visual">
                        <div className="visual-container">
                            <div className="visual-content">
                                <div className="visual-header">
                                    <div className="dot dot-red"></div>
                                    <div className="dot dot-yellow"></div>
                                    <div className="dot dot-green"></div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <TerminalIcon size={12} /> developer-profile.json
                                    </span>
                                </div>

                                <div className="visual-body">
                                    <div className="code-line">
                                        <span className="keyword">const</span> developer = &#123;
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '1.25rem' }}>
                                        name: <span className="string">"Dedeepya Chilakala"</span>,
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '1.25rem' }}>
                                        education: <span className="string">"B.Tech CSE (AIML)"</span>,
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '1.25rem' }}>
                                        specialties: [<span className="string">"Frontend"</span>, <span className="string">"ML"</span>],
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '1.25rem' }}>
                                        coreStack: &#123;
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '2.5rem' }}>
                                        web: [<span className="string">"React.js"</span>, <span className="string">"Node.js"</span>],
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '2.5rem' }}>
                                        aiMl: [<span className="string">"Python"</span>, <span className="string">"TensorFlow"</span>]
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '1.25rem' }}>
                                        &#125;,
                                    </div>
                                    <div className="code-line" style={{ paddingLeft: '1.25rem' }}>
                                        openToWork: <span className="number">true</span>
                                    </div>
                                    <div className="code-line">&#125;;</div>
                                </div>

                                <div className="visual-footer">
                                    <span style={{ color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                                        <Cpu size={14} /> AI model: Active
                                    </span>
                                    <span className="visual-tech">AIML</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Blinking Cursor CSS */}
            <style>{`
                @keyframes blink {
                    50% { opacity: 0; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
