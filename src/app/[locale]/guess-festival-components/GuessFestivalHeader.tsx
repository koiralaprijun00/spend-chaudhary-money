'use client';
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '../../../i18n/navigation';

interface GuessFestivalHeaderProps {
  gameMode: 'standard' | 'timed';
  switchGameMode: (mode: 'standard' | 'timed') => void;
}

export default function GuessFestivalHeader({
  gameMode,
  switchGameMode,
}: GuessFestivalHeaderProps) {
  // Get current locale and translations
  const locale = useLocale();
  const t = useTranslations('games.guessFestival');
  const commonT = useTranslations('common');
  
  // The opposite locale for the language toggle
  const oppositeLocale = locale === 'en' ? 'ne' : 'en';
  const oppositeLocaleLabel = locale === 'en' ? 'नेपालीमा' : 'in English';

  return (
    <header className="mb-6 text-left">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-600">
          {t('title')}
        </h1>
        <Link 
          href="/" 
          locale={oppositeLocale}
          className="px-4 py-2 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 text-sm md:text-md font-medium rounded-full shadow-sm hover:bg-orange-200 dark:hover:bg-orange-700 hover:shadow-md transition-all duration-300"
        >
          {oppositeLocaleLabel}
        </Link>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-2 justify-start">
        <button
          onClick={() => switchGameMode('standard')}
          className={`px-3 py-1 rounded-full transition ${
            gameMode === 'standard' ? 'bg-sky-800 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {commonT('standardMode')}
        </button>
        <button
          onClick={() => switchGameMode('timed')}
          className={`px-3 py-1 rounded-full transition ${
            gameMode === 'timed' ? 'bg-sky-800 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {commonT('timedMode')}
        </button>
      </div>
    </header>
  );
}