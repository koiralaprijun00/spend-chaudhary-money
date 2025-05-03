'use client'

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import AdSense from "../components/AdSenseGoogle";

// Dynamically import non-critical components
const FeedbackButton = dynamic(() => import("../components/FeedbackButton"), {
  ssr: false
});

export default function HomePage() {
  const t = useTranslations("Translations"); 

  // Check current language (assuming 'ne' for Nepali and 'en' for English)
  const language = useLocale();

  return (
    <main className="min-h-screen">
      <div className="relative z-10 container mx-auto flex flex-col items-start justify-between px-4">
        {/* Header Section - Simplified animation for better performance */}
        <div className="py-4 w-full">
        <h1
  className={`nepali-text-title relative inline font-extrabold text-left bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent ${
    language === 'np' 
      ? "font-rozha text-4xl md:text-7xl" 
      : "font-capso text-3xl md:text-6xl"
  }`}
>
  {t('piromomo')}
</h1>
        </div>

        {/* Fun Card Section - Prioritize content and add loading strategy */}
        <div className="w-full mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
          
          {/* Spend Binod Chaudhary's Money Card - First card optimized as LCP element */}
          <Link href="/spend" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-purple-700 to-pink-700 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-purple-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span className="text-yellow-500">💰</span>
                <span>{t('billionaireBadge')}</span>
              </div>

              {/* Main content - LCP element */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/spend-money.png"
                      alt="Spend Binod Chaudhary's Money"
                      width={64}
                      height={64}
                      priority={true} // Add priority to LCP image
                      className="object-cover"
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
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-red-700 to-amber-600 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-orange-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span>✨</span>
                <span>{t('quizBadge')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/guess-the-fesival.png"
                      alt="Festival Celebration"
                      width={64}
                      height={64}
                      loading="lazy" // Lazy load non-critical images
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('games.guessFestival.title')}</h2>
                  <p className="mt-1 text-white text-opacity-90">{t('games.guessFestival.description')}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Kings of Nepal Card */}
          <Link href="/kings-of-nepal" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-teal-700 to-blue-500 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-blue-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span className="text-yellow-500">👑</span>
                <span>{t('kingsOfNepal.badge')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/kings-of-nepal.png" 
                      alt="Kings of Nepal"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
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
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-cyan-700 to-emerald-500 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-blue-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span>🗺️</span>
                <span>{t('geography')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/guess-district.png" 
                      alt="Guess District"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('nameDistrictTitle')}</h2>
                  <p className="mt-1 text-white text-opacity-90">{t('nameDistrictDescription')}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Gau Khane Katha */}
          <Link href="/gau-khane-katha" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-green-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-lime-700 to-cyan-500 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-green-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
              <span>🔍</span>
                <span>{t('RiddlesGame.badgeTitle')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/gau-khane-katha.png" 
                      alt="Gau Khane Katha"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('RiddlesGame.title')}</h2>
                  <p className="mt-1 text-white text-opacity-90">{t('RiddlesGame.subtitle')}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Nepal GK Quiz Card */}
          <Link href="/general-knowledge" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-indigo-700 to-lime-600 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-blue-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span className="text-yellow-500">🧠</span>
                <span>{t('quizBadge')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/gk-nepal.png" 
                      alt="General Knowledge"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
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

          {/*
          <Link href="/patta-lagau" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-green-700 to-sky-500 rounded-3xl shadow-lg overflow-hidden">
              <div className="absolute top-3 right-3 bg-white text-emerald-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span>🏔️</span>
                <span>{t('geographyBadge') || 'Geography'}</span>
              </div>
              
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/geo-nepal-icon.png" 
                      alt="Nepal Map"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
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
          */}

          {/* Logo Chineu ta? Game Card */}
          <Link href="/logo-quiz" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-purple-700 to-pink-500 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-purple-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span>🎨</span>
                <span>{t('logoQuiz.badge') || 'Logo Quiz'}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/logo-chineu.png" 
                      alt="Logo Quiz"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                    {t('logoQuiz.title') || 'Logo Chineu ta?'}
                  </h2>
                  <p className="mt-1 text-white text-opacity-90">
                    {t('logoQuiz.subtitle') || 'Test your brand recognition skills'}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Firsts of Nepal */}
          <Link href="/first-of-nepal" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-amber-700 to-violet-500 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-orange-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span>✨</span>
                <span>{t('firstofNepalBadge')}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/first-of-nepal.png"
                      alt="First of Nepal"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
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

         {/* Yo Ki Tyo (Would You Rather) Link */}
         <Link href="/yo-ki-tyo" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-3xl">
            <div className="relative px-6 py-12 h-full bg-gradient-to-br from-purple-700 to-pink-500 rounded-3xl shadow-lg overflow-hidden">
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-white text-purple-600 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                <span className="text-yellow-500">🤔</span>
                <span>{t('wouldYouRather.badge') || 'Would You Rather'}</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/yo-ki-tyo.png" 
                      alt="Yo Ki Tyo - Would You Rather"
                      width={64}
                      height={64}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">{t('wouldYouRather.title') || 'यो कि त्यो?'}</h2>
                  <p className="mt-1 text-white text-opacity-90">{t('wouldYouRather.shortDescription') || 'Nepali would you rather scenarios with real-time voting!'}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Lazy load Feedback Button */}
      <Suspense fallback={null}>
        <FeedbackButton />
      </Suspense>
    </main>
  );
}