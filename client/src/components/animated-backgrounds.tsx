import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// --- 1. Beams (Step 1) ---
const Beams = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const beams: { x: number; width: number; speed: number; opacity: number }[] = [];
        for (let i = 0; i < 10; i++) {
            beams.push({
                x: Math.random() * width,
                width: Math.random() * 100 + 50,
                speed: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Primary color base
            const primaryHue = 221; 

            beams.forEach(beam => {
                const gradient = ctx.createLinearGradient(beam.x, 0, beam.x + beam.width, 0);
                gradient.addColorStop(0, `hsla(${primaryHue}, 80%, 50%, 0)`);
                gradient.addColorStop(0.5, `hsla(${primaryHue}, 80%, 50%, ${beam.opacity})`);
                gradient.addColorStop(1, `hsla(${primaryHue}, 80%, 50%, 0)`);

                ctx.fillStyle = gradient;
                // Slanted beams
                ctx.beginPath();
                ctx.moveTo(beam.x, 0);
                ctx.lineTo(beam.x + beam.width, 0);
                ctx.lineTo(beam.x + beam.width - 200, height);
                ctx.lineTo(beam.x - 200, height);
                ctx.closePath();
                ctx.fill();

                beam.x += beam.speed;
                if (beam.x - 200 > width) {
                    beam.x = -beam.width;
                }
            });

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// --- 2. Prism (Step 2) ---
const Prism = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const prisms: { x: number; y: number; size: number; rotation: number; speed: number; color: string }[] = [];
        for (let i = 0; i < 30; i++) {
            prisms.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 40 + 20,
                rotation: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.5 + 0.1,
                color: `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.15)` // Blue/Cyan/Purple range
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            prisms.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);

                ctx.beginPath();
                ctx.moveTo(0, -p.size);
                ctx.lineTo(p.size, p.size);
                ctx.lineTo(-p.size, p.size);
                ctx.closePath();

                ctx.fillStyle = p.color;
                ctx.fill();
                ctx.strokeStyle = p.color.replace('0.15', '0.3');
                ctx.stroke();

                ctx.restore();

                p.y -= p.speed;
                p.rotation += 0.005;

                if (p.y + p.size < 0) {
                    p.y = height + p.size;
                    p.x = Math.random() * width;
                }
            });

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// --- 3. Liquid Ether (Step 3) ---
const LiquidEther = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            const blobs = [
                { x: width * 0.3, y: height * 0.3, r: 400, color: 'hsla(221, 83%, 53%, 0.2)' },
                { x: width * 0.7, y: height * 0.7, r: 500, color: 'hsla(200, 80%, 60%, 0.2)' },
                { x: width * 0.5, y: height * 0.5, r: 350, color: 'hsla(240, 70%, 70%, 0.2)' },
            ];

            blobs.forEach((blob, i) => {
                const x = blob.x + Math.sin(time + i) * 150;
                const y = blob.y + Math.cos(time * 0.8 + i) * 150;
                
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.r);
                gradient.addColorStop(0, blob.color);
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, blob.r, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// --- 4. Ballpit (Step 4) ---
const Ballpit = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const balls: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
        const colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8'];

        for (let i = 0; i < 50; i++) {
            balls.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                r: Math.random() * 10 + 5,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            balls.forEach(ball => {
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Bounce off walls
                if (ball.x + ball.r > width || ball.x - ball.r < 0) ball.vx *= -1;
                if (ball.y + ball.r > height || ball.y - ball.r < 0) ball.vy *= -1;

                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
                ctx.fillStyle = ball.color;
                ctx.fill();
            });

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0" />;
};

interface AnimatedBackgroundProps {
    step: number;
    className?: string;
}

export const AnimatedBackground = ({ step, className }: AnimatedBackgroundProps) => {
    return (
        <div className={cn("fixed inset-0 -z-10 overflow-hidden bg-background", className)}>
            {step === 1 && <Beams />}
            {step === 2 && <Prism />}
            {step === 3 && <LiquidEther />}
            {step === 4 && <Ballpit />}
            
            {/* Subtle dark overlay to maintain readability and glassmorphism */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
        </div>
    );
};
