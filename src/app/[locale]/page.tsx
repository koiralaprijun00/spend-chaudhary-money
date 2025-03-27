
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations("Translations"); 

  return (
    <main className="min-h-screen">
      
      <div className="relative z-10 container mx-auto flex flex-col items-start justify-between px-4 md:px-0">
        {/* Header Section - Enhanced with animation */}
        <div className="py-4 w-full">
  <div className="relative">
    {/* Updated background gradient with more vibrant colors */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 dark:from-purple-700 dark:via-pink-700 dark:to-orange-700 rounded-lg blur-xl opacity-50 scale-105 animate-pulse"></div>
  </div>
  {/* New title styling with solid color and shadow */}
  <h1 className="relative inline text-3xl md:text-6xl font-extrabold text-left bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
  {t('piromomo')}
  <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
</h1>  
  {/* Updated tagline with complementary colors and slight gradient */}
  <p className="mt-4 text-left text-sm sm:text-md font-medium text-gray-400 dark:text-gray-200">
    <span className="inline-block animate-bounce-light delay-100">{t('tagline')}</span>
  </p>
</div>

        {/* Fun Card Section - Improved layout for all screen sizes */}
        <div className="w-full my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          
          {/* Spend Binod Chaudhary's Money Card */}
          <Link href="/spend" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-purple-600 to-pink-500 dark:from-purple-700 dark:to-pink-600 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1 transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="text-yellow-500 animate-pulse">💰</span>
                <span>{t('billionaireBadge')}</span>
              </div>

              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-tobg-whit transition-colors duration-300 flex items-center justify-center">
                  <Image
                      src="/spend-money.png"
                      alt="Spend Binod Chaudhary's Money"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('spendBinodTitle')}</h2>
                  <p className="mt-1 text-white text-opacity-90">{t('spendBinodDescription')}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Guess the Festival Card */}
          <Link href="/guess-festival" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-red-500 to-amber-400 dark:from-red-600 dark:to-amber-500 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-yellow-100 text-orange-600 font-bold text-xs py-1 px-3 rounded-full shadow-md transform -rotate-2 hover:rotate-0 transition-transform flex items-center gap-1">
                <span className="text-sm animate-pulse">✨</span>
                <span>{t('quizBadge')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/guess-the-fesival.png"
                      alt="Festival Celebration"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('games.guessFestival.title')}</h2> {/* Fixed: Access nested key */}
                  <p className="mt-1 text-white text-opacity-90">{t('games.guessFestival.description')}</p> {/* Fixed: Access nested key */}
                </div>
              </div>
            </div>
          </Link>

          {/* Kings of Nepal Card - NEW */}
          <Link href="/kings-of-nepal" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-teal-600 to-blue-500 dark:from-teal-700 dark:to-blue-600 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1 transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="text-yellow-500 animate-pulse">👑</span>
                <span>{t('kingsOfNepal.badge')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/kings-of-nepal.png" 
                      alt="Kings of Nepal"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('kingsOfNepal.title')}</h2>
                  <p className="mt-1 text-white text-opacity-90">{t('kingsOfNepal.description')}</p>
                </div>
              </div>
            </div>
          </Link>
         
          {/* Name District */}
          <Link href="/name-districts" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-cyan-500 to-emerald-500 dark:from-cyan-600 dark:to-emerald-600 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1 transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="text-sm animate-pulse">🗺️</span>
                <span>{t('geography')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white transition-colors duration-300 flex items-center justify-center">
                  <Image
            src="/guess-district.png" 
            alt="Guess District"
            width={64}
            height={64}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm"> {t('nameDistrictTitle')} </h2>
                  <p className="mt-1 text-white text-opacity-90">{t('nameDistrictDescription')}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Life Checklist */}
          <Link href="/life-checklist" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-green-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-lime-500 to-cyan-400 dark:from-lime-600 dark:to-cyan-500 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1 transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="text-sm animate-pulse">✅</span>
                <span>{t('bucket')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-white transition-colors duration-300 flex items-center justify-center">
                  <Image
            src="/life-checklist.png" 
            alt="Life Checklist"
            width={64}
            height={64}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('nepalChecklist.navbarTitle')}</h2>
                  <p className="mt-1 text-white text-opacity-90">{t('nepalChecklist.description')}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Nepal GK Quiz Card */}
