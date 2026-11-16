import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ceará Prime Imóveis S.A. | Private CRM & Concierge IA",
  description:
    "Plataforma de luxo para gestão de leads imobiliários, triagem por IA via n8n e atendimento instantâneo em Fortaleza-CE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${cormorant.variable}`}
    >
      <body className="min-h-dvh font-sans tracking-normal antialiased selection:bg-gold-400/25 selection:text-gold-200">
        {children}
      </body>
    </html>
  );
}
