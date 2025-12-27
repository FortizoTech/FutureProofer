import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
    step: number;
    className?: string;
}

// --- 1. Hyperspeed Background (Canvas) ---
const HyperspeedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number }[] = [];
        let width = 0;
        let height = 0;
        const focalLength = canvas.width;
        let warp = 0;
        const centerX = width / 2;
        const centerY = height / 2;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const numStars = 1000;
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = 'hsl(var(--background))'; // Clear with background color
            ctx.fillRect(0, 0, width, height);

            // Get primary color from CSS variable for the stars
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            // Convert HSL space-separated to comma-separated if needed, or just use it. 
            // Assuming tailwind variable format like "221.2 83.2% 53.3%"
            const colorStyle = `hsl(${primaryColor} / 0.8)`;

            ctx.fillStyle = colorStyle;

            warp += 0.05; // Speed

            stars.forEach((star) => {
                star.z -= 2; // Move star towards viewer

                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                const sx = (star.x / star.z) * width + width / 2;
                const sy = (star.y / star.z) * width + height / 2;

                // Draw star (streak)
                const size = (1 - star.z / width) * 2.5;
                ctx.beginPath();
                ctx.arc(sx, sy, size, 0, 2 * Math.PI);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 opacity-40" />;
};

// --- 2. Dot Grid Background (Canvas) ---
const DotGridBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let mouseX = 0;
        let mouseY = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            ctx.fillStyle = `hsl(${primaryColor})`;

            const gap = 30;
            const rows = Math.ceil(height / gap);
            const cols = Math.ceil(width / gap);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gap;
                    const y = j * gap;

                    // Distance from mouse
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Ripple effect
                    let size = 1.5;
                    if (dist < 200) {
                        size = 1.5 + (200 - dist) / 40;
                    }

                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 opacity-30" />;
};

// --- 3. Wave Gradient Background (CSS) ---
const WaveGradientBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-background">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-spin-slow opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-[100px] transform rotate-45" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-primary/20 via-transparent to-primary/20 blur-[100px] transform -rotate-45" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
        </div>
    );
};

// --- 4. Confetti Background (Canvas) ---
const ConfettiBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            const colors = [`hsl(${primaryColor})`, '#60A5FA', '#93C5FD', '#BFDBFE']; // Shades of blue

            for (let i = 0; i < 150; i++) {
                particles.push({
                    x: width / 2,
                    y: height / 2,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 5 + 2
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05; // Gravity
                p.vx *= 0.99; // Friction

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Reset if out of bounds (optional, or just let them fall)
                if (p.y > height) {
                    p.y = height + 10; // Stay out
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};

// --- Main Component ---
export const AnimatedBackground = ({ step, className }: AnimatedBackgroundProps) => {
    return (
        <div className={cn("fixed inset-0 -z-10 bg-background transition-all duration-1000", className)}>
            {step === 1 && <HyperspeedBackground />}
            {step === 2 && <DotGridBackground />}
            {step === 3 && <WaveGradientBackground />}
            {step === 4 && <ConfettiBackground />}

            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
        </div>
    );
};
