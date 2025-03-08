'use client';
import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LocaleSwitcher from '../../components/LocaleSwitcher';

interface GuessFestivalHeaderProps {
  gameMode: 'standard' | 'timed';
  switchGameMode: (mode: 'standard' | 'timed') => void;
}

export default function GuessFestivalHeader({
  gameMode,
  switchGameMode,
}: GuessFestivalHeaderProps) {
  // Get current locale and translations
  const t = useTranslations('Translations');

  return (
    <header className="mb-6 text-left">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-600">
          {t('title')}
        </h1>
        <LocaleSwitcher />
      </div>
      
      <div className="mt-2 flex flex-wrap gap-2 justify-start">
        <button
          onClick={() => switchGameMode('standard')}
          className={`px-3 py-1 rounded-full transition ${
            gameMode === 'standard' ? 'bg-sky-800 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {t('standardMode')}
        </button>
        <button
          onClick={() => switchGameMode('timed')}
          className={`px-3 py-1 rounded-full transition ${
            gameMode === 'timed' ? 'bg-sky-800 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {t('timedMode')}
        </button>
      </div>
    </header>
  );
}