/**
 * Layout racine de l'application Next.js
 * @module app/layout
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

/**
 * Configuration de la police Inter
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Métadonnées SEO de l'application
 */
export const metadata: Metadata = {
  title: {
    default: "PhotoGlow - Amélioration de Photos IA pour Rencontres",
    template: "%s | PhotoGlow",
  },
  description:
    "Améliorez vos photos de profil avec 7 services d'IA professionnels. Parfait pour Tinder, LinkedIn, Instagram et plus. Créez des portraits époustouflants en quelques secondes.",
  keywords: [
    "photo IA",
    "amélioration photo",
    "photo profil",
    "Tinder",
    "LinkedIn",
    "portrait IA",
    "génération image",
  ],
  authors: [{ name: "PhotoGlow" }],
  creator: "PhotoGlow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://photoglow.app",
    siteName: "PhotoGlow",
    title: "PhotoGlow - Amélioration de Photos IA",
    description:
      "Créez des photos de profil professionnelles avec l'intelligence artificielle",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PhotoGlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoGlow - Amélioration de Photos IA",
    description: "Créez des photos de profil professionnelles avec l'IA",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

/**
 * Composant Layout racine
 * Wrapper principal de l'application avec polices et styles globaux
 * 
 * @param props - Props du layout
 * @param props.children - Contenu des pages enfants
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Wrapper principal avec gestion de la hauteur minimale */}
        <div className="relative flex min-h-screen flex-col">
          {/* Contenu principal */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
