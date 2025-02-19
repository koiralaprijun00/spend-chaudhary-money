import Head from "next/head"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import NavBar from "./components/NavBar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata = {
  title: "Spend Binod’s Money - Fun Simulator",
  description: "Try spending Binod Chaudhary’s billionaire fortune! A fun spending simulator to test how fast you can use NPR 240 billion.",
  openGraph: {
    title: "Spend Binod’s Money - Fun Game",
    description: "How fast can you spend USD 1.8 Billion? Test yourself now!",
    url: "https://piromomo.com",
    siteName: "Spend Binod’s Money",
    images: [
      {
        url: "/images/binod-chaudhary-profile.jpg",
        width: 800,
        height: 600
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Spend Binod’s Money - Fun Simulator",
    description: "A billionaire spending game featuring Nepal’s first billionaire, Binod Chaudhary!",
    images: ["/images/binod-chaudhary-profile.jpg"]
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
        {/* Google Adsense */}
        <meta name="google-adsense-account" content="ca-pub-4708248697764153" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="How Rich is Binod Chaudhary? Nepal’s First Billionaire" />
        <meta property="og:description" content="Learn about Binod Chaudhary, Nepal’s only billionaire, his net worth, business success, and philanthropy." />
        <meta property="og:image" content="/images/binod-chaudhary-profile.jpg" />
        <meta property="og:url" content="https://piromomo.com/spend" />
        <meta property="og:type" content="article" />

        {/* Twitter Card (for Twitter SEO) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How Rich is Binod Chaudhary? Nepal’s First Billionaire" />
        <meta name="twitter:description" content="Learn about Nepal’s only billionaire and his journey to success." />
        <meta name="twitter:image" content="/images/binod-chaudhary-profile.jpg" />

        {/* Canonical URL (Prevents Duplicate Content Issues) */}
        <link rel="canonical" href="https://piromomo.com/spend" />
        {/* Adsense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4708248697764153" crossOrigin="anonymous" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
