import React, { useState } from 'react';
import {
    ExternalLink, Activity, DollarSign, Brain, MapPin,
    Heart, Calendar, Plus, Trash2, ArrowRight, BarChart2,
    MessageSquare, ShieldCheck, Sparkles, Upload, Terminal,
    FileText, CheckCircle2, RefreshCw, Layers, TrendingUp, X
} from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
);

const categories = [
    { id: 'all', name: 'All Projects', icon: Sparkles },
    { id: 'ml', name: 'Machine Learning & NLP', icon: Brain },
    { id: 'fullstack', name: 'Full-Stack / MERN', icon: Layers }
];

const projectsData = [
    {
        id: 'smarthealth',
        title: 'Smart Health Care System',
        category: 'fullstack',
        tech: ['MERN Stack', 'Maps API', 'Cloudinary', 'Express.js', 'MongoDB'],
        stats: { key: 'Document Management', value: '+90% Efficiency' },
        tagline: 'Comprehensive healthcare platform for records and hospital navigation',
        bullets: [
            'Built a scalable healthcare platform using the MERN Stack to manage 100+ daily health records; integrated Cloudinary for secure document uploads, improving accessibility by 90%.',
            'Leveraged Google Maps API to deliver real-time hospital recommendations within a 10 km radius with 95% location accuracy, enhancing user experience through a responsive, intuitive UI.'
        ],
        github: 'https://github.com/dedeepya04/Smarthealth',
        color: 'violet',
        icon: Activity
    },
    {
        id: 'sentiment',
        title: 'Flipkart Reviews Sentiment Analysis',
        category: 'ml',
        tech: ['Python', 'NLP', 'Machine Learning', 'Selenium', 'VADER NLP'],
        stats: { key: 'Analysis Accuracy', value: '92% Confidence' },
        tagline: 'NLP pipeline to analyze and classify product reviews from Flipkart',
        bullets: [
            'Engineered a sentiment analysis pipeline for Flipkart product reviews using Python-based NLP; leveraged Selenium to scrape and process 10,000+ customer reviews programmatically.',
            'Applied VADER Sentiment Intensity Analyzer and custom preprocessing to classify feedback into Positive, Negative, and Neutral categories, delivering actionable business intelligence.'
        ],
        github: 'https://github.com/dedeepya04/Sentiment-Analysis',
        color: 'orange',
        icon: Brain
    },
    {
        id: 'budgetmate',
        title: 'BudgetMate Expense Tracker',
        category: 'fullstack',
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT'],
        stats: { key: 'Query Optimization', value: '30% Faster Load' },
        tagline: 'Full-stack financial ledger and analytics tool with real-time charts',
        bullets: [
            'Architected and delivered a full-stack expense tracking application enabling 100+ users to log transactions, visualize financial summaries with dynamic charts, and track real-time balance updates.',
            'Designed and implemented JWT-based authentication in RESTful CRUD APIs with Express; optimized MongoDB Atlas queries, achieving a 30% improvement in application load time.'
        ],
        github: 'https://github.com/dedeepya04/expense-tracker',
        color: 'orange',
        icon: DollarSign
    }
];

