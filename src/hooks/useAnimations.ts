// src/hooks/useAnimations.ts
import { Variants } from "framer-motion";

export const customEase = [0.6, 0.01, 0.05, 0.95];

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { duration: 0.8, ease: customEase }
    }
};

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: customEase }
    }
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const scaleIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
        scale: 1,
        opacity: 1,
        transition: { duration: 0.8, ease: customEase }
    }
};

export const slideIn = (direction: "left" | "right" | "up" | "down"): Variants => {
    const directions = {
        left: { x: -100, y: 0 },
        right: { x: 100, y: 0 },
        up: { x: 0, y: 100 },
        down: { x: 0, y: -100 }
    };

    return {
        hidden: { 
            ...directions[direction],
            opacity: 0 
        },
        visible: { 
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: customEase }
        }
    };
};

// Use this to sequence animations based on scroll
export const scrollReveal: Variants = {
    hidden: { 
        opacity: 0,
        y: 60,
        transition: { duration: 0.8, ease: customEase }
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: customEase }
    }
};