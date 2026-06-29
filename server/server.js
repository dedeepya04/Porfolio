import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables relative to this script's directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // In production, replace with your frontend URL
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Email server is running' });
});

// Contact Form POST endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || !email.trim()) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
    }
    if (!message || !message.trim()) {
        return res.status(400).json({ error: 'Message content is required' });
    }

    const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
    const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : '';
    const resendApiKey = process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.trim() : '';

    // Check configuration
    if (!resendApiKey && (!emailUser || !emailPass)) {
        console.error('Email configuration is incomplete. Set either RESEND_API_KEY or SMTP credentials (EMAIL_USER/EMAIL_PASS).');
        return res.status(500).json({ 
            error: 'Server email configuration is incomplete. Please set up the credentials (RESEND_API_KEY or SMTP credentials) in the backend environment variables.' 
        });
    }

    const recipient = process.env.RECEIVER_EMAIL || emailUser || 'dedeepyachilakala@gmail.com';
    const emailHtmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 20px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
                <h2 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Portfolio Contact</h2>
            </div>
            <div style="padding: 24px; line-height: 1.6;">
                <p style="margin-top: 0; font-size: 16px; color: #4a5568;">You have received a new message from the contact form on your portfolio website.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #4a5568; width: 100px; border-bottom: 1px solid #edf2f7;">Sender:</td>
                        <td style="padding: 8px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email:</td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
                    </tr>
                </table>
                
                <div style="margin-top: 24px;">
                    <h4 style="margin: 0 0 10px 0; color: #4a5568; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</h4>
                    <div style="background-color: #f7fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 4px; font-style: italic; white-space: pre-wrap; color: #2d3748;">${message}</div>
                </div>
            </div>
            <div style="padding: 16px; text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; margin-top: 20px;">
                This email was automatically generated and sent from your portfolio website backend.
            </div>
        </div>
    `;

    // 1. If Resend API Key is provided, use Resend HTTP API (works perfectly on Render free tier)
    if (resendApiKey) {
        try {
            console.log('Attempting to send email via Resend API...');
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: `Portfolio Contact <onboarding@resend.dev>`,
                    to: recipient,
                    reply_to: email,
                    subject: `New Portfolio Message from ${name}`,
                    html: emailHtmlContent,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Resend API response error:', data);
                throw new Error(data.message || `Resend API returned status ${response.status}`);
            }

            console.log('Email sent successfully via Resend API:', data);
            return res.status(200).json({ success: true, message: 'Email sent successfully via Resend!' });
        } catch (error) {
            console.error('Error sending email via Resend:', error);
            return res.status(500).json({ 
                error: 'Failed to send message via Resend API. Please check backend logs or API Key.',
                details: error.message 
            });
        }
    }

    // 2. Otherwise, fall back to Nodemailer SMTP (e.g. for local development)
    console.log('Attempting to send email via Nodemailer SMTP...');
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_PORT === '465', // true for 465, false for 587
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });

    const mailOptions = {
        from: `"${name}" <${emailUser}>`,
        replyTo: email,
        to: recipient,
        subject: `New Portfolio Message from ${name}`,
        text: `You have received a new contact message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: emailHtmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully via SMTP');
        res.status(200).json({ success: true, message: 'Email sent successfully via SMTP!' });
    } catch (error) {
        console.error('Error sending email via SMTP:', error);
        res.status(500).json({ 
            error: 'Failed to send message. Please verify the SMTP configuration or try again later.',
            details: error.message 
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Endpoint ready at http://localhost:${PORT}/api/contact`);
});
