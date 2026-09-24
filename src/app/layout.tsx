import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Backdrop from "@/components/background/Backdrop";
import SmoothScroll from "@/components/motion/SmoothScroll";
import PointerFX from "@/components/motion/PointerFX";
import { SERVICES } from "@/lib/services";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "spacedrift — ML & AI studio, Bengaluru",
    template: "%s — spacedrift",
  },
  description:
    "Boutique ML & AI studio in Bengaluru. Fixed-scope research ops, document AI, RAG MVPs, data annotation, and web development, taken from raw input to a working handoff.",
  keywords: ["spacedrift", "machine learning", "document AI", "OCR", "RAG", "data annotation", "web development", "Bengaluru"],
  metadataBase: new URL("https://spacedrift.in"),
  openGraph: {
    title: "spacedrift — we turn noise into ML systems that ship",
    description: "Fixed scope, fixed price, one engineer accountable end to end.",
    url: "https://spacedrift.in",
    siteName: "spacedrift",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "spacedrift", description: "ML & AI studio, Bengaluru." },
  icons: { icon: "/favicon-512.png", apple: "/favicon-512.png" },
  authors: [{ name: "Lourdu Raju" }],
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "spacedrift",
  url: "https://spacedrift.in",
  email: "spacedrift.contact@gmail.com",
  founder: { "@type": "Person", name: "Lourdu Raju", jobTitle: "Machine Learning Engineer" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
};

// Hides animated content until GSAP takes over; bails after 4s if JS never boots.
const boot = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js')},4000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <Backdrop />
        <SmoothScroll />
        <PointerFX />
        <Nav />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
