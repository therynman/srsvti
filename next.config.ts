import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        turbo: {
            rules: {
                // Your Turbo rules here if needed
            },
        },
    },
};

export default nextConfig;
