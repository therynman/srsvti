"use client";
import { motion } from "framer-motion";

export default function SkeletonLoader() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="h-48 bg-gray-100 rounded-lg animate-pulse"
                />
            ))}
        </div>
    );
}
