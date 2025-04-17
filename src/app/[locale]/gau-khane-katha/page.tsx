'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { RiddlesData } from '../../data/gau-khane-katha/gau-khane-katha-type';
import { riddlesData } from '../../data/gau-khane-katha/gau-khane-katha-data';
import { ImSpinner8 } from 'react-icons/im';
import { FiSend } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';
import { HiOutlineCheck } from 'react-icons/hi';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  RefreshCwIcon,
  TargetIcon 
} from 'lucide-react';

export default function RiddlesGamePage() {
  const t = useTranslations('Translations.RiddlesGame');
  const locale = useLocale() as 'en' | 'np';
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [answeredRiddles, setAnsweredRiddles] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentShuffledIndex, setCurrentShuffledIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [riddle, setRiddle] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  const riddles: RiddlesData = riddlesData;
  const maxAttempts = 3;

  //update the useEffect that initializes the shuffled indices
useEffect(() => {
  if (riddles[locale]?.length) {
    // Make sure we're creating the correct number of indices
    const indices = Array.from({ length: riddles[locale].length }, (_, i) => i);
    const shuffled = shuffleArray(indices);

    
    setShuffledIndices(shuffled);
    setCurrentShuffledIndex(0); // Start at position 0 in the shuffled array
    
    // Start with first shuffled index
    if (shuffled.length > 0) {
      setCurrentRiddleIndex(shuffled[0]);
    }
  }
}, [locale, riddles]);

  // Improve the shuffle function
const shuffleArray = (array: number[]): number[] => {
    // Create a copy to avoid modifying the original
    const shuffled = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  };
  

  useEffect(() => {
    if (riddles[locale] && answeredRiddles.length === riddles[locale].length) {
      setGameOver(true);
    }
  }, [answeredRiddles, locale, riddles]);

  useEffect(() => {
    if (currentRiddleIndex >= riddles[locale]?.length) {
      setCurrentRiddleIndex(0);
      setAnsweredRiddles([]);
      setScore(0);
      setGameOver(false);
    }
  }, [locale, riddles, currentRiddleIndex]);

  const currentRiddle = riddles[locale]?.[currentRiddleIndex];

// 2. Update the checkAnswer function to handle multiple attempts
const checkAnswer = () => {
  if (!currentRiddle) return;

  const primaryAnswer = currentRiddle.answer.toLowerCase();
  const userAnswerLower = userAnswer.toLowerCase().trim();
  
  // Only for Nepali locale, also check the English answer
  let isCorrect = userAnswerLower === primaryAnswer;
  
  // For Nepali locale only, also accept the English answer as correct
  if (!isCorrect && locale === 'np' && currentRiddle.answerEn) {
    isCorrect = userAnswerLower === currentRiddle.answerEn.toLowerCase();
  }
  
  if (isCorrect) {
    setIsCorrect(true);
    setScore((prevScore) => prevScore + 1);
    setAnsweredRiddles((prev) => 
      prev.includes(currentRiddle.id) ? prev : [...prev, currentRiddle.id]
    );
    setShowAnswer(true);
  } else {
    setIsCorrect(false);
    // Increment attempt counter
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    // Only show the answer after 3 attempts
    if (newAttempts >= maxAttempts) {
      setShowAnswer(true);
    } else {
      // Clear the input field for the next attempt
      setUserAnswer('');
    }
  }
};

// Replace your nextRiddle function with this improved version
const nextRiddle = () => {
  setShowAnswer(false);
  setIsCorrect(false);
  setUserAnswer('');
  setAttempts(0);
  
  // Safety check
  if (!shuffledIndices || shuffledIndices.length === 0) {
    setGameOver(true);
    return;
  }

  // Find the next unanswered riddle
  let foundNextIndex = false;
  let nextShuffledIndex = (currentShuffledIndex + 1) % shuffledIndices.length; // Move to next position in circular manner
  const startingShuffledIndex = nextShuffledIndex; // Remember where we started to detect full loop
  
  do {
    const candidateRiddleIndex = shuffledIndices[nextShuffledIndex];
    const candidateRiddle = riddles[locale][candidateRiddleIndex];
    
    if (candidateRiddle && !answeredRiddles.includes(candidateRiddle.id)) {
      // Found an unanswered riddle
      setCurrentRiddleIndex(candidateRiddleIndex);
      setCurrentShuffledIndex(nextShuffledIndex);
      foundNextIndex = true;
      break;
    }
    
    // Move to next position (circularly)
    nextShuffledIndex = (nextShuffledIndex + 1) % shuffledIndices.length;
    
    // If we've checked all positions and come back to where we started, break the loop
    if (nextShuffledIndex === startingShuffledIndex) {
      break;
    }
  } while (!foundNextIndex);
  
  // If we couldn't find a valid next index, game is over
  if (!foundNextIndex) {
    setGameOver(true);
  }
};


const restartGame = () => {
  const indices = Array.from({ length: riddles[locale].length }, (_, i) => i);
  const shuffled = shuffleArray([...indices]);
  setShuffledIndices(shuffled);
  setCurrentShuffledIndex(0); // Reset position in shuffled array
  setCurrentRiddleIndex(shuffled[0]);
  setUserAnswer('');
  setShowAnswer(false);
  setIsCorrect(false);
  setScore(0);
  setGameOver(false);
  setAnsweredRiddles([]);
  setAttempts(0);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await fetch('/api/submit-riddle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, riddle, locale }),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowInput(false);
        setFullName('');
        setRiddle('');
      }, 3000);
    } catch (error) {
      console.error('Submission failed:', error);
      setIsSubmitting(false);
    }
  };

  if (!currentRiddle) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg mb-6">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-start">
            <div className="mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-700">
                {t('subtitle')}
              </p>
            </div>
              <button
                onClick={nextRiddle}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg px-3 py-2 text-sm flex items-center transition"
              >
                <RefreshCwIcon className="w-3 h-3 mr-2" />
                {t('nextQuestionButton')}
              </button>
            </div>

            <div className="w-1/5 mb-2 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 rounded-lg border border-gray-100">
  <div className="flex items-center  text-gray-600">
    <TargetIcon className="w-4 h-4 text-indigo-500" />
    <div>
    <span className="text-sm ml-1 mr-1 font-medium">{t('score')}:</span>
    <span className="text-sm font-bold text-indigo-600">
      {score} {t('points')}
    </span>
    </div>
  </div>
