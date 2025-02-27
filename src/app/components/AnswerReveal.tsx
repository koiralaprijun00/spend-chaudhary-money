import React from 'react';
import { Festival } from '../../../types';
import { MdShare } from 'react-icons/md';

interface AnswerRevealProps {
  isAnswered: boolean;
  isCorrect: boolean;
  feedback: string;
  currentFestival: Festival;
  isNepali: boolean;
  translations: Record<string, string>;
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
  isNepali,
  translations,
  handleNextFestival,
  restartGame,
  handleShareScore,
  score,
}: AnswerRevealProps) {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      {isAnswered && (
        <>
          <div className={`text-xl font-bold mb-3 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            It's{' '}
            <span className="text-red-600">
              {isNepali
                ? translations[currentFestival.name as keyof typeof translations] || currentFestival.name
                : currentFestival.name}
            </span>
            !
          </p>
          <div className="mt-4 mb-4 overflow-hidden rounded-lg max-h-60 flex justify-center">
            <img
              src={currentFestival.image || '/api/placeholder/400/300'}
              alt={currentFestival.name}
              className="object-cover h-full w-full"
            />
          </div>
          <p className="text-gray-600 mt-3 text-lg">{currentFestival.fact}</p>
          <p className="text-gray-800 mt-2 text-md font-semibold">Total Score: {score}</p>
        </>
      )}
      <div className="flex justify-between items-center gap-3 border-t border-gray-200 pt-4 mt-4">
        <button
          onClick={restartGame}
          className="text-gray-600 border-b border-gray-600 hover:text-gray-800 transition-colors"
        >
          {isNepali ? translations['Restart Game'] : 'Restart Game'}
        </button>
        <div className="flex gap-3">
        <button
  onClick={handleShareScore}
  className={`px-4 py-2 bg-orange-500 text-white rounded-full flex items-center transition duration-300 ${
    isAnswered ? 'hover:bg-orange-600' : 'bg-orange-300 cursor-not-allowed'
  }`}
  disabled={!isAnswered}
>
  {(MdShare as any)({ className: 'mr-2' })}
  Share Score
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
            {isNepali ? translations['Next Festival'] : 'Next Festival'}
          </button>
        </div>
      </div>
    </div>
  );
}