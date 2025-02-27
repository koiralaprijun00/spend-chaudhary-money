import React from 'react';

interface ScoreBoardProps {
  score: number;
  gameMode: 'standard' | 'timed';
  timeLeft: number;
  isNepali: boolean;
  translations: Record<string, string>;
}

export default function ScoreBoard({
  score,
  gameMode,
  timeLeft,
  isNepali,
  translations,
}: ScoreBoardProps) {
  return (
    <div className="flex justify-between w-full max-w-2xl mb-4">
      <div className="bg-white px-4 py-2 rounded-lg shadow-md">
        <p className="font-bold">{isNepali ? translations['Score'] : 'Score'}: {score}</p>
      </div>
      {gameMode === 'timed' && (
        <div className={`bg-white px-4 py-2 rounded-lg shadow-md ${timeLeft < 10 ? 'bg-red-100' : ''}`}>
          <p className="font-bold">{isNepali ? translations['Time Left'] : 'Time Left'}: {timeLeft}s</p>
        </div>
      )}
    </div>
  );
}