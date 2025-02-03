// app/fonts.ts
import localFont from "next/font/local";

export const display = localFont({
    src: "../public/fonts/HostGrotesk.woff2",
    variable: "--font-display",
    display: "swap",
});

export const sans = localFont({
    src: "../public/fonts/HostGrotesk.woff2",
    variable: "--font-sans",
    display: "swap",
});
