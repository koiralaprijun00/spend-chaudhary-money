import React from 'react';
import GameButton from '../../../../components/GameButton';

interface AnswerRevealProps {
  isAnswered: boolean;
  isCorrect: boolean;
  feedback: string;
  currentFestival: any;
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
  score
}: AnswerRevealProps) {
  if (!isAnswered) return null;

  return (
    <div className="mt-6 space-y-4">
      <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
        <h3 className="text-lg font-semibold mb-2">
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </h3>
        <p className="text-gray-700">{feedback}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <GameButton
          onClick={handleNextFestival}
          type="primary"
          size="sm"
          className="flex-1"
        >
          Next Festival
        </GameButton>
        <GameButton
          onClick={restartGame}
          type="neutral"
          size="sm"
          className="flex-1"
        >
          Restart
        </GameButton>
        <GameButton
          onClick={handleShareScore}
          type="success"
          size="sm"
          className="flex-1"
        >
          Share Score
        </GameButton>
      </div>
    </div>
  );
} 