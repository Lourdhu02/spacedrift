import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AsciiField from "@/components/background/AsciiField";
import RevealBoot from "@/components/system/RevealBoot";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "spacedrift.in — ML & AI services studio, Bengaluru",
    template: "%s — spacedrift.in",
  },
  description:
    "Boutique ML and AI services studio in Bengaluru. Fixed-scope research ops, document AI, RAG MVPs, data annotation, and web development. Noise → Parse → Model → Ship.",
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
    "ML engineer",
  ],
  metadataBase: new URL("https://spacedrift.in"),
  openGraph: {
    title: "spacedrift.in — Noise → Parse → Model → Ship",
    description:
      "Boutique ML and AI services studio in Bengaluru. Fixed scope, fixed price, direct engineering ownership.",
    url: "https://spacedrift.in",
    siteName: "spacedrift.in",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "spacedrift.in",
    description: "ML & AI services studio, Bengaluru.",
  },
  icons: {
    icon: "/favicon-512.png",
    apple: "/favicon-512.png",
  },
  authors: [{ name: "Lourdu Raju" }],
  creator: "Lourdu Raju",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "spacedrift.in",
  url: "https://spacedrift.in",
  email: "spacedrift.contact@gmail.com",
  founder: { "@type": "Person", name: "Lourdu Raju", jobTitle: "Machine Learning Engineer" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  description:
    "Boutique ML & AI services studio delivering fixed-scope research ops, document AI, RAG MVPs, data annotation, and web development.",
  sameAs: [],
  makesOffer: [
    "Research Ops for Academia",
    "Document AI & OCR",
    "RAG & AI MVPs",
    "Data Annotation",
    "Web Development",
  ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <RevealBoot />
        <AsciiField />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
