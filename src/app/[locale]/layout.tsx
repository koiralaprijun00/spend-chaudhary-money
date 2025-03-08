import "../globals.css"; 
import NavBar from "../components/NavBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "mapbox-gl/dist/mapbox-gl.css";
import { NextIntlClientProvider } from 'next-intl';

export const metadata = {
  title: "Piromomo: The Fun Side of Nepal You Didn't Know You Needed!",
  description: "Discover quirky Nepali games—spend Binod Chaudhary's billions or test your festival knowledge at Piromomo.com!",
  metadataBase: new URL("https://piromomo.com"),
  openGraph: {
    title: "Piromomo: The Fun Side of Nepal You Didn't Know You Needed!",
    description: "Discover quirky Nepali games—spend Binod Chaudhary's billions or test your festival knowledge at Piromomo.com!",
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
    description: "Spend a billionaire's fortune or guess Nepali festivals—play now at Piromomo.com!",
    images: ["https://piromomo.com/momo.png"],
  },
  verification: {
    google: "ca-pub-4708248697764153",
  },
  alternates: {
    canonical: "https://piromomo.com",
  },
};

// RootLayout as an async server component with params as a Promise
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Updated type for Next.js 15
}) {
  // Await params to resolve the locale
  const { locale } = await params;

  // Default to 'en' if locale is undefined (though this should rarely happen with proper routing)
  const resolvedLocale = locale || 'en';

  // Dynamically import the messages for the current locale
  let messages;
  try {
    messages = (await import(`../../../messages/${resolvedLocale}.json`)).default;
  } catch (error) {
    // Fallback to English if the locale file is not found
    messages = (await import('../../../messages/en.json')).default;
    console.error(`Failed to load messages for locale "${resolvedLocale}", falling back to "en":`, error);
  }

  return (
    <html lang={resolvedLocale}>
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
          <NavBar />
          {children}
        </NextIntlClientProvider>

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