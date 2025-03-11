import "../globals.css"; 
import NavBar from "../components/NavBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "mapbox-gl/dist/mapbox-gl.css";
import { NextIntlClientProvider } from 'next-intl';

// RootLayout as an async server component with params as a Promise
export default async function LocaleLayout({
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
    <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
      <NavBar />
      {children}
    </NextIntlClientProvider>
  );
}