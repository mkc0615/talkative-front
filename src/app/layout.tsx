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

export const metadata: Metadata = {
  title: "Talkative - Real-time Chat App",
  description: "Connect with friends and colleagues in real-time with our modern chat application. Fast, secure, and easy to use.",
  keywords: ["chat", "messaging", "real-time", "communication", "instant messaging"],
  authors: [{ name: "Talkative Team" }],
  creator: "Talkative Team",
  publisher: "Talkative",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://talkative.app'),
  openGraph: {
    title: "Talkative - Real-time Chat App",
    description: "Connect with friends and colleagues in real-time with our modern chat application.",
    url: 'https://talkative.app',
    siteName: 'Talkative',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Talkative - Real-time Chat App",
    description: "Connect with friends and colleagues in real-time with our modern chat application.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
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