<Link href="/general-knowledge" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-3xl">
  <div className="relative px-6 py-12 h-full bg-gradient-to-br from-indigo-500 to-lime-400 dark:from-indigo-600 dark:to-lime-500 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
    {/* Badge */}
    <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1 transform -rotate-2 hover:rotate-0 transition-transform">
      <span className="text-yellow-500 animate-pulse">🧠</span>
      <span>{t('quizBadge')}</span>
    </div>
    
    {/* Main content */}
    <div className="flex items-center relative z-10">
      <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
        <div className="w-16 h-16 rounded-full bg-white transition-colors duration-300 flex items-center justify-center">
          <Image
            src="/gk-nepal.png" 
            alt="General Knowledge"
            width={64}
            height={64}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('nepalGk.titleshort') || 'Nepal General Knowledge Quiz'}</h2>
        <p className="mt-1 text-white text-opacity-90">{t('nepalGk.shortdescription') || 'Test your knowledge about Nepal with this quiz!'}</p>
      </div>
    </div>
  </div>
</Link>

{/* PattaLagau Geographic Game Card */}
<Link href="/patta-lagau" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded-3xl">
  <div className="relative px-6 py-12 h-full bg-gradient-to-br from-green-600 to-sky-500 dark:from-green-700 dark:to-sky-600 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
    {/* Badge */}
    <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1 transform -rotate-2 hover:rotate-0 transition-transform">
      <span className="text-sm animate-pulse">🏔️</span>
      <span>{t('geographyBadge') || 'Geography'}</span>
    </div>
    
    {/* Main content */}
    <div className="flex items-center relative z-10">
      <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src="/geo-nepal-icon.png" 
            alt="Nepal Map"
            width={64}
            height={64}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
          {t('pattalagauTitle') || 'PattaLagau'}
        </h2>
        <p className="mt-1 text-white text-opacity-90">
          {t('pattalagau.description') || 'Test your Nepal geography knowledge in this location-finding game!'}
        </p>
      </div>
    </div>
  </div>
</Link>

{/*Firsts of Nepal */}
<Link href="/first-of-nepal" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-3xl">
  <div className="relative px-6 py-12 h-full bg-gradient-to-br from-amber-500 to-violet-500 dark:from-amber-600 dark:to-violet-600 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
    {/* Badge */}
    <div className="absolute top-3 right-3 bg-white dark:bg-yellow-100 text-orange-600 font-bold text-xs py-1 px-3 rounded-full shadow-md transform -rotate-2 hover:rotate-0 transition-transform flex items-center gap-1">
      <span className="text-sm animate-pulse">✨</span>
      <span>{t('firstofNepalBadge')}</span>
    </div>
    
    {/* Main content */}
    <div className="flex items-center relative z-10">
      <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image
            src="/first-of-nepal.png"
            alt="First of Nepal"
            width={64}
            height={64}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('firstofNepalTitle')}</h2>
        <p className="mt-1 text-white text-opacity-90">{t('firstofNepalShortSubtitle')}</p>
      </div>
    </div>
  </div>
</Link>

<div className="w-full">
  <div id="ad-container-2" className="mx-auto my-4"></div>
  <Script id="google-adsense-2" strategy="lazyOnload">
    {`
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Ad error:', e);
      }
    `}
  </Script>
</div>

        </div>

        {/* Content Separator with visual element */}
        <div className="w-full flex justify-center my-8">
          <div className="relative w-3/4 max-w-md h-1 bg-gradient-to-r from-transparent via-orange-300 dark:via-orange-500 to-transparent">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
              <span className="text-2xl">🍜</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}