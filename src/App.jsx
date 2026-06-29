import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NeuralBackground from './components/NeuralBackground';
import Education from './components/Education';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Activities from './components/Activities';
import Internships from './components/Internships';
import Projects from './components/Projects';


function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Scroll Spy & Reveal-on-Scroll Logic
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const handleScroll = () => {
      let currentSection = 'hero';
      const scrollPos = window.scrollY;

      // Scroll Spy
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top - height / 3) {
          currentSection = section.getAttribute('id');
        }
      });
      setActiveSection(currentSection);
    };

    // Scroll Reveal Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Trigger animation once
        }
      });
    }, observerOptions);

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <div className={`app-layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* 1. Interactive AI Neural Particle Background */}
      <NeuralBackground />

      {/* 2. Floating Ambient Glow Elements */}
      <div className="ambient-glow glow-orange"></div>
      <div className="ambient-glow glow-violet"></div>

      {/* 3. Navigation Sidebar */}
      <Navbar
        activeSection={activeSection}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* 4. Main Portfolio Layout Sections */}
      <main className="content-wrapper">

        {/* Hero Section */}
        <Hero />



        {/* Education Section */}
        <section id="education" className="section">
          <div className="section-container reveal-on-scroll">
            <div className="badge">Academics</div>
            <h2 className="section-title">Education</h2>
            <Education />
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="section">
          <div className="section-container reveal-on-scroll">
            <div className="badge">Credentials</div>
            <h2 className="section-title">Certifications & Achievements</h2>
            <Certifications />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section">
          <div className="section-container reveal-on-scroll">
            <div className="badge">Expertise</div>
            <h2 className="section-title">Skills & Capabilities</h2>
            <Skills />
          </div>
        </section>

        {/* Internships Section */}
        <section id="internships" className="section">
          <div className="section-container reveal-on-scroll">
            <div className="badge">Professional</div>
            <h2 className="section-title">Experience & Internships</h2>
            <Internships />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="section-container reveal-on-scroll">
            <div className="badge">Engineering Showcase</div>
            <h2 className="section-title">Featured Projects</h2>
            <Projects />
          </div>
        </section>

        {/* Extra-Curricular & Co-Curricular Activities Section */}
        <section id="activities" className="section">
          <div className="section-container reveal-on-scroll">
            <div className="badge">Beyond Coding</div>
            <h2 className="section-title">Extra-Curricular Activities</h2>
            <Activities />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="section-container reveal-on-scroll">
            <div className="badge">Connection</div>
            <h2 className="section-title">Get In Touch</h2>
            <Contact />
          </div>
        </section>
      </main>

      {/* Styles for reveal-on-scroll animations */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default App;
