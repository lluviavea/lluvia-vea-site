import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { DigitalTwinLoader } from "@/components/digital-twin-loader";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { profile, siteUrl } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif-display",
  weight: "400",
  subsets: ["latin"],
});

const title = `${profile.shortName} — ${profile.role}`;
const description = `${profile.role} en ${profile.locationShort}. Cosmiatría facial, diagnóstico de piel y aparatología, con visión de marketing.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.shortName}`,
  },
  description,
  applicationName: profile.shortName,
  keywords: [
    "cosmiatra",
    "cosmiatría",
    "Culiacán",
    "Sinaloa",
    "diagnóstico facial",
    "aparatología",
    "marketing",
    "Serendipia",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: profile.shortName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider>
          <div aria-hidden className="grain" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <DigitalTwinLoader />
      </body>
    </html>
  );
}
