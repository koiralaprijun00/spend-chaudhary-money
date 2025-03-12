// src/app/[locale]/guess-festival-components/AnswerReveal.tsx
'use client';
import React from 'react';
import { MdShare } from 'react-icons/md';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

interface AnswerRevealProps {
  isAnswered: boolean;
  isCorrect: boolean;
  feedback: string;
  currentFestival: {
    id: string;
    name: string;
    fact: string;
    image: string;
  };
  handleNextFestival: () => void;
  restartGame: () => void;
  handleShareScore: () => void;
  score: number;
}

export default function AnswerReveal({
  isAnswered,
  isCorrect,
  feedback,
  currentFestival,
  handleNextFestival,
  restartGame,
  handleShareScore,
  score,
}: AnswerRevealProps) {
  // Get translations
  const t = useTranslations('Translations');
  const locale = useLocale();
  
  return (
    <>
      <div className="flex gap-3 mt-4 order-1 justify-end">
        <button
          onClick={handleShareScore}
          className={`px-4 py-2 bg-orange-500 text-white rounded-full flex items-center transition duration-300 ${
            isAnswered ? 'hover:bg-orange-600' : 'bg-orange-300 cursor-not-allowed'
          }`}
          disabled={!isAnswered}
        >
          <MdShare className="mr-2" />
          {t('shareScore')}
        </button>
        <button
          onClick={handleNextFestival}
          className={`px-6 py-2 rounded-full transition duration-300 ${
            isAnswered
              ? 'bg-sky-800 text-white hover:bg-sky-950'
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
          disabled={!isAnswered}
        >
          {t('nextFestival')}
        </button>
      </div>
      <div className="border-t border-gray-200 pt-6 mt-6">
        {isAnswered && (
          <>
            <div className={`text-xl font-bold mb-3 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {feedback}
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">
              {t('itsTheAnswer')}{' '}
              <span className="text-red-600">
                {currentFestival.name}
              </span>
              !
            </p>
            <p className="text-gray-600 mt-3 text-lg">{currentFestival.fact}</p>
            
            {/* Updated link to ensure it points to the correct path */}
            <Link 
              href={`/${locale}/blog/festivals/${currentFestival.id.toLowerCase()}`}
              className="inline-block mt-2 font-bold text-sky-400 hover:text-sky-600 hover:underline"
            >
              {t('learnMoreAbout', {defaultValue: 'Learn more about'})} {currentFestival.name} →
            </Link>
            
            <p className="text-gray-800 mt-2 text-md font-semibold">{t('totalScore')}: {score}</p>
          </>
        )}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-t border-gray-200 pt-4 mt-4">
          <button
            onClick={restartGame}
            className="text-gray-600 border-b border-gray-600 hover:text-gray-800 transition-colors order-2 mt-8 md:mt-0"
          >
            {t('restartGame')}
          </button>
        </div>
      </div>
    </>
  );
}