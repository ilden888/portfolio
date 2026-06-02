import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#080808] text-[#f0f0f0] antialiased">
        {children}
      </body>
    </html>
  );
}
