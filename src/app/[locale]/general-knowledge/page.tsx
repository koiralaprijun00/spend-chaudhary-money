'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import QuizSection from '../nepal-gk-components/QuizSection';
import AnswerReveal from '../nepal-gk-components/AnswerReveal';
import { gkQuestions } from '../../data/general-knowledge/gk-data';
import AdSenseGoogle from '../../components/AdSenseGoogle';
import GameButton from '../../components/ui/GameButton';

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
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
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
  
  // Calculate available question count by category
  const getQuestionCount = (category: string) => {
    if (category === 'all') return gkQuestions.length;
    return gkQuestions.filter(q => q.category === category).length;
  };
  
  // Safe translation function
  const safeT = (key: string, defaultValue: string = '', params: any = {}) => {
    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return defaultValue;
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Main layout with sidebars */}
      <div className="flex justify-center">
        {/* Left sidebar ad - hidden on mobile */}
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] ml-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle
              adSlot="6865219846"
              adFormat="vertical"
              style={{ width: '160px', height: '400px' }}
            />
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            {/* Left column - Categories, Score */}
            <div className="hidden md:block md:w-1/3 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-2">
                    {safeT('nepalGk.title', 'Nepal GK Quiz')}
                  </h1>
                  <p className="text-left text-gray-600 dark:text-gray-300">
                    Test your knowledge about Nepal!
                  </p>
                </div>
                
                {/* Category Selector */}
                <div className="mb-6">
                  <h2 className="text-sm mb-2">Categories</h2>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-blue-600 dark:border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' 
                          ? 'All Categories' 
                          : `${category} (${getQuestionCount(category)})`}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Score Display */}
                <div>
                  <h2 className="text-sm mb-3">Score</h2>
                  <div className="bg-gradient-to-r from-blue-600 to-red-500 p-0.5 rounded-lg">
                    <div className="bg-white dark:bg-gray-800 rounded-md p-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold">{score}</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{t('points')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <GameButton
                    onClick={restartGame}
                    type="neutral"
                    size="sm"
                    fullWidth
                  >
                    Restart Quiz
                  </GameButton>
                  
                  {score > 0 && (
                    <GameButton
                      onClick={handleShareScore}
                      type="success"
                      size="sm"
                      fullWidth
                    >
                      Share Score
                    </GameButton>
                  )}
                </div>
              </div>
            </div>

            {/* Right column - Quiz Content */}
            <div className="md:w-2/3 w-full">
              <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6">
                  {/* Mobile header */}
                  <div className="md:hidden mb-6">
                    <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-2">
                      Nepal GK Quiz
                    </h1>
                    
                    {/* Mobile Category Selector */}
                    <div className="mb-4 flex justify-center">
                      <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category === 'all' 
                              ? 'All Categories' 
                              : `${category} (${getQuestionCount(category)})`}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Mobile Score Display */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                        <span className="font-bold">{t('score')}: {score}</span>
                      </div>
                      
                      {score > 0 && (
                        <GameButton
                          onClick={handleShareScore}
                          type="neutral"
                          size="sm"
                        >
                          Share Score
                        </GameButton>
                      )}
                    </div>
                  </div>

                  {/* Quiz Content */}
                  {(shuffledQuestions.length === 0 && isMounted) ? (
                    <div className="text-center py-8">
                      <p className="text-lg text-gray-600 dark:text-gray-300">
                        {safeT('noQuestionsInCategory', 'No questions available in this category.')}
                      </p>
                      <GameButton
                        onClick={() => setSelectedCategory('all')}
                        type="primary"
                        className="mt-4"
                      >
                        {safeT('viewAllCategories', 'View All Categories')}
                      </GameButton>
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
            </div>
          </div>
        </div>
        
        {/* Right sidebar ad - hidden on mobile */}
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] mr-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle 
              adSlot="9978468343"
              adFormat="vertical"
              style={{ width: '160px', height: '400px' }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 z-10">
        <div className="flex justify-between items-center">
          <GameButton
            onClick={restartGame}
            type="neutral"
            size="sm"
            className="py-1 text-xs"
          >
            Restart Quiz
          </GameButton>
          
          {score > 0 && (
            <GameButton
              onClick={handleShareScore}
              type="success"
              size="sm"
              className="py-1 text-xs"
            >
              Share Score
            </GameButton>
          )}
        </div>
      </div>
    </div>
  );
}