</div>


            {!gameOver ? (
              <div>
                <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg border-2 border-indigo-100">
  <div className="text-2xl font-medium text-gray-900 text-center leading-relaxed relative">
    {currentRiddle.question}
  </div>
</div>

                {!showAnswer ? (
                  <form onSubmit={(e) => { e.preventDefault(); checkAnswer(); }} className="space-y-5 mt-6">

{!showAnswer && (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center text-sm text-gray-600">
      <span className="font-medium">{t('attempt') || 'Attempt'}:</span>
      <span className="ml-2 font-bold text-indigo-600">
        {attempts + 1}/{maxAttempts}
      </span>
    </div>
    {attempts > 0 && attempts < maxAttempts && (
      <div className="text-xs text-orange-500">
        {attempts === maxAttempts - 1 
          ? (t('incorrectLastAttempt') || 'Incorrect. Last attempt!') 
          : (t('incorrectTryAgain') || 'Incorrect. Try again!')}
      </div>
    )}
  </div>
)}

                    <div>
                      <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('answerLabel')}
                      </label>
                      <input
                        type="text"
                        id="answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-150"
                        placeholder={t('answerPlaceholder')}
                        aria-label={t('answerLabel')}
                        required
                      />
                      {/* Add the tip right here, after the input field */}
    {locale === 'np' && (
      <div className="mt-1 text-right text-xs text-gray-500 italic">
        <span className="inline-flex items-center">
        <HiOutlineClock className="h-3 w-3 mr-1" />
          {t('answerTip') || 'Tip: You can answer in Nepali or English. Ex: "बन्चरो" or "Axe"'}
        </span>
      </div>
    )}
                    </div>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                      {t('submitButton')}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-5 mt-6">
                <div
    className={`p-4 rounded-lg border ${
      isCorrect ? 'bg-green-50 border-green-300 text-green-800' : 'bg-red-50 border-red-300 text-red-800'
    } flex items-start gap-3`}
    role="alert"
  >
    {isCorrect ? (
      <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
    ) : (
      <XCircleIcon className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
    )}
    <div className="flex-grow">
      <h3 className="font-bold text-lg mb-2 flex items-center">
        {isCorrect ? 
          <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {t('correctAnswer')}
          </span> : 
          <span className="text-red-600 dark:text-red-400">{t('incorrectAnswer')}</span>
        }
      </h3>
      
      <div className="text-sm mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {locale === 'np' && currentRiddle.answerEn ? (
          <div className="flex items-baseline">
            <span className="font-semibold text-gray-700">{t('answerReveal')}:</span> 
            <span className="ml-2 font-mono text-indigo-600 dark:text-indigo-400">
              {currentRiddle.answer}, <span className="text-blue-600">{currentRiddle.answerEn}</span>
            </span>
          </div>
        ) : (
          <div className="flex items-baseline">
            <span className="font-semibold text-gray-700">{t('answerReveal')}:</span> 
            <span className="ml-2 font-mono text-indigo-600 dark:text-indigo-400">
              {currentRiddle.answer}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>

                    <button
                      onClick={nextRiddle}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                      {t('nextRiddleButton')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600 mb-4">
                  {t('gameOver')}
                </h2>
                <p className="text-lg sm:text-xl mb-6 text-gray-700">
                  {t('finalScore', { score: score, total: riddles[locale]?.length || 0 })}
                </p>

                {score === (riddles[locale]?.length || 0) ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg mb-6 flex items-center justify-center gap-3 text-yellow-800">
                    <CheckCircleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" aria-hidden="true"/>
                    <p className="text-sm font-medium">
                      {t('perfectScore')}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg mb-6 text-blue-800">
                    <p className="text-sm">
                      {t('playAgainMessage')}
                    </p>
                  </div>
                )}

                <button
                  onClick={restartGame}
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  <RefreshCwIcon className="w-5 h-5" />
                  {t('playAgainButton')}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-yellow-800 mb-2">
            {t('submitYourOwn') || 'Have a great riddle idea?'}
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            {t('submitDescription') || 'Submit your own riddles for possible inclusion in the game!'}
          </p>
          {showInput ? (
            submitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md flex items-center">
               <HiOutlineCheck className="w-5 h-5 mr-2" />
                <p className="font-medium">
                  {t('thankYou') || 'Thank you! Your riddle has been submitted.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-yellow-800 mb-1">
                    {t('fullName') || 'Your Full Name'}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('fullNamePlaceholder') || 'Enter your name...'}
                    className="w-full border border-yellow-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="riddleInput" className="block text-sm font-medium text-yellow-800 mb-1">
                    {t('yourRiddle') || 'Your Riddle'}
                  </label>
                  <textarea
                    id="riddleInput"
                    value={riddle}
                    onChange={(e) => setRiddle(e.target.value)}
                    placeholder={t('riddlePlaceholder') || 'Enter your riddle...'}
                    className="w-full border border-yellow-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    disabled={isSubmitting}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !riddle.trim() || !fullName.trim()}
                    className={`inline-flex items-center px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition ${
                      isSubmitting || !riddle.trim() || !fullName.trim() ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <ImSpinner8 className="animate-spin mr-2 h-4 w-4" />
                        {t('submitting') || 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        {t('submitRiddleButton') || 'Submit Riddle'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="inline-flex items-center px-3 py-2 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition"
            >
              <FiSend className="mr-2" />
              {t('submitRiddleButton') || 'Submit Riddle'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}