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
        {/* Open Graph Tags */}
        <meta property="og:title" content="Spend Binod's Money" />
        <meta property="og:description" content="Spend all of Binod's budget! Play now and see how fast you can use up his money!" />
        <meta property="og:url" content="https://piromomo.com/spend" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://piromomo.com/path/to/binod-transparent.png" />
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
