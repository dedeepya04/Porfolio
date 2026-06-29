import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ExternalLink, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';

const LinkedinIcon = ({ size = 22, ...props }) => (
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
        {...props}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);


const Contact = () => {
    const emailAddress = "dedeepyachilakala@gmail.com";
    const linkedinUrl = "https://www.linkedin.com/in/dedeepya-chilakala-63054b279";

    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success
    const [submitError, setSubmitError] = useState('');
    const [errors, setErrors] = useState({});

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy email: ", err);
        }
    };

    const validateForm = () => {
        const tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Name is required";
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Please enter a valid email address";
        }
        if (!formData.message.trim()) tempErrors.message = "Message cannot be empty";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setFormStatus('sending');
        setSubmitError('');

        // Fallback to localhost if environment variable is not defined
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setSubmitError('');
            } else {
                setSubmitError(data.error || 'Failed to send message. Please try again.');
                setFormStatus('idle');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            setSubmitError('Unable to connect to the email server. Please ensure the backend is running.');
            setFormStatus('idle');
        }
    };

    return (
        <div className="contact-grid">
            {/* Left side: Information Cards */}
            <div className="contact-info-panel">
                <div className="info-intro-card glass-panel">
                    <div className="card-glow-dot orange"></div>
                    <div className="info-header">
                        <Sparkles size={20} className="text-orange" />
                        <h3>Let's Collaborate</h3>
                    </div>
                    <p className="info-text">
                        Whether you have an exciting project, a job opportunity, or just want to chat, feel free to reach out. I'm always open to new connections!
                    </p>

                </div>

                <div className="channels-container">
                    {/* Gmail Card */}
                    <div className="channel-card glass-panel" onClick={handleCopyEmail} style={{ cursor: 'pointer' }}>
                        <div className="channel-icon-wrapper gmail">
                            <Mail size={22} />
                        </div>
                        <div className="channel-details">
                            <span className="channel-label">Email Me</span>
                            <span className="channel-value">{emailAddress}</span>
                        </div>
                        <button
                            className={`copy-btn ${copied ? 'copied' : ''}`}
                            aria-label="Copy email address"
                            onClick={(e) => { e.stopPropagation(); handleCopyEmail(); }}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>

                    {/* LinkedIn Card */}
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="channel-card glass-panel linkedin-link"
                    >
                        <div className="channel-icon-wrapper linkedin">
                            <LinkedinIcon size={22} />
                        </div>
                        <div className="channel-details">
                            <span className="channel-label">LinkedIn</span>
                            <span className="channel-value">Connect on LinkedIn</span>
                        </div>
                        <div className="arrow-btn">
                            <ExternalLink size={16} />
                        </div>
                    </a>
                </div>
            </div>

            {/* Right side: Interactive message form */}
            <div className="contact-form-panel glass-panel">
                <div className="card-glow-dot violet"></div>
                {formStatus !== 'success' ? (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-header">
                            <MessageSquare size={20} className="text-violet" />
                            <h3>Send a Quick Message</h3>
                        </div>

                        {submitError && (
                            <div className="submit-error-banner">
                                <AlertCircle size={18} />
                                <span>{submitError}</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={errors.name ? 'error' : ''}
                                    disabled={formStatus === 'sending'}
                                    required
                                />
                            </div>
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                    disabled={formStatus === 'sending'}
                                    required
                                />
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <div className="input-wrapper">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    placeholder="Type your message here..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={errors.message ? 'error' : ''}
                                    disabled={formStatus === 'sending'}
                                    required
                                ></textarea>
                            </div>
                            {errors.message && <span className="error-message">{errors.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary form-submit-btn"
                            disabled={formStatus === 'sending'}
                        >
                            {formStatus === 'sending' ? (
                                <>
                                    <span className="spinner"></span>
                                    <span>Sending Message...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={16} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="form-success-state">
                        <div className="success-icon-ring">
                            <div className="success-icon-check">
                                <Check size={36} />
                            </div>
                        </div>
                        <h3>Message Transmitted!</h3>
                        <p>Thank you for reaching out. Your message has been successfully logged. I'll get back to you shortly!</p>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setFormStatus('idle')}
                        >
                            Send Another Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;
