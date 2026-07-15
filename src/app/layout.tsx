import type { Metadata } from "next";
import { Syne, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/lib/lenis";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "spacedrift.in",
  description:
    "spacedrift — ML and AI services studio from Bengaluru, India.",
  keywords: [
    "spacedrift",
    "machine learning",
    "artificial intelligence",
    "document AI",
    "OCR",
    "RAG",
    "data annotation",
    "web development",
    "Bengaluru",
  ],
  metadataBase: new URL("https://spacedrift.in"),
  openGraph: {
    title: "spacedrift.in",
    description: "spacedrift — ML and AI services studio from Bengaluru, India.",
    url: "https://spacedrift.in",
    siteName: "spacedrift.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "spacedrift.in",
    description: "spacedrift — ML and AI services studio from Bengaluru, India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "spacedrift.in",
    description: "Fixed-scope ML, AI, OCR, RAG, data annotation, and web development services from Bengaluru.",
  },
  icons: {
    icon: "/favicon-512.png",
    apple: "/favicon-512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#060606" />
      </head>
      <body>
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
