import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="p-6 fixed w-full bg-white/80 backdrop-blur-md z-50">
          <Image
            src="/logo.svg"
            alt="SRVSVTI Logo"
            width={120}
            height={40}
            className="hover:scale-105 transition-transform"
          />
        </nav>
        {children}
        <Analytics />
      </body>
    </html>
  );
}