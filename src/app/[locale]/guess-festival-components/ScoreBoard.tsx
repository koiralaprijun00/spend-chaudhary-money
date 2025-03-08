'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

interface ScoreBoardProps {
  score: number;
  gameMode: 'standard' | 'timed';
  timeLeft: number;
}

export default function ScoreBoard({
  score,
  gameMode,
  timeLeft,
}: ScoreBoardProps) {
  const t = useTranslations('Translations');
  
  return (
    <div className="flex justify-between w-full max-w-2xl mb-4">
      <div className="bg-white px-4 py-2 rounded-lg shadow-md">
        <p className="font-bold">{t('score')}: {score}</p>
      </div>
      {gameMode === 'timed' && (
        <div className={`bg-white px-4 py-2 rounded-lg shadow-md ${timeLeft < 10 ? 'bg-red-100' : ''}`}>
          <p className="font-bold">{t('timeLeft')}: {timeLeft}s</p>
        </div>
      )}
    </div>
  );
}