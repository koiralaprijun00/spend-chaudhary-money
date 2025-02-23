import Link from "next/link"
import Image from "next/image"
import Script from "next/script";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Header Section */}
      <div className="p-4 flex flex-col items-center">
        <Image src="/images/momo-header.png" alt="Piromomo Logo" width={140} height={140} className="mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Piromomo!</h1>
        <p className="mt-2 text-center text-base sm:text-lg">Spicy Momo Fixes Everything</p>
      </div>

      {/* Card Section */}
      <div className="w-full mb-12 px-4 sm:w-3/4 md:w-[45%] self-start">
        <Link href="/spend" className="block">
          <div className="relative px-6 py-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex items-center">
            <div className="flex items-center justify-center w-16 aspect-square rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-4">
                <span className="text-white text-xl md:text-xl lg:text-2xl">$</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Spend Binod Chaudhary's Money</h2>
              </div>
            </div>
            {/* Hide Binod image on mobile (screens below the "sm" breakpoint) */}
            <Image src="/binod-transparent.png" alt="Binod" width={100} height={100} className="hidden sm:block absolute bottom-0 right-0" />
          </div>
        </Link>
      </div>

       {/* Adsense Script */}
     <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4708248697764153"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* Piro Momo Below Header */}
      <div className="w-full">
  <ins
    className="adsbygoogle"
    style={{ display: "block" }}
    data-ad-client="ca-pub-4708248697764153"
    data-ad-slot="1820052970"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
</div>

      <Script id="adsense-init" strategy="afterInteractive">
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </Script>

    </main>
  )
}
