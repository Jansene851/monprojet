import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Concours CI - Votre guide des concours en Côte d\'Ivoire',
  description: 'Informations complètes sur tous les concours en Côte d\'Ivoire. Quiz, actualités et ressources pour réussir.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50">
          {/* Header fixe avec hauteur connue (h-16) */}
          <Header />
          
          {/* Contenu principal avec padding-top pour compenser le header fixe */}
          <main className="pt-16">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}