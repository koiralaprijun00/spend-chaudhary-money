import "./globals.css"
import NavBar from "./components/NavBar"
import { GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from "next/head"

export const metadata = {
  title: "Piromomo - Spend Binod's Money & Guess the Festival",
  description: "Try spending Binod Chaudhary's billionaire fortune or test your knowledge of Nepali festivals!",
  metadataBase: new URL("https://piromomo.com"),
  openGraph: {
    title: "Piromomo - Fun Games with a Nepali Twist",
    description: "Spend NPR 240 billion or test your festival knowledge with our interactive games!",
    url: "https://piromomo.com",
    siteName: "Piromomo",
    images: [
      {
        url: "/momo.png",
        width: 800,
        height: 600,
        alt: "Binod Chaudhary Profile"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Piromomo - Nepali Interactive Games",
    description: "Spend a billionaire's fortune or test your festival knowledge!",
    images: ["/momo.png"]
  },
  verification: {
    google: "ca-pub-4708248697764153"
  },
  alternates: {
    canonical: "https://piromomo.com"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
      <link href='https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
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
  )
}