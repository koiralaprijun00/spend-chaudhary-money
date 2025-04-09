'use client';
import React, { useState, useEffect } from 'react';
import { MdShare } from 'react-icons/md';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

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
  const t = useTranslations('Translations');
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (isAnswered && currentIndex === totalQuestions - 1) {
      setIsModalOpen(true);
    }
  }, [isAnswered, currentIndex, totalQuestions]);

  return (
    <div className="flex flex-col">
      {/* Progress & Next Button */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-between items-center">
        <div className="flex items-center w-full sm:w-auto">
          <span className="text-sm font-medium text-gray-600 mr-3">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${progressPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={!isAnswered}
          className={`mt-2 sm:mt-0 px-6 py-2 rounded-full text-white transition duration-300 ${
            isAnswered
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {t('nextQuestion') || 'Next'}
        </button>
      </div>

      {/* Answer Reveal */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 border-t border-gray-200 pt-6"
        >
          <div
            className={`text-xl font-bold mb-4 ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {feedback}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <p className="text-md md:text-lg font-semibold text-gray-700">
                ✅ {t('correctAnswer')}:
              </p>
              <div className="mt-1 px-3 py-2 inline-block bg-blue-100 text-blue-800 rounded-lg text-base font-bold">
                {currentQuestion.correctAnswer}
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
                <h3 className="text-yellow-800 font-bold text-base mb-2">
                  📘 {t('didYouKnow') || 'Did you know?'}
                </h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {currentQuestion.fact}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Final Score Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  🎉 {t('quizComplete') || 'Quiz Complete!'}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t('finalScoreMessage', {
                    score,
                    total: totalQuestions * 10,
                  }) || `Your final score is ${score} out of ${totalQuestions * 10}.`}
                </p>

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={handleShareScore}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <MdShare className="w-5 h-5" />
                    {t('shareScore') || 'Share'}
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      restartGame();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    {t('playAgain') || 'Play Again'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
