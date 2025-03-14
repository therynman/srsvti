import type { Metadata } from "next";
import { dmSans } from "@/lib/fonts";
import "./globals.css";
import "@/lib/animations.css"; // Use the correct path to animations.css
import { Analytics } from "@vercel/analytics/react";

// Import client components
import ClientLayout from "@/components/common/ClientLayout";

export const metadata: Metadata = {
    title: "srsvti - Design Studio",
    description: "We craft digital experiences for forward-thinking brands",
    keywords:
        "design studio, digital experiences, brand design, UI/UX, web development",
    openGraph: {
        title: "srsvti - Design Studio",
        description: "We craft digital experiences for forward-thinking brands",
        url: "https://srsvti.com",
        siteName: "srsvti",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        title: "srsvti - Design Studio",
        description: "We craft digital experiences for forward-thinking brands",
        card: "summary_large_image",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${dmSans.variable}`}>
            <body className="antialiased font-sans">
                <ClientLayout>{children}</ClientLayout>
                <Analytics />
            </body>
        </html>
    );
}
