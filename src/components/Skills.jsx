import React, { useState, useMemo } from 'react';
import {
    Search, Code2, Globe, Database, BrainCircuit,
    CheckSquare, Wrench, GraduationCap, Sparkles
} from 'lucide-react';

const categories = [
    { id: 'all', name: 'All Skills', icon: Sparkles },
    { id: 'languages', name: 'Languages', icon: Code2 },
    { id: 'web', name: 'Web & Frontend', icon: Globe },
    { id: 'backend', name: 'Backend & DB', icon: Database },
    { id: 'aiml', name: 'AI / ML', icon: BrainCircuit },
    { id: 'testing', name: 'Testing & QA', icon: CheckSquare },
    { id: 'tools', name: 'Tools & DevOps', icon: Wrench },
    { id: 'core', name: 'Core CS', icon: GraduationCap }
];

const skillsData = [
    // Languages
    { name: 'Java', category: 'languages', level: 'Expert', desc: 'OOP, Collections, Multi-threading, Enterprise apps', theme: 'orange' },
    { name: 'Python', category: 'languages', level: 'Expert', desc: 'AI/ML models, scripting, data manipulation', theme: 'violet' },
    { name: 'JavaScript', category: 'languages', level: 'Expert', desc: 'Modern ES6+, async workflows, DOM manipulation', theme: 'orange' },

    // Web & Frontend
    { name: 'HTML', category: 'web', level: 'Expert', desc: 'Semantic tags, SEO foundation, accessibility', theme: 'orange' },
    { name: 'CSS', category: 'web', level: 'Expert', desc: 'Flexbox, CSS Grid, animation keyframes, responsiveness', theme: 'orange' },
    { name: 'React.js', category: 'web', level: 'Expert', desc: 'Functional components, Hooks, Context, performance', theme: 'orange' },
    { name: 'Figma', category: 'web', level: 'Intermediate', desc: 'UI/UX mockups, interactive prototyping, vector assets', theme: 'violet' },

    // Backend & Databases
    { name: 'Node.js', category: 'backend', level: 'Proficient', desc: 'Event-driven, asynchronous backend runtimes', theme: 'orange' },
    { name: 'Express', category: 'backend', level: 'Proficient', desc: 'Routing, middleware pipelines, backend server design', theme: 'orange' },
    { name: 'REST API', category: 'backend', level: 'Expert', desc: 'Standard endpoint architecture, request validation, headers', theme: 'orange' },
    { name: 'MySQL', category: 'backend', level: 'Proficient', desc: 'Relational tables, complex joins, transactions, constraints', theme: 'violet' },
    { name: 'MongoDB', category: 'backend', level: 'Proficient', desc: 'NoSQL collections, document modeling, aggregation framework', theme: 'violet' },
    { name: 'DBMS', category: 'backend', level: 'Expert', desc: 'Database administration theory, indexing, normalization', theme: 'violet' },

    // AI/ML
    { name: 'Machine Learning', category: 'aiml', level: 'Proficient', desc: 'Supervised & unsupervised models, regression, clustering', theme: 'violet' },
    { name: 'Deep Learning', category: 'aiml', level: 'Proficient', desc: 'Multi-layer models, weights, gradient descent', theme: 'violet' },
    { name: 'Neural Networks', category: 'aiml', level: 'Proficient', desc: 'CNN, RNN, artificial neuron networks, forward pass', theme: 'violet' },
    { name: 'Scikit-Learn', category: 'aiml', level: 'Expert', desc: 'Model evaluation, feature engineering, pipeline helpers', theme: 'violet' },
    { name: 'TensorFlow', category: 'aiml', level: 'Intermediate', desc: 'Training layers, optimizers, tensor math execution', theme: 'violet' },
    { name: 'Natural Language Processing', category: 'aiml', level: 'Proficient', desc: 'Tokenization, embeddings, text classifications', theme: 'violet' },


    // Testing
    { name: 'Selenium', category: 'testing', level: 'Proficient', desc: 'Cross-browser testing, automation framework scripts', theme: 'orange' },
    { name: 'Playwright', category: 'testing', level: 'Proficient', desc: 'Modern async test execution, headless automated tests', theme: 'orange' },

    // Tools
    { name: 'VS Code', category: 'tools', level: 'Expert', desc: 'Extension orchestration, debugging, workspace workspaces', theme: 'orange' },
    { name: 'Git', category: 'tools', level: 'Expert', desc: 'Distributed version control, merge resolution, branching', theme: 'orange' },
    { name: 'GitHub', category: 'tools', level: 'Expert', desc: 'Pull request reviews, branch protection, CI/CD actions', theme: 'orange' },
    { name: 'Postman', category: 'tools', level: 'Expert', desc: 'API debugging, mock servers, request variables', theme: 'orange' },
    { name: 'Thunderclient', category: 'tools', level: 'Expert', desc: 'Lightweight REST testing workspace within VS Code', theme: 'orange' },
    { name: 'Antigravity', category: 'tools', level: 'Expert', desc: 'Agentic workflows, model interaction, system debugging', theme: 'violet' },

    // Core
    { name: 'DSA', category: 'core', level: 'Expert', desc: 'Data structures & Algorithms, space/time complexity optimization', theme: 'violet' },
    { name: 'OOPs', category: 'core', level: 'Expert', desc: 'Encapsulation, inheritance, polymorphism, abstraction', theme: 'violet' },
    { name: 'OS', category: 'core', level: 'Proficient', desc: 'Memory allocation, scheduling algorithms, multi-threading', theme: 'violet' },
    { name: 'CN', category: 'core', level: 'Proficient', desc: 'TCP/IP layers, routing, HTTP/DNS protocol structures', theme: 'violet' },
    { name: 'SDLC', category: 'core', level: 'Expert', desc: 'Design, execution, unit testing, release management', theme: 'violet' },
    { name: 'Agile development', category: 'core', level: 'Expert', desc: 'Sprint planning, Scrum boards, iterative code shipping', theme: 'violet' }
];

