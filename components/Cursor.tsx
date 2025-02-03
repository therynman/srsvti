"use client";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { cursorVariant } from "@/lib/store";

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [variant, setVariant] = useAtom(cursorVariant);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", mouseMove);
        return () => window.removeEventListener("mousemove", mouseMove);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-6 h-6 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
            animate={{
                x: position.x - 12,
                y: position.y - 12,
                scale: variant === "hover" ? 2 : 1,
            }}
            transition={{ type: "spring", mass: 0.1 }}
        />
    );
}
