import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Mouse coordinates tracker
        const mouse = {
            x: null,
            y: null,
            radius: 150 // Connection radius
        };

        // Resize Canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track Mouse Movement
        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4; // Slow velocity
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 1; // 1px to 2.5px
                
                // Color transition from violet to orange
                this.color = Math.random() > 0.5 ? '#ff5722' : '#8b5cf6';
            }

            update() {
                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction - magnetic pull effect
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        // Gentle pull
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= dx * force * 0.015;
                        this.y -= dy * force * 0.015;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                // Add a very subtle glow to particles
                ctx.shadowBlur = 4;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0; // reset
            }
        }

        // Initialize particles based on screen size
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 18000));
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Draw connecting lines between particles
        const connect = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Connection distance threshold
                    if (dist < 110) {
                        const alpha = (1 - (dist / 110)) * 0.12; // Translucent lines
                        
                        // Dynamic gradient stroke for connections between particles
                        const grad = ctx.createLinearGradient(
                            particles[a].x, particles[a].y,
                            particles[b].x, particles[b].y
                        );
                        grad.addColorStop(0, particles[a].color);
                        grad.addColorStop(1, particles[b].color);

                        ctx.strokeStyle = grad;
                        ctx.globalAlpha = alpha;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1.0; // reset
                    }
                }

                // Connect particles to mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[a].x - mouse.x;
                    const dy = particles[a].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - (dist / mouse.radius)) * 0.2;
                        ctx.strokeStyle = '#ff5722'; // Orange connector for mouse
                        ctx.globalAlpha = alpha;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1.0; // reset
                    }
                }
            }
        };

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="canvas-bg" />;
};

export default NeuralBackground;
