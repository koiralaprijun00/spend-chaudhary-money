import "./globals.css";
import NavBar from "./components/NavBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata = {
  title: "Piromomo: The Fun Side of Nepal You Didn’t Know You Needed!",
  description: "Discover quirky Nepali games—spend Binod Chaudhary’s billions or test your festival knowledge at Piromomo.com!",
  metadataBase: new URL("https://piromomo.com"),
  openGraph: {
    title: "Piromomo: The Fun Side of Nepal You Didn’t Know You Needed!",
    description: "Discover quirky Nepali games—spend Binod Chaudhary’s billions or test your festival knowledge at Piromomo.com!",
    url: "https://piromomo.com",
    siteName: "Piromomo",
    images: [
      {
        url: "https://piromomo.com/momo.png", // Full URL for consistency
        width: 800,
        height: 600,
        alt: "Piromomo - Fun Nepali Games Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piromomo: The Fun Side of Nepal You Didn’t Know You Needed!",
    description: "Spend a billionaire’s fortune or guess Nepali festivals—play now at Piromomo.com!",
    images: ["https://piromomo.com/momo.png"], // Full URL for consistency
  },
  verification: {
    google: "ca-pub-4708248697764153",
  },
  alternates: {
    canonical: "https://piromomo.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Mapbox CSS moved to <head> properly (no need for Head component from next/head here) */}
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <NavBar />
        {children}

        {/* Google Adsense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4708248697764153"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <GoogleAnalytics gaId="G-X744G6P5C9" />
      </body>
    </html>
  );
}