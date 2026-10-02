import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/lib/quote-context";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";
import JsonLd from "@/components/JsonLd";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

const title = "VaultVessel LLC — Shipping containers, conversions & marine, Miami FL";
const description =
  "Quote-only supply of shipping containers, converted spaces, reefers, site tanks, portable restrooms, and outboard motors from Miami, Florida.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  openGraph: { type: "website", siteName: SITE.name, title, description, locale: "en_US" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            address: { "@type": "PostalAddress", addressLocality: "Miami", addressRegion: "FL", addressCountry: "US" },
          }}
        />
        <QuoteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <QuoteDrawer />
        </QuoteProvider>
      </body>
    </html>
  );
}