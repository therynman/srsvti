import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import './globals.css';

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink-sans',
});

export const metadata: Metadata = {
  title: 'SRSVTI | Revenue Diagnosis',
  description: 'Digital infrastructure for high value prospects.',
};

import LenisProvider from '@/components/LenisProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${rethinkSans.variable} font-sans antialiased bg-[#010206] text-[#F7F7F8]`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
