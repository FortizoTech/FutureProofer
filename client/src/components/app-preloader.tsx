import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "@assets/Future_Proofer_Logo-ig-square-1080-1080-removebg-preview_1762643734864.png";

interface AppPreloaderProps {
    onComplete: () => void;
}

export function AppPreloader({ onComplete }: AppPreloaderProps) {
    const [textIndex, setTextIndex] = useState(0);
    const loadingTexts = [
        "Analyzing Career Path...",
        "Syncing Market Data...",
        "Future Proofing..."
    ];

    useEffect(() => {
        // Cycle through texts
        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        }, 800);

        // Complete after 2.5s
        const timer = setTimeout(() => {
            clearInterval(textInterval);
            onComplete();
        }, 2500);

        return () => {
            clearInterval(textInterval);
            clearTimeout(timer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Logo Animation */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <img
                    src={logoUrl}
                    alt="Future Proofer"
                    className="h-24 w-24 relative z-10 drop-shadow-2xl"
                />

                {/* Spinning Ring */}
                <svg
                    className="absolute -inset-4 w-32 h-32 text-primary/30 animate-spin-slow"
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="20 10"
                    />
                </svg>
            </motion.div>

            {/* Text Cycling */}
            <div className="h-8 mb-6 overflow-hidden flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={textIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-serif text-lg font-medium text-primary/80"
                    >
                        {loadingTexts[textIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}
