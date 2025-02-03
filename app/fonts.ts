// app/fonts.ts
import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const sans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const display = localFont({
    src: "../public/fonts/HostGrotesk.woff2",
    variable: "--font-display",
});
