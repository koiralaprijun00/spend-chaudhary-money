'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import QuizSection from '../nepal-gk-components/QuizSection';
import AnswerReveal from '../nepal-gk-components/AnswerReveal';
import { gkQuestions } from '../../data/general-knowledge/gk-data';
import Image from 'next/image';

export default function NepalGKQuiz() {
  const t = useTranslations('Translations');
  const locale = useLocale();
  
  // Game state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // Add category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get all available categories
  const categories = useMemo(() => {
    const allCategories = gkQuestions.map(q => q.category);
    // Return unique categories
    return ['all', ...Array.from(new Set(allCategories))];
  }, []);
  
  // Filter questions by selected category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') {
      return gkQuestions;
    }
    return gkQuestions.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);
  
  // Shuffle questions at the start
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof gkQuestions>([]);
  
  // Initialize with unshuffled questions, then shuffle on client
  useEffect(() => {
    setIsMounted(true);
    setShuffledQuestions([...filteredQuestions].sort(() => Math.random() - 0.5));
  }, [filteredQuestions]);
  
  // When category changes, reset game state
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback('');
    setScore(0);
  }, [selectedCategory]);
  
  // Current question
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  
  // Handle user's guess
  const handleGuess = (selectedOption: string) => {
    if (isAnswered) return;
    
    const isGuessCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isGuessCorrect) {
      setScore(prevScore => prevScore + 10);
      setFeedback(`+10 ${t('points') || 'points'}`);
      setIsCorrect(true);
    } else {
      setFeedback(t('incorrect') || 'Incorrect');
      setIsCorrect(false);
    }
    
    setIsAnswered(true);
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setFeedback('');
    }
  };
  
  // Restart the game
  const restartGame = () => {
    setShuffledQuestions([...filteredQuestions].sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback('');
    setScore(0);
  };
  
  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  // Share score
  const handleShareScore = async () => {
    const categoryText = selectedCategory === 'all' ? '' : ` (${selectedCategory} category)`;
    const shareMessage = `I scored ${score} points in the Nepal General Knowledge Quiz${categoryText}! Can you beat me? Try it at: piromomo.com/nepal-gk #NepalGK`;
    
    try {
      if (navigator.share && navigator.canShare({ text: shareMessage })) {
        await navigator.share({
          title: 'Nepal GK Quiz Score',
          text: shareMessage,
          url: 'https://piromomo.com/nepal-gk'
        });
      } else {
        await navigator.clipboard.writeText(shareMessage);
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      await navigator.clipboard.writeText(shareMessage);
    }
  };
  
  // Calculate available question count by category
  const getQuestionCount = (category: string) => {
    if (category === 'all') return gkQuestions.length;
    return gkQuestions.filter(q => q.category === category).length;
  };
  
  return (
    <div className="min-h-screen flex justify-center scale-100">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-200 dark:bg-blue-700 opacity-20 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-indigo-200 dark:bg-indigo-700 opacity-20 rounded-full animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-36 h-36 bg-green-200 dark:bg-green-700 opacity-20 rounded-full animate-float-slow"></div>
      </div>
      
      <div className="relative z-10 w-full md:max-w-3xl">
        <div className="flex flex-col pt-4 mt-1 md:mt-4 md:py-8 px-2 py-2 md:px-10 bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl shadow-none md:shadow-2xl">
          
{/* Header with appropriately sized categories */}
<header className="mb-8">
  {/* Bigger heading in one row */}
  <h1 className="text-3xl md:text-4xl font-bold text-gray-600 dark:text-gray-200 mb-4">
    {t('nepalGk.title') || 'Nepal General Knowledge Quiz'}
  </h1>
  
  {/* Categories section with natural width select */}
  <div className="flex items-center space-x-3 w-full mb-4">
    <label 
      htmlFor="category-select" 
      className="text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap"
    >
      Categories:
    </label>
    <select
      id="category-select"
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="w-auto appearance-none py-1.5 pl-3 pr-8 text-sm font-medium border-2 border-blue-700 dark:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category === 'all' 
            ? t('allCategories') || 'All Categories' 
            : `${category} (${getQuestionCount(category)})`}
        </option>
      ))}
    </select>
  </div>
  
  {/* Score and share button below */}
  <div className="flex justify-end items-center">
    <div className="bg-orange-300 dark:bg-gray-700 px-4 py-1.5 rounded-lg shadow-md mr-3">
      <p className="font-bold dark:text-white">{t('score') || 'Score'}: {score}</p>
    </div>
    
    <button 
      onClick={handleShareScore}
      className="bg-white dark:bg-gray-700 p-1.5 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      aria-label={t('shareScore') || 'Share Score'}
      title={t('shareScore') || 'Share Score'}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-5 h-5 text-gray-700 dark:text-gray-200"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
        <polyline points="16 6 12 2 8 6"></polyline>
        <line x1="12" y1="2" x2="12" y2="15"></line>
      </svg>
    </button>
  </div>
</header>
          
          {/* Main quiz container */}
          <div className="relative p-1 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 mb-6 shadow-lg">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8">
              {/* No questions message */}
              {(shuffledQuestions.length === 0 && isMounted) ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {t('noQuestionsInCategory') || 'No questions available in this category.'}
                  </p>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {t('viewAllCategories') || 'View All Categories'}
                  </button>
                </div>
              ) : currentQuestion ? (
                <>
                  <QuizSection
                    currentQuestion={currentQuestion}
                    isAnswered={isAnswered}
                    handleGuess={handleGuess}
                  />
                  
                  <AnswerReveal
                    isAnswered={isAnswered}
                    isCorrect={isCorrect}
                    feedback={feedback}
                    currentQuestion={currentQuestion}
                    handleNextQuestion={handleNextQuestion}
                    restartGame={restartGame}
                    handleShareScore={handleShareScore}
                    score={score}
                    totalQuestions={shuffledQuestions.length}
                    currentIndex={currentQuestionIndex}
                  />
                </>
              ) : null}
            </div>
          </div>
          
          {/* Info text at bottom */}
          <div className="text-center mb-6 text-sm text-gray-500 dark:text-gray-400">
            <p>{t('nepalGk.description') || 'Test your knowledge about Nepal with this quiz covering history, geography, culture, and more!'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}