const Projects = () => {
    const [selectedCat, setSelectedCat] = useState('all');
    const [activeSandbox, setActiveSandbox] = useState(null); // 'smarthealth', 'sentiment', 'budgetmate' or null

    const filteredProjects = projectsData.filter(project => {
        if (selectedCat === 'all') return true;
        return project.category === selectedCat;
    });

    return (
        <div className="projects-container">
            {/* Category Filter Tabs */}
            <div className="projects-controls glass-panel">
                <div className="projects-category-tabs">
                    {categories.map((cat) => {
                        const TabIcon = cat.icon;
                        const isActive = selectedCat === cat.id;
                        return (
                            <button
                                key={cat.id}
                                className={`category-tab-btn ${isActive ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedCat(cat.id);
                                    setActiveSandbox(null); // Reset sandbox when switching filters
                                }}
                            >
                                <TabIcon size={14} className="tab-icon" />
                                <span>{cat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid of Projects */}
            <div className="projects-grid">
                {filteredProjects.map((project) => {
                    const IconComponent = project.icon;
                    const isOrange = project.color === 'orange';
                    const accentColor = isOrange ? 'var(--accent-orange)' : 'var(--accent-violet)';
                    const glowShadow = isOrange ? 'var(--shadow-glow-orange)' : 'var(--shadow-glow-violet)';
                    const pillBg = isOrange ? 'var(--accent-orange-glow)' : 'var(--accent-violet-glow)';
                    const isSandboxOpen = activeSandbox === project.id;

                    return (
                        <div
                            key={project.id}
                            className={`project-card-wrapper ${isSandboxOpen ? 'sandbox-active' : ''}`}
                        >
                            <div
                                className="project-card glass-panel"
                                style={{
                                    '--hover-glow': glowShadow,
                                    '--card-accent': accentColor
                                }}
                            >
                                {/* Header */}
                                <div className="project-card-header">
                                    <div className="project-header-left">
                                        <div className="project-icon-box" style={{
                                            background: pillBg,
                                            borderColor: `${accentColor}30`,
                                            color: accentColor
                                        }}>
                                            <IconComponent size={22} />
                                        </div>
                                        <div>
                                            <h3 className="project-title">{project.title}</h3>
                                            <span className="project-tagline">{project.tagline}</span>
                                        </div>
                                    </div>
                                    <div className="project-links">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="View Source on GitHub">
                                            <GithubIcon size={18} />
                                        </a>
                                    </div>
                                </div>

                                {/* Tech Stack Badges */}
                                <div className="project-tech-badges">
                                    {project.tech.map((techItem, index) => (
                                        <span
                                            key={index}
                                            className="tech-badge"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.02)',
                                                borderColor: 'var(--border-color)',
                                                color: 'var(--text-secondary)'
                                            }}
                                        >
                                            {techItem}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats Highlight */}
                                <div className="project-stats-highlight" style={{
                                    borderColor: `${accentColor}20`,
                                    background: `${accentColor}05`
                                }}>
                                    <span className="stats-key">{project.stats.key}:</span>
                                    <span className="stats-val" style={{ color: accentColor }}>
                                        <Sparkles size={13} className="sparkle-icon" />
                                        {project.stats.value}
                                    </span>
                                </div>

                                {/* Feature Bullet Points */}
                                <ul className="project-bullets">
                                    {project.bullets.map((bullet, idx) => (
                                        <li key={idx} className="project-bullet-item">
                                            <ArrowRight size={14} className="bullet-arrow" style={{ color: accentColor }} />
                                            <span className="bullet-text">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Sandbox Trigger Action */}
                                <div className="project-actions">
                                    <button
                                        className="btn btn-secondary btn-sm sandbox-toggle-btn"
                                        onClick={() => setActiveSandbox(isSandboxOpen ? null : project.id)}
                                        style={{
                                            borderColor: isSandboxOpen ? accentColor : 'var(--border-color)',
                                            color: isSandboxOpen ? '#fff' : 'var(--text-primary)',
                                            background: isSandboxOpen ? accentColor : 'transparent'
                                        }}
                                    >
                                        <Terminal size={14} />
                                        <span>{isSandboxOpen ? 'Close Simulator' : 'Launch Sandbox Simulator'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* In-place Sandbox Drawer / Container */}
                            {isSandboxOpen && (
                                <div className="project-sandbox glass-panel" style={{ '--card-accent': accentColor }}>
                                    <div className="sandbox-header" style={{ borderBottomColor: `${accentColor}20` }}>
                                        <div className="sandbox-title-container">
                                            <Terminal size={16} style={{ color: accentColor }} />
                                            <h4>{project.title} - Simulator</h4>
                                        </div>
                                        <div className="sandbox-header-actions">
                                            <span className="sandbox-badge">Interactive</span>
                                            <button
                                                type="button"
                                                className="sandbox-close-header-btn"
                                                onClick={() => setActiveSandbox(null)}
                                                title="Close Simulator"
                                                aria-label="Close Simulator"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="sandbox-body">
                                        {project.id === 'sentiment' && <FlipkartSentimentSandbox accentColor={accentColor} />}
                                        {project.id === 'smarthealth' && <SmartHealthSandbox accentColor={accentColor} />}
                                        {project.id === 'budgetmate' && <BudgetMateSandbox accentColor={accentColor} />}
                                    </div>
                                    <div className="sandbox-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm sandbox-close-footer-btn"
                                            onClick={() => setActiveSandbox(null)}
                                        >
                                            <X size={14} />
                                            <span>Close Simulator</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/* ==========================================================================
   SANDBOX SIMULATOR 1: Flipkart Sentiment Analyzer
   ========================================================================== */
const FlipkartSentimentSandbox = ({ accentColor }) => {
    const [selectedUrlIdx, setSelectedUrlIdx] = useState(0);
    const [customUrl, setCustomUrl] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(null);

    const presets = [
        { name: 'iPhone 15 (Bestseller)', url: 'https://www.flipkart.com/apple-iphone-15-black-128-gb/p/itm2d83c2c5b3a0a' },
        { name: 'Noise ColorFit Smartwatch', url: 'https://www.flipkart.com/noise-colorfit-icon-buzz-smartwatch/p/itm8b0f808be389d' },
        { name: 'Sony WH-1000XM4 Headset', url: 'https://www.flipkart.com/sony-wh-1000xm4-bluetooth-headset/p/itm85ba27f8a84fc' }
    ];

    const runAnalysis = async () => {
        setIsRunning(true);
        setResults(null);
        setProgress(0);
        setLogs([]);

        const targetUrl = customUrl || presets[selectedUrlIdx].url;

        const simulatedLogs = [
            `[1] SECURING DRIVER: Launching Selenium WebDriver in headless mode...`,
            `[2] GET REQUEST: Fetching URL: ${targetUrl.substring(0, 48)}...`,
            `[3] SCRAPE INIT: Target identified. Bypassing Flipkart authentication overlay...`,
            `[4] SCRAPE LOOP: Scraping reviews... Page 1 compiled (100 reviews)`,
            `[5] SCRAPE LOOP: Scraping reviews... Page 10 compiled (1,000 reviews)`,
            `[6] SCRAPE LOOP: Scraping reviews... Page 50 compiled (5,000 reviews)`,
            `[7] SCRAPE LOOP: Scraping reviews... Page 100 compiled (10,000 reviews)`,
            `[8] SCRAPE COMPLETE: Total scraped: 10,248 review cards successfully extracted.`,
            `[9] NLP PREPROCESSING: Stripping HTML tags, lowercasing, tokenizing, removing 45 stopwords...`,
            `[10] NLP ANALYSIS: Feeding preprocessed tokens to VADER Sentiment Intensity Analyzer...`,
            `[11] NLP COMPILATION: Classifying composite score threshold bounds...`,
            `[12] READY: Aggregating sentiment matrix. Confidence rate: 92.4%`
        ];

        for (let i = 0; i < simulatedLogs.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 380));
            setLogs(prev => [...prev, simulatedLogs[i]]);
            setProgress(Math.round(((i + 1) / simulatedLogs.length) * 100));
        }

        await new Promise(resolve => setTimeout(resolve, 200));

        // Generate sentiment output based on target
        let positive = 74;
        let neutral = 12;
        let negative = 14;
        let summary = "Extremely popular. Positive feedback highlights the brilliant design and build quality. Some neutral comments mention delivery times, and rare negative reviews cite high pricing.";

        if (targetUrl.includes('iphone')) {
            positive = 82; neutral = 8; negative = 10;
            summary = "Superb reception. Users heavily praise the camera system, USB-C transition, and fluid dynamic island. Marginal complaints are about heat dissipation during rapid charging.";
        } else if (targetUrl.includes('noise')) {
            positive = 62; neutral = 20; negative = 18;
            summary = "Decent budget choice. Highlighted features are budget-friendly calling functionality and battery life. Negative reviews mention step tracking discrepancies and screen visibility under direct sunlight.";
        } else if (targetUrl.includes('sony')) {
            positive = 88; neutral = 6; negative = 6;
            summary = "Outstanding audio. ANC performance and sound quality represent class-leading levels. Negatives mention touch sensor glitches in humid environments.";
        } else if (customUrl) {
            // Random generator for custom url
            positive = Math.floor(Math.random() * 40) + 45;
            negative = Math.floor(Math.random() * 15) + 5;
            neutral = 100 - positive - negative;
            summary = `Analysis complete for custom product. Review sentiments indicate mostly positive trends (${positive}%) focusing on build characteristics, while minor negative sentiments are noted regarding secondary specs.`;
        }

        setResults({ positive, neutral, negative, summary });
        setIsRunning(false);
    };

    return (
        <div className="sentiment-sandbox">
            <p className="sandbox-desc">Enter any Flipkart product link or select a preset to trigger a simulated Selenium review scraper and run Python VADER NLP classification.</p>

            <div className="sandbox-input-row">
                <div className="preset-selector">
                    <label className="sandbox-label">Select Preset Product:</label>
                    <div className="preset-buttons">
                        {presets.map((p, idx) => (
                            <button
                                key={idx}
                                className={`preset-btn ${selectedUrlIdx === idx && !customUrl ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedUrlIdx(idx);
                                    setCustomUrl('');
                                }}
                                disabled={isRunning}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="custom-input-box">
                    <label className="sandbox-label">Or Paste Product Link:</label>
                    <input
                        type="text"
                        placeholder="https://www.flipkart.com/product-name..."
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        disabled={isRunning}
                        className="sandbox-input"
                    />
                </div>
            </div>

            <button
                className="btn btn-primary btn-sm run-btn"
                onClick={runAnalysis}
                disabled={isRunning}
                style={{ background: accentColor, boxShadow: `0 0 15px ${accentColor}40` }}
            >
                {isRunning ? (
                    <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Scraping & Analysing ({progress}%)</span>
                    </>
                ) : (
                    <>
                        <PlayIcon size={14} />
                        <span>Run Scraper & NLP Pipeline</span>
                    </>
                )}
            </button>

            {/* Simulated Terminal Screen */}
            {(logs.length > 0 || isRunning) && (
                <div className="terminal-box">
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <span className="dot dot-red"></span>
                            <span className="dot dot-yellow"></span>
                            <span className="dot dot-green"></span>
                        </div>
                        <span>selenium_scraper_nlp.py</span>
                    </div>
                    <div className="terminal-body scroll-to-bottom">
                        {logs.map((log, index) => {
                            let logColor = '#d4d4d8';
                            if (log.includes('[SUCCESS]')) logColor = '#4ade80';
                            if (log.includes('[READY]')) logColor = '#38bdf8';
                            if (log.includes('SCRAPE LOOP')) logColor = '#fb923c';
                            return (
                                <div key={index} className="terminal-line" style={{ color: logColor }}>
                                    <span className="terminal-prompt">&gt;</span> {log}
                                </div>
                            );
                        })}
                        {isRunning && (
                            <div className="terminal-cursor-line">
                                <span className="terminal-prompt">&gt;</span>
                                <span className="terminal-cursor">_</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Results Chart Display */}
            {results && (
                <div className="results-container glass-panel reveal-in">
                    <h5 className="results-title">Sentiment Matrix Breakdown</h5>

                    <div className="chart-wrapper">
                        {/* Custom Bar Grid Chart */}
                        <div className="bar-chart-vertical">
                            <div className="chart-bar-group">
                                <div className="bar-label">Positive</div>
                                <div className="bar-track">
                                    <div className="bar-fill positive-fill" style={{ width: `${results.positive}%` }}>
                                        <span className="percentage-text">{results.positive}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="chart-bar-group">
                                <div className="bar-label">Neutral</div>
                                <div className="bar-track">
                                    <div className="bar-fill neutral-fill" style={{ width: `${results.neutral}%` }}>
                                        <span className="percentage-text">{results.neutral}%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="chart-bar-group">
                                <div className="bar-label">Negative</div>
                                <div className="bar-track">
                                    <div className="bar-fill negative-fill" style={{ width: `${results.negative}%` }}>
                                        <span className="percentage-text">{results.negative}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overall Verdict Badge */}
                        <div className="verdict-box" style={{
                            borderColor: results.positive >= 70 ? '#22c55e40' : results.positive >= 50 ? '#eab30840' : '#ef444440',
                            background: results.positive >= 70 ? '#22c55e0a' : results.positive >= 50 ? '#eab3080a' : '#ef44440a'
                        }}>
                            <span className="verdict-title">Overall Sentiment Rating:</span>
                            <span className="verdict-value" style={{
                                color: results.positive >= 70 ? '#22c55e' : results.positive >= 50 ? '#eab308' : '#ef4444'
                            }}>
                                {results.positive >= 75 ? 'Strongly Positive' : results.positive >= 60 ? 'Positive' : results.positive >= 45 ? 'Mixed / Neutral' : 'Negative'}
                            </span>
                        </div>
                    </div>

                    <div className="results-summary">
                        <strong>Business Intelligence Summary:</strong>
                        <p>{results.summary}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ==========================================================================
   SANDBOX SIMULATOR 2: Smart Health Care System
   ========================================================================== */
const SmartHealthSandbox = ({ accentColor }) => {
    const [subTab, setSubTab] = useState('upload'); // 'upload' or 'map'
    const [records, setRecords] = useState([
        { id: 1, name: 'Dedeepya - Blood Report', type: 'Lab Report', date: '2026-06-25', file: 'blood_report_q2.pdf', status: 'Secured' },
        { id: 2, name: 'Dedeepya - Chest X-Ray', type: 'X-Ray', date: '2026-06-20', file: 'chest_xray_post_covid.png', status: 'Secured' }
    ]);
    const [patientName, setPatientName] = useState('');
    const [docType, setDocType] = useState('Prescription');
    const [mockFile, setMockFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [selectedHospital, setSelectedHospital] = useState(null);

    const hospitals = [
        { id: 1, name: 'Care Hospitals', distance: '2.4 km', beds: 18, rating: 4.6, phone: '040-61656565', x: 30, y: 40, status: 'Open' },
        { id: 2, name: 'Apollo Health City', distance: '4.1 km', beds: 35, rating: 4.8, phone: '040-23607777', x: 75, y: 25, status: 'Open' },
        { id: 3, name: 'KIMS Hospitals', distance: '6.8 km', beds: 12, rating: 4.5, phone: '040-44885000', x: 20, y: 70, status: 'Open' },
        { id: 4, name: 'Continental Hospitals', distance: '9.1 km', beds: 22, rating: 4.7, phone: '040-67000000', x: 60, y: 80, status: 'Open' }
    ];

    const triggerMockFileSelect = () => {
        const fileNames = {
            'Prescription': 'rx_dr_reddy_signed.pdf',
            'X-Ray': 'lumbar_spine_xray.png',
            'Lab Report': 'lipid_profile_2026.pdf',
            'Health Log': 'bp_spo2_weekly_log.txt'
        };
        setMockFile(fileNames[docType]);
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        if (!patientName || !mockFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        // Simulated Cloudinary uploading progression
        for (let p = 0; p <= 100; p += 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            setUploadProgress(p);
        }

        const newRecord = {
            id: Date.now(),
            name: `${patientName} - ${docType}`,
            type: docType,
            date: new Date().toISOString().split('T')[0],
            file: mockFile,
            status: 'Secured'
        };

        setRecords(prev => [newRecord, ...prev]);
        setPatientName('');
        setMockFile(null);
        setIsUploading(false);
    };

    const deleteRecord = (id) => {
        setRecords(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div className="smarthealth-sandbox">
            {/* Sub-tabs inside Sandbox */}
            <div className="sandbox-subtabs">
                <button
                    className={`subtab-btn ${subTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setSubTab('upload')}
                    style={{ borderColor: subTab === 'upload' ? accentColor : 'transparent', color: subTab === 'upload' ? accentColor : 'var(--text-secondary)' }}
                >
                    <Upload size={14} />
                    <span>Upload Medical Documents</span>
                </button>
                <button
                    className={`subtab-btn ${subTab === 'map' ? 'active' : ''}`}
                    onClick={() => setSubTab('map')}
                    style={{ borderColor: subTab === 'map' ? accentColor : 'transparent', color: subTab === 'map' ? accentColor : 'var(--text-secondary)' }}
                >
                    <MapPin size={14} />
                    <span>Nearby Hospital Map (10km)</span>
                </button>
            </div>

            {/* TAB CONTENT: Upload & Health records MERN Simulation */}
            {subTab === 'upload' && (
                <div className="health-records-simulator reveal-in">
                    <div className="records-split-layout">
                        {/* Left Side: Upload Form */}
                        <form className="record-form glass-panel" onSubmit={handleUploadSubmit}>
                            <h5 className="form-title">New Secure Record Upload</h5>

                            <div className="form-group">
                                <label className="sandbox-label">Patient Name:</label>
                                <input
                                    type="text"
                                    className="sandbox-input"
                                    placeholder="Enter patient name..."
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    required
                                    disabled={isUploading}
                                />
                            </div>

                            <div className="form-group">
                                <label className="sandbox-label">Document Type:</label>
                                <select
                                    className="sandbox-input sandbox-select"
                                    value={docType}
                                    onChange={(e) => {
                                        setDocType(e.target.value);
                                        setMockFile(null); // Reset file if type changes
                                    }}
                                    disabled={isUploading}
                                >
                                    <option value="Prescription">Prescription</option>
                                    <option value="X-Ray">X-Ray Image</option>
                                    <option value="Lab Report">Lab Diagnostic Report</option>
                                    <option value="Health Log">Personal Health Log</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="sandbox-label">Select File Asset:</label>
                                <div className="mock-dropzone" onClick={triggerMockFileSelect} style={{ borderColor: mockFile ? accentColor : 'var(--border-color)' }}>
                                    <Upload size={20} className="upload-icon" style={{ color: mockFile ? accentColor : 'var(--text-muted)' }} />
                                    {mockFile ? (
                                        <div className="selected-file-details">
                                            <span className="file-name" style={{ color: accentColor }}>{mockFile}</span>
                                            <span className="file-ready">Ready for Secure Cloudinary upload</span>
                                        </div>
                                    ) : (
                                        <span className="dropzone-text">Click to mock-attach a health asset</span>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-sm upload-submit-btn"
                                disabled={isUploading || !patientName || !mockFile}
                                style={{ background: accentColor, width: '100%', justifyContent: 'center' }}
                            >
                                {isUploading ? (
                                    <>
                                        <RefreshCw size={14} className="animate-spin" />
                                        <span>Encrypting & Uploading ({uploadProgress}%)</span>
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck size={14} />
                                        <span>Store Encrypted Record</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Right Side: Saved Records Table */}
                        <div className="records-table-container glass-panel">
                            <h5 className="table-title">Cloud MongoDB Records Ledger</h5>
                            <div className="table-wrapper">
                                <table className="records-table">
                                    <thead>
                                        <tr>
                                            <th>Record Details</th>
                                            <th>Attached File</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map(record => (
                                            <tr key={record.id}>
                                                <td>
                                                    <span className="rec-name">{record.name}</span>
                                                    <span className="rec-meta">{record.type} | {record.date}</span>
                                                </td>
                                                <td>
                                                    <span className="rec-file">
                                                        <FileText size={12} className="file-icon" />
                                                        {record.file}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="status-secured">
                                                        <span className="secured-dot"></span>
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="delete-btn" onClick={() => deleteRecord(record.id)} title="Delete record">
                                                        <Trash2 size={12} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: Maps API Hospital Navigation Simulation */}
            {subTab === 'map' && (
                <div className="hospital-map-simulator reveal-in">
                    <div className="map-split-layout">
                        {/* Map Drawing Container */}
                        <div className="mock-map-canvas glass-panel">
                            <div className="map-grid-overlay"></div>

                            {/* User Base Location pin */}
                            <div className="map-pin user-pin" style={{ left: '50%', top: '50%' }}>
                                <div className="pulse-ring"></div>
                                <div className="pin-dot"></div>
                                <span className="pin-label">You (VCE Campus)</span>
                            </div>

                            {/* Hospital Pins */}
                            {hospitals.map(h => {
                                const isSelected = selectedHospital && selectedHospital.id === h.id;
                                return (
                                    <div
                                        key={h.id}
                                        className={`map-pin hospital-pin ${isSelected ? 'selected' : ''}`}
                                        style={{
                                            left: `${h.x}%`,
                                            top: `${h.y}%`,
                                            '--accent-c': accentColor
                                        }}
                                        onClick={() => setSelectedHospital(h)}
                                    >
                                        <Heart size={12} className="hospital-pin-icon" />
                                        <span className="pin-label">{h.name} ({h.distance})</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Hospital Recommendation Side panel */}
                        <div className="hospital-list-panel glass-panel">
                            <h5 className="panel-title">Hospitals within 10 km (Google Maps API)</h5>
                            <div className="hospital-list">
                                {hospitals.map(h => {
                                    const isSelected = selectedHospital && selectedHospital.id === h.id;
                                    return (
                                        <div
                                            key={h.id}
                                            className={`hospital-list-card ${isSelected ? 'selected' : ''}`}
                                            onClick={() => setSelectedHospital(h)}
                                            style={{ borderColor: isSelected ? accentColor : 'var(--border-color)' }}
                                        >
                                            <div className="hosp-header">
                                                <h6 className="hosp-name">{h.name}</h6>
                                                <span className="hosp-distance">{h.distance}</span>
                                            </div>
                                            <div className="hosp-stats">
                                                <span className="stat-pill">★ {h.rating}</span>
                                                <span className="stat-pill beds-pill">Beds: {h.beds} open</span>
                                            </div>
                                            {isSelected && (
                                                <div className="selected-details reveal-in">
                                                    <p className="detail-line"><strong>Phone:</strong> {h.phone}</p>
                                                    <p className="detail-line"><strong>Emergency:</strong> 24/7 Active</p>
                                                    <p className="detail-line"><strong>Status:</strong> <span className="status-tag-open">{h.status}</span></p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ==========================================================================
   SANDBOX SIMULATOR 3: BudgetMate Expense Tracker
   ========================================================================== */
const BudgetMateSandbox = ({ accentColor }) => {
    const [transactions, setTransactions] = useState([
        { id: 1, title: 'Freelance Design Project', amount: 5000, type: 'income', category: 'Salary', date: '2026-06-28' },
        { id: 2, title: 'Supermarket Groceries', amount: 450, type: 'expense', category: 'Food', date: '2026-06-27' },
        { id: 3, title: 'Electricity Bills', amount: 1200, type: 'expense', category: 'Utilities', date: '2026-06-25' },
        { id: 4, title: 'Movie Tickets', amount: 350, type: 'expense', category: 'Entertainment', date: '2026-06-24' }
    ]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('Food');

    const handleAddTransaction = (e) => {
        e.preventDefault();
        if (!title || !amount || parseFloat(amount) <= 0) return;

        const newTrans = {
            id: Date.now(),
            title,
            amount: parseFloat(amount),
            type,
            category: type === 'income' ? 'Salary' : category,
            date: new Date().toISOString().split('T')[0]
        };

        setTransactions(prev => [newTrans, ...prev]);
        setTitle('');
        setAmount('');
    };

    const handleDeleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    // Calculate balances
    const totalIncome = transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0);
    const totalExpense = transactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0);
    const balance = totalIncome - totalExpense;

    // Calculate category distribution for expenses
    const categoryTotals = { Food: 0, Utilities: 0, Entertainment: 0, Savings: 0 };
    transactions.forEach(t => {
        if (t.type === 'expense' && categoryTotals[t.category] !== undefined) {
            categoryTotals[t.category] += t.amount;
        }
    });

    const maxCategoryVal = Math.max(...Object.values(categoryTotals), 1);

    return (
        <div className="budgetmate-sandbox">
            <p className="sandbox-desc">Enter transactions to simulate BudgetMate's REST API ledger calculations and observe immediate client-side balance charts.</p>

            {/* Quick KPI Cards */}
            <div className="budget-kpi-grid">
                <div className="kpi-card glass-panel" style={{ borderLeft: '3px solid #22c55e' }}>
                    <span className="kpi-label">Total Balance</span>
                    <span className="kpi-value" style={{ color: balance >= 0 ? '#22c55e' : '#ef4444' }}>
                        ₹{balance.toLocaleString()}
                    </span>
                </div>
                <div className="kpi-card glass-panel" style={{ borderLeft: '3px solid #38bdf8' }}>
                    <span className="kpi-label">Total Income</span>
                    <span className="kpi-value" style={{ color: '#38bdf8' }}>
                        ₹{totalIncome.toLocaleString()}
                    </span>
                </div>
                <div className="kpi-card glass-panel" style={{ borderLeft: '3px solid #f43f5e' }}>
                    <span className="kpi-label">Total Expenses</span>
                    <span className="kpi-value" style={{ color: '#f43f5e' }}>
                        ₹{totalExpense.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Split layout: Calculator form and charts */}
            <div className="budget-split-layout">
                {/* Transaction Entry Form */}
                <form className="transaction-form glass-panel" onSubmit={handleAddTransaction}>
                    <h5 className="form-title">Add Transaction Ledger</h5>

                    <div className="form-group">
                        <label className="sandbox-label">Transaction Title:</label>
                        <input
                            type="text"
                            className="sandbox-input"
                            placeholder="e.g. Hostinger Web Hosting"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="sandbox-label">Amount (₹):</label>
                            <input
                                type="number"
                                className="sandbox-input"
                                placeholder="e.g. 1500"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="sandbox-label">Transaction Type:</label>
                            <select
                                className="sandbox-input sandbox-select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                    </div>

                    {type === 'expense' && (
                        <div className="form-group">
                            <label className="sandbox-label">Budget Category:</label>
                            <div className="category-chips">
                                {['Food', 'Utilities', 'Entertainment', 'Savings'].map(cat => (
                                    <button
                                        type="button"
                                        key={cat}
                                        className={`chip ${category === cat ? 'active' : ''}`}
                                        onClick={() => setCategory(cat)}
                                        style={{
                                            background: category === cat ? accentColor : 'transparent',
                                            borderColor: category === cat ? accentColor : 'var(--border-color)',
                                            color: category === cat ? '#fff' : 'var(--text-secondary)'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary btn-sm submit-trans-btn"
                        style={{ background: accentColor, width: '100%', justifyContent: 'center' }}
                    >
                        <Plus size={14} />
                        <span>Log to MongoDB Atlas</span>
                    </button>
                </form>

                {/* Ledger Listing & Chart Analytics */}
                <div className="budget-analytics glass-panel">
                    <div className="analytics-header">
                        <h5 className="analytics-title">Spendings Breakdown & Ledger</h5>
                        {/* JWT/REST API Stat bar */}
                        <div className="jwt-api-badge">
                            <span className="jwt-dot"></span>
                            <span>REST API | JWT Active</span>
                        </div>
                    </div>

                    <div className="analytics-body">
                        {/* Category progress charts */}
                        <div className="category-charts-container">
                            <h6 className="analytics-subtitle">Expense Distribution</h6>
                            {Object.entries(categoryTotals).map(([catName, value]) => {
                                const percentage = Math.round((value / maxCategoryVal) * 100);
                                return (
                                    <div key={catName} className="cat-chart-row">
                                        <div className="cat-row-label">
                                            <span className="cat-name">{catName}</span>
                                            <span className="cat-value">₹{value}</span>
                                        </div>
                                        <div className="cat-track-bar">
                                            <div
                                                className="cat-fill-bar"
                                                style={{
                                                    width: `${percentage}%`,
                                                    background: catName === 'Food' ? '#f43f5e' : catName === 'Utilities' ? '#eab308' : catName === 'Entertainment' ? '#8b5cf6' : '#22c55e'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Recent ledger table */}
                        <div className="recent-ledger-list">
                            <h6 className="analytics-subtitle">Recent Database Records</h6>
                            <div className="ledger-items">
                                {transactions.length === 0 ? (
                                    <span className="empty-ledger">No database records logged yet.</span>
                                ) : (
                                    transactions.map(t => (
                                        <div key={t.id} className="ledger-item">
                                            <div className="ledger-left">
                                                <span className="ledger-title">{t.title}</span>
                                                <span className="ledger-meta">{t.category} | {t.date}</span>
                                            </div>
                                            <div className="ledger-right">
                                                <span className={`ledger-amount ${t.type}`}>
                                                    {t.type === 'income' ? '+' : '-'}₹{t.amount}
                                                </span>
                                                <button className="delete-btn" onClick={() => handleDeleteTransaction(t.id)}>
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper SVG/Lucide play icon replica for sandbox run button
const PlayIcon = ({ size = 16, className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width={size}
        height={size}
        className={className}
    >
        <path d="M8 5v14l11-7z" />
    </svg>
);

export default Projects;
