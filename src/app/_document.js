import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preload LCP image - this is the most critical asset for performance */}
          <link
            rel="preload"
            href="/spend-money.png"
            as="image"
            type="image/png"
          />
          
          {/* DNS prefetch for third-party domains */}
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
          <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          
          {/* Preconnect to critical origins */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
          
          {/* Meta tags for better SEO and performance insights */}
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;