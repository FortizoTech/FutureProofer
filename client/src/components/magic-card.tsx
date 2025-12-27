import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

// Constants
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255'; // Purple-ish

// Helper to create particle element
const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 10;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    gradientColor?: string;
    enableTilt?: boolean;
    enableParticles?: boolean;
    particleCount?: number;
    enableMagnetism?: boolean;
}

export const MagicCard = ({
    children,
    className,
    gradientColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    enableParticles = true,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableMagnetism = false,
    ...props
}: MagicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLElement[]>([]);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef<HTMLElement[]>([]);
    const particlesInitialized = useRef(false);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    // Initialize particles
    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;
        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(Math.random() * width, Math.random() * height, gradientColor)
        );
        particlesInitialized.current = true;
    }, [particleCount, gradientColor]);

    // Clear particles
    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        magnetismAnimationRef.current?.kill();

        particlesRef.current.forEach(particle => {
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.in(1.7)',
                onComplete: () => {
                    particle.parentNode?.removeChild(particle);
                }
            });
        });
        particlesRef.current = [];
    }, []);

    // Animate particles
    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current || !enableParticles) return;

        if (!particlesInitialized.current) {
            initializeParticles();
        }

        memoizedParticles.current.forEach((particle, index) => {
            const timeoutId = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;

                const clone = particle.cloneNode(true) as HTMLElement;
                cardRef.current!.appendChild(clone);
                particlesRef.current.push(clone);

                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                gsap.to(clone, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true
                });

                gsap.to(clone, {
                    opacity: 0.3,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true
                });
            }, index * 100);

            timeoutsRef.current.push(timeoutId);
        });
    }, [initializeParticles, enableParticles]);

    useEffect(() => {
        if (!cardRef.current) return;
        const element = cardRef.current;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            animateParticles();
            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 5,
                    rotateY: 5,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearAllParticles();
            if (enableTilt) {
                gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
            }
            if (enableMagnetism) {
                gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableTilt && !enableMagnetism) return;
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (enableTilt) {
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                gsap.to(element, {
                    rotateX,
                    rotateY,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }

            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05;
                const magnetY = (y - centerY) * 0.05;
                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);

        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
            clearAllParticles();
        };
    }, [animateParticles, clearAllParticles, enableTilt, enableMagnetism]);

    return (
        <div
            ref={cardRef}
            className={cn(
                "relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-colors",
                "magic-card", // Marker class for spotlight
                className
            )}
            style={{
                '--glow-color': gradientColor
            } as React.CSSProperties}
            {...props}
        >
            {children}
        </div>
    );
};

export const MagicContainer = ({
    children,
    className,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}: {
    children: React.ReactNode;
    className?: string;
    spotlightRadius?: number;
    glowColor?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const spotlight = document.createElement('div');
        spotlight.className = 'global-spotlight';
        spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 50;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const mouseInside =
                e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

            if (!mouseInside) {
                gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
                return;
            }

            gsap.to(spotlightRef.current, {
                left: e.clientX,
                top: e.clientY,
                opacity: 0.6,
                duration: 0.1,
                ease: 'power2.out'
            });

            // Update cards glow
            const cards = containerRef.current.querySelectorAll('.magic-card');
            cards.forEach((card) => {
                const cardEl = card as HTMLElement;
                const cardRect = cardEl.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

                // Simple proximity glow logic
                if (dist < spotlightRadius) {
                    const intensity = 1 - dist / spotlightRadius;
                    cardEl.style.setProperty('--glow-intensity', intensity.toString());
                    const relX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
                    const relY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
                    cardEl.style.setProperty('--glow-x', `${relX}%`);
                    cardEl.style.setProperty('--glow-y', `${relY}%`);
                } else {
                    cardEl.style.setProperty('--glow-intensity', '0');
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            spotlightRef.current?.remove();
        };
    }, [glowColor, spotlightRadius]);

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            {children}
        </div>
    );
};
