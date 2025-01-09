import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppClientProvider from "@/provider/AppClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abi.vision'), // Replace with your actual domain
  title: {
    default: "ABI Vision | Smart Contract Interaction Tool",
    template: "%s | ABI Vision"
  },
  description: "ABI Vision is an open-source tool for visualizing and interacting with smart contracts. Supporting multi-chain operations with a secure, local-first approach.",
  keywords: [
    "smart contract",
    "ABI",
    "blockchain",
    "Web3",
    "DApp",
    "Ethereum",
    "contract interaction",
    "blockchain tools"
  ],
  authors: [{ name: "ABI Vision Team" }],
  creator: "ABI Vision",
  publisher: "ABI Vision",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abi.vision',
    title: 'ABI Vision | Smart Contract Interaction Tool',
    description: 'Open-source tool for visualizing and interacting with smart contracts across multiple chains.',
    siteName: 'ABI Vision',
    images: [{
      url: 'https://abi.vision/og-image.jpg', // Add actual preview image
      width: 1200,
      height: 630,
      alt: 'ABI Vision - Smart Contract Interaction Tool'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABI Vision | Smart Contract Interaction Tool',
    description: 'Open-source smart contract interaction tool with multi-chain support.',
    images: ['https://abi.vision/twitter-image.jpg'], // Add actual preview image
    creator: '@abivision'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
   
  // manifest: '/site.webmanifest',
  // verification: {
  //   google: 'your-google-site-verification', // Add Google Search Console verification code
  // },
};

import Header from '@/components/header';

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
        <AppClientProvider>
          <Header />
          {children}
        </AppClientProvider>
      </body>
    </html>
  );
}
