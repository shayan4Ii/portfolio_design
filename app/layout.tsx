import type { Metadata } from "next";
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

#test2

export const metadata: Metadata = {
  title: "Shayan - Full Stack Developer",
  description: "Professional portfolio of Shayan - Full Stack Developer specializing in modern web technologies, React, Next.js, and innovative digital solutions.",
  keywords: "full stack developer, web developer, react, nextjs, typescript, portfolio",
  authors: [{ name: "Shayan" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Shayan - Full Stack Developer",
    description: "Professional portfolio showcasing modern web development expertise",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
