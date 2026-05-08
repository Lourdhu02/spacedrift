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
  title: "spacedrift.in — Engineering Projects · Data Annotation · Web Development",
  description:
    "spacedrift.in delivers expert engineering project guidance, production-grade data annotation, and high-performance business websites built with Next.js from Bengaluru, India.",
  keywords: [
    "engineering projects",
    "data annotation",
    "web development",
    "Next.js",
    "research paper assistance",
    "spacedrift",
    "Bengaluru",
  ],
  metadataBase: new URL("https://spacedrift.in"),
  openGraph: {
    title: "spacedrift.in — Engineering Projects · Data Annotation · Web Development",
    description: "Engineering project guidance, production-grade data annotation, and high-performance web development from Bengaluru.",
    url: "https://spacedrift.in",
    siteName: "spacedrift.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "spacedrift.in",
    description: "Engineering project guidance, data annotation, and web development from Bengaluru.",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
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
