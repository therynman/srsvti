// src/components/home/InteractiveBackground.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            setMousePosition({ x, y });
        };

        const container = containerRef.current;
        container?.addEventListener("mousemove", handleMouseMove);

        return () => {
            container?.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-radial from-neutral-100 to-transparent"
                animate={{
                    background: `radial-gradient(circle at ${
                        mousePosition.x * 100
                    }% ${
                        mousePosition.y * 100
                    }%, rgb(245, 245, 245) 0%, transparent 50%)`,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
    );
}
