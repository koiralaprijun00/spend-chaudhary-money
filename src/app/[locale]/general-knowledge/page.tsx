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
  const [gameMode, setGameMode] = useState<'standard' | 'timed'>('standard');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
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
    
    if (gameMode === 'timed') {
      setTimeLeft(60);
      setTimerActive(true);
    }
  }, [selectedCategory, gameMode]);
  
  // Initialize timer for timed mode
  useEffect(() => {
    if (gameMode === 'timed') {
      setTimerActive(true);
      setTimeLeft(60);
    }
  }, [gameMode]);
  
  // Start timer if in timed mode
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (gameMode === 'timed' && timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, timerActive, gameMode, isAnswered]);
  
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
    if (gameMode === 'timed') setTimerActive(false);
  };
  
  // Handle time up in timed mode
  const handleTimeUp = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    setFeedback(t('timeUp') || "Time's up!");
    setTimerActive(false);
  };
  
  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setFeedback('');
      
      if (gameMode === 'timed') {
        setTimeLeft(60);
        setTimerActive(true);
      }
    }
  };
  
  // Switch game mode
  const switchGameMode = (mode: 'standard' | 'timed') => {
    setGameMode(mode);
    restartGame();
  };
  
  // Restart the game
  const restartGame = () => {
    setShuffledQuestions([...filteredQuestions].sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback('');
    setScore(0);
    
    if (gameMode === 'timed') {
      setTimeLeft(60);
      setTimerActive(true);
    }
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
        alert('Score copied to clipboard! Paste it to share.');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      await navigator.clipboard.writeText(shareMessage);
      alert('Score copied to clipboard! Paste it to share.');
    }
  };
  
  // Format time (mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
        <div className="flex flex-col pt-4 md:py-12 md:px-10 bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl shadow-none md:shadow-2xl">
          
          {/* Header with title and category dropdown side by side */}
          <header className="mb-6 text-left">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-600 dark:text-gray-200">
                {t('nepalGk.title') || 'Nepal General Knowledge Quiz'}
              </h1>
              
              {/* Category Dropdown - positioned right */}
              <div className="relative">
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="block w-48 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            </div>
            
            {/* Game Mode Buttons - kept in original position */}
            <div className="mt-2 flex flex-wrap gap-2 justify-start">
              <button
                onClick={() => switchGameMode('standard')}
                className={`px-3 py-1 rounded-full transition ${
                  gameMode === 'standard' ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                {t('standardMode') || 'Standard Mode'}
              </button>
              <button
                onClick={() => switchGameMode('timed')}
                className={`px-3 py-1 rounded-full transition ${
                  gameMode === 'timed' ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                {t('timedMode') || 'Timed Mode'}
              </button>
            </div>
          </header>
          
          {/* Score and timer - kept in original position */}
          <div className="flex justify-between w-full max-w-2xl mb-4">
            <div className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-md">
              <p className="font-bold dark:text-white">{t('score') || 'Score'}: {score}</p>
            </div>
            {gameMode === 'timed' && (
              <div className={`bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-md ${timeLeft < 10 ? 'text-red-600 dark:text-red-400' : 'dark:text-white'}`}>
                <p className="font-bold">{t('timeLeft') || 'Time Left'}: {formatTime(timeLeft)}</p>
              </div>
            )}
          </div>
          
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