const Skills = () => {
    const [selectedCat, setSelectedCat] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSkills = useMemo(() => {
        return skillsData.filter(skill => {
            const matchesCategory = selectedCat === 'all' || skill.category === selectedCat;
            const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCat, searchQuery]);

    return (
        <div className="skills-container">
            {/* Control Bar - Filter Tabs & Search */}
            <div className="skills-controls glass-panel">
                <div className="skills-search-wrapper">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search skills (e.g. React, Python)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="skills-search-input"
                    />
                    {searchQuery && (
                        <button className="search-clear-btn" onClick={() => setSearchQuery('')}>×</button>
                    )}
                </div>

                <div className="skills-category-tabs">
                    {categories.map((cat) => {
                        const TabIcon = cat.icon;
                        const isActive = selectedCat === cat.id;
                        return (
                            <button
                                key={cat.id}
                                className={`category-tab-btn ${isActive ? 'active' : ''}`}
                                onClick={() => setSelectedCat(cat.id)}
                            >
                                <TabIcon size={14} className="tab-icon" />
                                <span>{cat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Skills Grid */}
            {filteredSkills.length > 0 ? (
                <div className="skills-grid">
                    {filteredSkills.map((skill, idx) => {
                        const isOrange = skill.theme === 'orange';
                        const accentColor = isOrange ? 'var(--accent-orange)' : 'var(--accent-violet)';
                        const glowShadow = isOrange ? 'var(--shadow-glow-orange)' : 'var(--shadow-glow-violet)';

                        return (
                            <div
                                key={idx}
                                className="skill-card glass-panel"
                                style={{
                                    '--hover-glow': glowShadow,
                                    '--card-accent': accentColor
                                }}
                            >
                                <h4 className="skill-name">{skill.name}</h4>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="skills-empty-state glass-panel">
                    <Sparkles size={32} className="empty-icon animate-pulse" />
                    <h4>No matching skills found</h4>
                    <p>Try searching for another keyword or clearing your current filters.</p>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setSearchQuery(''); setSelectedCat('all'); }}>
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Skills;
