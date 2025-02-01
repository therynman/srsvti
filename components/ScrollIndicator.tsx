// components/ScrollIndicator.tsx
"use client";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
            <div className="animate-bounce w-6 h-10 border-2 border-[#606C38] rounded-full flex items-center justify-center">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1 h-2 bg-[#606C38] rounded-full"
                />
            </div>
        </motion.div>
    );
}
