import localFont from "next/font/local";

export const display = localFont({
    src: [
        {
            path: "../public/fonts/HostGrotesk-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/HostGrotesk-Bold.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-display",
});

export const sans = localFont({
    src: "../public/fonts/HostGrotesk-Regular.woff2",
    variable: "--font-sans",
});
