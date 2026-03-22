import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
 subsets: ['latin'],
 weight: ['400', '500', '600', '700'],
 variable: '--font-poppins',
});

export const metadata: Metadata = {
 title: 'SRSVTI | Revenue Diagnosis',
 description: 'Digital infrastructure for high value prospects.',
};

import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" suppressHydrationWarning>
 <body suppressHydrationWarning className={`${poppins.variable} font-sans antialiased bg-[#121212] text-white`}>
 <CustomCursor />
 <LenisProvider>
 {children}
 </LenisProvider>
 </body>
 </html>
 );
}
