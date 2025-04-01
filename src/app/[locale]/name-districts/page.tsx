'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { districtData } from '../../data/district-data';
import AdSenseGoogle from '../../components/AdSenseGoogle';

const TOTAL_DISTRICTS = districtData.length;

// Helper function to convert numbers to Nepali numerals
const toNepaliNumerals = (num: number): string => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num
    .toString()
    .split('')
    .map(digit => nepaliDigits[parseInt(digit)])
    .join('');
};

const NepalDistrictQuiz: React.FC = () => {
  // Safe translation function to prevent errors
const safeT = (key: string, defaultValue: string = '', params: any = {}) => {
  try {
    return t(key, params);
  } catch (error) {
    console.warn(`Translation key not found: ${key}`);
    return defaultValue;
  }
};

  const safeTDistricts = (key: string, defaultValue: string = '') => {
    try {
      return tDistricts(key);
    } catch (error) {
      console.warn(`District translation key not found: ${key}`);
      return defaultValue;
    }
  };

  const t = useTranslations('Translations'); // For general UI translations
  const tDistricts = useTranslations('districts'); // For district names
  const locale = useLocale();
  const isNepali = locale === 'np'; // Assuming 'np' for Nepali locale

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [randomizedDistricts, setRandomizedDistricts] = useState(districtData);
  const [currentDistrictIndex, setCurrentDistrictIndex] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // UI state
  const [currentGuess, setCurrentGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Auto-start the game on mount and reset scroll
  useEffect(() => {
    startGame();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Check for game completion
  useEffect(() => {
    if (correctGuesses.length === TOTAL_DISTRICTS && gameStarted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setGameOver(true);
      setShowResults(true);
    }
  }, [correctGuesses, gameStarted]);

  // Generate multiple choice options
  useEffect(() => {
    if (randomizedDistricts.length > 0 && currentDistrictIndex < randomizedDistricts.length) {
      const currentDistrict = randomizedDistricts[currentDistrictIndex];
      const availableDistricts = districtData.filter(d => d.id !== currentDistrict.id);
      const shuffledDistricts = shuffleArray(availableDistricts);
      const distractors = shuffledDistricts.slice(0, 2);
      const choices = [
        safeTDistricts(currentDistrict.id),
        ...distractors.map(d => safeTDistricts(d.id)),
      ];
      setOptions(shuffleArray(choices));
    }
  }, [currentDistrictIndex, randomizedDistricts, tDistricts]);

  // Scroll pagination to active district
  useEffect(() => {
    if (paginationRef.current) {
      const activeButton = paginationRef.current.children[currentDistrictIndex];
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentDistrictIndex]);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentGuess.trim()) return;

    const currentDistrict = randomizedDistricts[currentDistrictIndex];
    const guess = currentGuess.trim().toLowerCase();
    const isCorrect =
      currentDistrict.id.toLowerCase() === guess ||
      safeTDistricts(currentDistrict.id).toLowerCase() === guess ||
      (isNepali ? currentDistrict.translations.ne.toLowerCase() : currentDistrict.translations.en.toLowerCase()) === guess;

    if (isCorrect) {
      handleCorrectAnswer(currentDistrict);
    } else {
      setFeedback(safeT('incorrect', 'Incorrect'));
      setStreak(0);
    }
  };

  const handleMultipleChoiceSelection = (selectedOption: string) => {
    const currentDistrict = randomizedDistricts[currentDistrictIndex];
    const isCorrect = safeTDistricts(currentDistrict.id).toLowerCase() === selectedOption.toLowerCase();

    if (isCorrect) {
      handleCorrectAnswer(currentDistrict);
    } else {
      setFeedback(safeT('incorrect', 'Incorrect'));
      setStreak(0);
    }
  };

  const handleCorrectAnswer = (district: { id: string }) => {
    if (!correctGuesses.includes(district.id)) {
      setCorrectGuesses(prev => [...prev, district.id]);
    }
    setFeedback(safeT('correct', 'Correct! {district}', { district: safeTDistricts(district.id) }));
    setCurrentGuess('');
    const newStreak = streak + 1;
    setStreak(newStreak);
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    setTimeout(() => {
      goToNextDistrict();
    }, 1500);
  };

  const goToNextDistrict = () => {
    if (currentDistrictIndex < randomizedDistricts.length - 1) {
      setCurrentDistrictIndex(prev => prev + 1);
      setFeedback('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else if (currentDistrictIndex === randomizedDistricts.length - 1 && correctGuesses.length < TOTAL_DISTRICTS) {
      const unansweredIndices = randomizedDistricts
        .map((district, index) => ({ district, index }))
        .filter(item => !correctGuesses.includes(item.district.id))
        .map(item => item.index);
      if (unansweredIndices.length > 0) {
        setCurrentDistrictIndex(unansweredIndices[0]);
        setFeedback(safeT('remainingDistricts', '{count} districts remaining', { count: unansweredIndices.length }));
      }
    } else {
      setGameOver(true);
      setShowResults(true);
    }
  };

  const goToPrevDistrict = () => {
    if (currentDistrictIndex > 0) {
      setCurrentDistrictIndex(prev => prev - 1);
      setFeedback('');
    }
  };

  const startGame = () => {
    const shuffled = shuffleArray([...districtData]);
    setRandomizedDistricts(shuffled);
    setCurrentDistrictIndex(0);
    setGameStarted(true);
    setGameOver(false);
    setShowResults(false);
    setCorrectGuesses([]);
    setCurrentGuess('');
    setFeedback('');
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(1200);

    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setGameOver(true);
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    if (paginationRef.current) {
      paginationRef.current.scrollLeft = 0;
    }
  };

  const calculateScore = () => {
    const baseScore = correctGuesses.length * 100;
    const timeBonus = timeLeft > 0 ? Math.floor(timeLeft / 10) : 0;
    return Math.floor(baseScore + timeBonus);
  };

  const handleGiveUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameOver(true);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCompletionPercentage = () => {
    return Math.round((correctGuesses.length / TOTAL_DISTRICTS) * 100);
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
        
        {/* Main content */}
        <div className="flex-1 px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            {/* Left column - Title and Info */}
            <div className="md:w-1/3 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-2">
                    {safeT('title', 'Nepal Districts Quiz')}
                  </h1>
                  <p className="text-left text-gray-600 dark:text-gray-300">
                    {safeT('quizInstructions', 'You have 5 minutes to name all kings who ruled Nepal from 1743 to 2008.', { kingCount: 25 })}
                  </p>
                </div>
                
                {/* Progress Stats */}
                <div className="mb-6">
                  <h2 className="text-sm mb-2">Progress</h2>
                  <div className="bg-gradient-to-r from-blue-600 to-red-500 p-0.5 rounded-lg">
                    <div className="bg-white dark:bg-gray-800 rounded-md p-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xl font-bold">{correctGuesses.length}</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">/ {TOTAL_DISTRICTS}</span>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        <span className="font-mono text-gray-800 dark:text-gray-200">
                          {getCompletionPercentage()}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timer */}
                <div className="mb-6">
                  <h2 className="text-sm mb-2">Time Remaining</h2>
                  <div className="bg-gradient-to-r from-blue-600 to-red-500 p-0.5 rounded-lg">
                    <div className="bg-white dark:bg-gray-800 rounded-md p-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xl font-bold font-mono">{formatTime(timeLeft)}</span>
                      </div>
                      
                      {gameStarted && !gameOver && (
                        <button
                          onClick={handleGiveUp}
                          className="bg-red-100 text-red-700 hover:bg-red-200 text-xs font-medium px-2 py-1 rounded"
                        >
                          {safeT('giveUp', 'Give Up')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Streak */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <h2 className="text-sm mb-1">Current Streak</h2>
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-md p-2">
                        <span className="text-lg font-bold text-blue-800 dark:text-blue-400">{streak}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-sm mb-1">Best Streak</h2>
                      <div className="bg-orange-100 dark:bg-orange-900/30 rounded-md p-2">
                        <span className="text-lg font-bold text-orange-800 dark:text-orange-400">{bestStreak}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {showResults && (
                  <div className="space-y-3">
                    <button
                      onClick={startGame}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                    >
                      {safeT('playAgain', 'Play Again')}
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - Quiz Content */}
            <div className="md:w-2/3">
              <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  
                  {/* Active game */}
                  {gameStarted && !showResults && randomizedDistricts.length > 0 && (
                    <div>
                      {/* Game header with navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={goToPrevDistrict}
                          className="text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
                          disabled={currentDistrictIndex === 0}
                        >
                          ← {safeT('prev', 'Previous')}
                        </button>
                        <div className="font-medium">
                          {safeT('districtNumber', 'District {current} of {total}', {
                            current: isNepali ? toNepaliNumerals(currentDistrictIndex + 1) : currentDistrictIndex + 1,
                            total: isNepali ? toNepaliNumerals(TOTAL_DISTRICTS) : TOTAL_DISTRICTS
                          })}
                        </div>
                        <button
                          onClick={goToNextDistrict}
                          className="text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50"
                        >
                          {safeT('next', 'Next')} →
                        </button>
                      </div>
                      
                      {/* District image */}
                      <div className="mb-6">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                          <div className="district-display bg-gray-100 dark:bg-gray-900 p-4 flex justify-center items-center">
                            <div className="relative w-full h-48 md:h-64">
                              <Image
                                src={randomizedDistricts[currentDistrictIndex].imagePath}
                                alt="District Shape"
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-contain"
                                priority
                              />
                              {correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id) && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-lg font-bold opacity-90">
                                    {safeTDistricts(randomizedDistricts[currentDistrictIndex].id)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Input form */}
                      <form onSubmit={handleGuess} className="mb-4">
                        <input
                          ref={inputRef}
                          type="text"
                          value={currentGuess}
                          onChange={(e) => setCurrentGuess(e.target.value)}
                          placeholder={safeT('guessingPlaceholder', 'Type district name...')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          disabled={correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id)}
                        />
                      </form>
                      
                      {/* Feedback message */}
                      {feedback && (
                        <div className={`mb-4 p-2 rounded-lg text-center ${
                          feedback === safeT('incorrect', 'Incorrect') 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {feedback}
                        </div>
                      )}
                      
                      {/* Multiple choice options */}
                      <div className="space-y-2 mb-6">
                        {options.map((option, index) => (
                          <button
                            key={`${option}-${index}`}
                            onClick={() => handleMultipleChoiceSelection(option)}
                            className={`w-full p-3 text-center rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                              correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id)
                                ? safeTDistricts(randomizedDistricts[currentDistrictIndex].id) === option
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                : 'bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                            }`}
                            disabled={correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 p-2">
                        <div
                          ref={paginationRef}
                          className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-1"
                          style={{ scrollBehavior: 'smooth' }}
                        >
                          {randomizedDistricts.map((district, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentDistrictIndex(index)}
                              className={`min-w-[32px] h-8 flex items-center justify-center rounded-md text-xs ${
                                correctGuesses.includes(district.id)
                                  ? 'bg-green-500 text-white'
                                  : currentDistrictIndex === index
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              {isNepali ? toNepaliNumerals(index + 1) : index + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Results overlay */}
                  {showResults && (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">
                          {safeT('gameOver', 'Game Over!')}
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              {safeT('finalScore', 'Final Score')}
                            </h3>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {calculateScore()}
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              {safeT('bestStreak', 'Best Streak')}
                            </h3>
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                              {bestStreak}
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              {safeT('correctDistricts', 'Correct Districts')}
                            </h3>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {correctGuesses.length}/{TOTAL_DISTRICTS}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {correctGuesses.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-3 text-green-700 dark:text-green-500">
                            {safeT('correctGuesses', 'Correct Guesses')} ({correctGuesses.length})
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                            {correctGuesses.map(id => {
                              const district = randomizedDistricts.find(d => d.id === id);
                              return district ? (
                                <div key={id} className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 flex items-center p-2 rounded-md">
                                  <span className="mr-2">✓</span>
                                  <span>{safeTDistricts(district.id)}</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                      
                      {correctGuesses.length < TOTAL_DISTRICTS && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-3 text-red-700 dark:text-red-500">
                            {safeT('incorrectGuesses', 'Missed Districts')} ({TOTAL_DISTRICTS - correctGuesses.length})
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                            {randomizedDistricts
                              .filter(district => !correctGuesses.includes(district.id))
                              .map(district => (
                                <div key={district.id} className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 flex items-center p-2 rounded-md">
                                  <span className="mr-2">✗</span>
                                  <span>{safeTDistricts(district.id)}</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
    </div>
  );
};

export default NepalDistrictQuiz;