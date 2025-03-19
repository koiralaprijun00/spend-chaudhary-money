'use client';
import React from 'react';
import { MdShare } from 'react-icons/md';
import { useTranslations, useLocale } from 'next-intl';

interface AnswerRevealProps {
  isAnswered: boolean;
  isCorrect: boolean;
  feedback: string;
  currentQuestion: {
    id: string;
    question: string;
    correctAnswer: string;
    fact: string;
    category: string;
  };
  handleNextQuestion: () => void;
  restartGame: () => void;
  handleShareScore: () => void;
  score: number;
  totalQuestions: number;
  currentIndex: number;
}

export default function AnswerReveal({
  isAnswered,
  isCorrect,
  feedback,
  currentQuestion,
  handleNextQuestion,
  restartGame,
  handleShareScore,
  score,
  totalQuestions,
  currentIndex
}: AnswerRevealProps) {
  // Get translations
  const t = useTranslations('Translations');
  const locale = useLocale();
  
  // Calculate progress percentage
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  
  return (
    <div className="flex flex-col">
      {/* Top section with progress and buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-between items-start sm:items-center">
        <div className="flex items-center">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="ml-3 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleShareScore}
            className={`px-4 py-2 bg-blue-500 text-white rounded-full flex items-center transition duration-300 ${
              isAnswered ? 'hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'
            }`}
            disabled={!isAnswered}
          >
            <MdShare className="mr-2" />
            {t('shareScore') || 'Share'}
          </button>
          <button
            onClick={handleNextQuestion}
            className={`px-6 py-2 rounded-full transition duration-300 ${
              isAnswered
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isAnswered}
          >
            {t('nextQuestion') || 'Next'}
          </button>
        </div>
      </div>
      
      {/* Answer reveal section */}
      {isAnswered && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className={`text-xl font-bold mb-3 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </div>
          
          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left column: Correct Answer */}
            <div className="md:w-1/3">
              <p className="text-2xl md:text-xl font-bold text-gray-800 mb-2">
                {t('correctAnswer')}: <span className="block text-blue-600">{currentQuestion.correctAnswer}</span>
              </p>
            </div>
        
            {/* Right column: Fact */}
            <div className="md:w-2/3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-1">{t('didYouKnow') || 'Did you know?'}</h3>
                <p className="text-gray-700">{currentQuestion.fact}</p>
              </div>
            </div>
          </div>
          
          {/* Quiz completion message */}
          {currentIndex === totalQuestions - 1 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-800 mb-2">{t('quizComplete') || 'Quiz Complete!'}</h3>
              <p className="text-gray-700">
                {t('finalScoreMessage', { score: score, total: totalQuestions * 10 }) || 
                  `You've completed the quiz! Your final score is ${score} out of ${totalQuestions * 10}.`}
              </p>
              <button
                onClick={restartGame}
                className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('playAgain') || 'Play Again'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}