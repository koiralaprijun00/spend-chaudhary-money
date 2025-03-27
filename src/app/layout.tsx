import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import "mapbox-gl/dist/mapbox-gl.css"; // Keep this for build-time CSS inclusion
import { Metadata } from "next";
import { AuthProvider } from './[locale]/providers';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Piromomo: The Fun Side of Nepal You Didn't Know You Needed!",
  description:
    "Discover quirky Nepali games—spend Binod Chaudhary's billions or test your festival knowledge at Piromomo.com!",
  metadataBase: new URL("https://piromomo.com"),
  openGraph: {
    title: "Piromomo: The Fun Side of Nepal You Didn't Know You Needed!",
    description:
      "Discover quirky Nepali games—spend Binod Chaudhary's billions or test your festival knowledge at Piromomo.com!",
    url: "https://piromomo.com",
    siteName: "Piromomo",
    images: [
      {
        url: "https://piromomo.com/momo.png",
        width: 800,
        height: 600,
        alt: "Piromomo - Fun Nepali Games Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piromomo: The Fun Side of Nepal You Didn't Know You Needed!",
    description:
      "Spend a billionaire's fortune or guess Nepali festivals—play now at Piromomo.com!",
    images: ["https://piromomo.com/momo.png"],
  },
  alternates: {
    canonical: "https://piromomo.com",
  },
};

// In root layout, we don't need params
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <Script
          id="adsbygoogle-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4708248697764153`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Mapbox CSS is already imported at build time, but if you need it dynamically: */}
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
      <AuthProvider>
        {children}
        <Analytics />
        </AuthProvider>
        <GoogleAnalytics gaId="G-X744G6P5C9" />
      </body>
    </html>
  );
}