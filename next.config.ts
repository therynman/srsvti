import type { NextConfig } from "next";

const nextConfig = {
    output: "export", // Enable static exports
    images: {
        unoptimized: true, // Required for static exports
    },
    // Optional: Enable trailing slashes for better compatibility
    trailingSlash: true,
};

module.exports = nextConfig;
