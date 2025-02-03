// app/layout.tsx
import { display, sans } from "./fonts";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import FluidHover from "@/components/FluidHover"; // Import your FluidHover component

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${display.variable} ${sans.variable}`}>
            <body>
                <nav className="p-6 fixed w-full bg-background/10 backdrop-blur-lg z-50 flex justify-between items-center">
                    <Image src="/logo.svg" alt="Logo" width={80} height={32} />
                    <div className="flex gap-8">
                        <FluidHover>
                            <button className="text-sm uppercase tracking-wider">
                                Work
                            </button>
                        </FluidHover>
                        <FluidHover>
                            <button className="text-sm uppercase tracking-wider">
                                Contact
                            </button>
                        </FluidHover>
                    </div>
                </nav>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
