'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { districtData } from '../../data/district-data';

// Define types for district data
interface DistrictTranslations {
  en: string;
  ne: string;
}

interface District {
  id: string;
  name: string;
  imagePath: string;
  translations: DistrictTranslations;
}

// Set the total number of districts in Nepal
const TOTAL_DISTRICTS = districtData.length;

// Difficulty levels
type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface DifficultySettings {
  timeLimit: number;
}

const difficultySettings: Record<DifficultyLevel, DifficultySettings> = {
  easy: {
    timeLimit: 1500
  },
  medium: {
    timeLimit: 1200
  },
  hard: {
    timeLimit: 900
  }
};

// Nepali digits mapping
const nepaliDigits: Record<string, string> = {
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९'
};

// Function to convert numbers to Nepali digits
const toNepaliDigits = (num: number): string => {
  return num.toString().split('').map(digit => nepaliDigits[digit] || digit).join('');
};

const NepalDistrictQuiz: React.FC = () => {
  const t = useTranslations('Translations');
  const locale = useLocale();
  const isNepali = locale === 'ne';
  
  // Game state
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [timeLeft, setTimeLeft] = useState<number>(difficultySettings.medium.timeLimit);
  const [randomizedDistricts, setRandomizedDistricts] = useState<District[]>([]);
  const [currentDistrictIndex, setCurrentDistrictIndex] = useState<number>(0);
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  
  // UI state
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [consecutiveSkips, setConsecutiveSkips] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Multiple choice options
  const [options, setOptions] = useState<string[]>([]);
  
  // Pagination
  const [visiblePageStart, setVisiblePageStart] = useState<number>(0);
  const VISIBLE_PAGE_COUNT = 9; // Number of page buttons to show at once
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format number based on locale
  const formatNumber = (num: number): string => {
    return isNepali ? toNepaliDigits(num) : num.toString();
  };

  // Fisher-Yates shuffle algorithm for proper randomization
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Generate 3 multiple choice options (1 correct, 2 distractors)
  const generateMultipleChoiceOptions = (correctDistrictId: string): string[] => {
    const correctDistrict = districtData.find(d => d.id === correctDistrictId);
    if (!correctDistrict) return [];
    
    // Get all districts except the correct one
    const availableDistricts = districtData.filter(d => d.id !== correctDistrictId);
    
    // Shuffle the available districts
    const shuffledDistricts = shuffleArray(availableDistricts);
    
    // Take first 2 districts as distractors
    const distractors = [shuffledDistricts[0], shuffledDistricts[1]];
    
    // Create options array with correct answer and distractors, using the appropriate translation
    const choices = [
      correctDistrict.translations[isNepali ? 'ne' : 'en'],
      distractors[0].translations[isNepali ? 'ne' : 'en'],
      distractors[1].translations[isNepali ? 'ne' : 'en']
    ];
    
    // Shuffle the options so correct answer isn't always in the same position
    return shuffleArray(choices);
  };

  // Update options when current district changes
  useEffect(() => {
    if (randomizedDistricts.length > 0 && currentDistrictIndex < randomizedDistricts.length) {
      setOptions(generateMultipleChoiceOptions(randomizedDistricts[currentDistrictIndex].id));
    }
    
    // Update visible pagination range when current district changes
    updateVisiblePaginationRange(currentDistrictIndex);
  }, [currentDistrictIndex, randomizedDistricts, isNepali]);

  // Update visible pagination range
  const updateVisiblePaginationRange = (currentIndex: number) => {
    // Determine if we need to shift the visible range of page numbers
    const currentPage = currentIndex;
    
    // If current page is less than the start of visible range + buffer
    if (currentPage < visiblePageStart + 2) {
      setVisiblePageStart(Math.max(0, currentPage - 2));
    }
    // If current page is greater than the end of visible range - buffer
    else if (currentPage > visiblePageStart + VISIBLE_PAGE_COUNT - 3) {
      setVisiblePageStart(Math.min(
        TOTAL_DISTRICTS - VISIBLE_PAGE_COUNT,
        currentPage - VISIBLE_PAGE_COUNT + 3
      ));
    }
  };

  const startGame = (): void => {
    const shuffled = shuffleArray(districtData);
    setRandomizedDistricts(shuffled);
    setCurrentDistrictIndex(0);
    setVisiblePageStart(0); // Reset pagination
    
    setGameStarted(true);
    setGameOver(false);
    setShowResults(false);
    setTimeLeft(difficultySettings[difficulty].timeLimit);
    setCorrectGuesses([]);
    setCurrentGuess('');
    setFeedback('');
    setStreak(0);
    setBestStreak(0);
    setConsecutiveSkips(0);
    
    // Options will be set in the useEffect when currentDistrictIndex changes
    
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
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (correctGuesses.length === districtData.length && gameStarted) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setGameOver(true);
      setShowResults(true);
      setFeedback(t('allCorrect'));
    }
  }, [correctGuesses, gameStarted, t]);

  const handleGuess = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (!currentGuess.trim()) return;
    
    const currentDistrict = randomizedDistricts[currentDistrictIndex];
    const guess = currentGuess.trim().toLowerCase();
    
    const isCorrect = 
      currentDistrict.id === guess.toLowerCase() || 
      currentDistrict.name.toLowerCase() === guess ||
      currentDistrict.translations.en.toLowerCase() === guess ||
      currentDistrict.translations.ne.toLowerCase() === guess;
    
    if (isCorrect) {
      handleCorrectAnswer(currentDistrict);
    } else {
      setFeedback(t('incorrect'));
      setStreak(0);
    }
  };

  const handleMultipleChoiceSelection = (selectedOption: string): void => {
    const currentDistrict = randomizedDistricts[currentDistrictIndex];
    
    // Check against the appropriate translation for the current locale
    const isCorrect = 
      currentDistrict.translations[isNepali ? 'ne' : 'en'].toLowerCase() === selectedOption.toLowerCase();
    
    if (isCorrect) {
      handleCorrectAnswer(currentDistrict);
    } else {
      setFeedback(t('incorrect'));
      setStreak(0);
    }
  };

  const handleCorrectAnswer = (district: District): void => {
    if (!correctGuesses.includes(district.id)) {
      setCorrectGuesses(prev => [...prev, district.id]);
    }
    
    // Use the appropriate translation for feedback
    setFeedback(t('correct', { district: district.translations[isNepali ? 'ne' : 'en'] }));
    setCurrentGuess('');
    
    const newStreak = streak + 1;
    setStreak(newStreak);
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    setConsecutiveSkips(0);
    
    setShowInfo(true);
    setTimeout(() => {
      setShowInfo(false);
      goToNextDistrict();
    }, 1000);
  };

  const goToPrevDistrict = (): void => {
    if (currentDistrictIndex > 0) {
      setCurrentDistrictIndex(prevIndex => prevIndex - 1);
      setCurrentGuess('');
      setFeedback('');
      setShowInfo(false);
      // No need to set options here as useEffect will handle it
    }
  };

  const goToNextDistrict = (): void => {
    if (currentDistrictIndex < randomizedDistricts.length - 1) {
      setCurrentDistrictIndex(prevIndex => prevIndex + 1);
      setCurrentGuess('');
      setFeedback('');
      setShowInfo(false);
      // No need to set options here as useEffect will handle it
      
      setConsecutiveSkips(prev => prev + 1);
      if (consecutiveSkips >= 2) {
        setTimeLeft(prev => Math.max(0, prev - 30));
        setFeedback(t('skipPenalty'));
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    const minStr = mins.toString().padStart(2, '0');
    const secStr = secs.toString().padStart(2, '0');
    
    // Convert to Nepali digits if needed
    return isNepali 
      ? `${toNepaliDigits(parseInt(minStr))}:${toNepaliDigits(parseInt(secStr))}`
      : `${minStr}:${secStr}`;
  };

  const getCompletionPercentage = (): number => {
    return Math.round((correctGuesses.length / TOTAL_DISTRICTS) * 100);
  };

  const calculateScore = (): number => {
    const baseScore = correctGuesses.length * 100;
    const timeBonus = timeLeft > 0 ? Math.floor(timeLeft / 10) : 0;
    const difficultyMultiplier = 
      difficulty === 'easy' ? 1 :
      difficulty === 'medium' ? 1.5 :
      2;
    
    return Math.floor((baseScore + timeBonus) * difficultyMultiplier);
  };

  const handleGiveUp = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameOver(true);
    setShowResults(true);
  };

  const renderPaginationButtons = () => {
    return (
      <div className="flex items-center justify-center">
        {/* Previous button */}
        <button 
          onClick={goToPrevDistrict}
          className="w-16 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 mr-1 rounded-md"
          disabled={currentDistrictIndex === 0}
        >
          <span className="text-xl">❮</span>
        </button>
        
        {/* Generate visible page numbers */}
        {Array.from({ length: Math.min(VISIBLE_PAGE_COUNT, TOTAL_DISTRICTS) }).map((_, i) => {
          const pageNumber = visiblePageStart + i;
          if (pageNumber < TOTAL_DISTRICTS) {
            return (
              <button 
                key={pageNumber}
                onClick={() => {
                  setCurrentDistrictIndex(pageNumber);
                  setFeedback('');
                }}
                className={`w-12 h-12 flex items-center justify-center mx-0.5 ${
                  currentDistrictIndex === pageNumber 
                    ? 'bg-yellow-500 text-white font-bold'
                    : correctGuesses.includes(randomizedDistricts[pageNumber]?.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                } transition-colors rounded-md`}
              >
                {formatNumber(pageNumber + 1)}
              </button>
            );
          }
          return null;
        })}
        
        {/* Next button */}
        <button 
          onClick={goToNextDistrict}
          className="w-16 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 ml-1 rounded-md"
          disabled={currentDistrictIndex === randomizedDistricts.length - 1}
        >
          <span className="text-xl">❯</span>
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h1 className="text-xl font-bold">{t('title')}</h1>
            
            {gameStarted && (
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <div className="text-xs text-blue-200">{t('score')}</div>
                  <div className="font-bold">
                    {isNepali 
                      ? `${toNepaliDigits(correctGuesses.length)}/${toNepaliDigits(TOTAL_DISTRICTS)}`
                      : `${correctGuesses.length}/${TOTAL_DISTRICTS}`}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-blue-200">{t('timer')}</div>
                  <div className="font-bold">{formatTime(timeLeft)}</div>
                </div>
              </div>
            )}
          </div>
          
          {gameStarted && (
            <div className="w-full bg-blue-800 rounded-full h-1 mt-2">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-300" 
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="p-3">
          {!gameStarted && (
            <div className="text-center py-4">
              <p className="mb-4 text-gray-700">{t('instructions')}</p>
              
              <button 
                onClick={startGame}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors shadow"
              >
                {t('startGame')}
              </button>
            </div>
          )}
          
          {gameStarted && !showResults && (
            <div className="quiz-container">
              <div className="flex gap-2 mb-3">
                <button 
                  onClick={goToPrevDistrict}
                  className="border border-gray-300 rounded px-3 py-1 flex items-center hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                  disabled={currentDistrictIndex === 0}
                >
                  ← {t('prev')}
                </button>
                
                <form onSubmit={handleGuess} className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentGuess}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentGuess(e.target.value)}
                    placeholder={t('guessingPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-100"
                    disabled={correctGuesses.includes(randomizedDistricts[currentDistrictIndex]?.id)}
                  />
                </form>
                
                <button 
                  onClick={goToNextDistrict}
                  className="border border-gray-300 rounded px-3 py-1 flex items-center hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                  disabled={currentDistrictIndex === randomizedDistricts.length - 1}
                >
                  {t('next')} →
                </button>
              </div>
              
              <div className="flex justify-between mb-3">
                <div></div> {/* Empty div for spacing */}
                <button
                  onClick={handleGiveUp}
                  className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  <span>🏳️</span> {t('giveUp')}
                </button>
              </div>
              
              {feedback && (
                <div className={`mb-3 p-2 rounded text-center text-sm ${
                  feedback.includes(t('correct', { district: '' }).split('district')[0])
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : feedback.includes(t('skipPenalty'))
                      ? 'bg-orange-100 text-orange-800 border border-orange-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {feedback}
                </div>
              )}
              
              <div className="mb-3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="district-display bg-gray-100 p-4 flex justify-center items-center">
                    {randomizedDistricts.length > 0 && (
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
                              {randomizedDistricts[currentDistrictIndex].translations[isNepali ? 'ne' : 'en']}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 gap-2 mb-5">
                {options.map((option, index) => (
                  <button
                    key={`${option}-${index}`}
                    onClick={() => handleMultipleChoiceSelection(option)}
                    className={`p-2 text-center rounded-lg text-sm font-medium transition-colors ${
                      correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id)
                        ? randomizedDistricts[currentDistrictIndex].translations[isNepali ? 'ne' : 'en'] === option
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                    disabled={correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {/* Numbered Pagination */}
              <div className="mt-6">
                {renderPaginationButtons()}
              </div>
            </div>
          )}
          
          {/* Results overlay that appears in the same view */}
          {showResults && (
            <div className="results-overlay">
              <div className="max-w-xl mx-auto">
                <h2 className="text-xl font-bold text-blue-800 mb-4">{t('gameOver')}</h2>
                
                {/* Results stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h3 className="text-sm text-gray-500 mb-1">{t('finalScore')}</h3>
                    <div className="text-2xl font-bold text-blue-600">
                      {isNepali ? toNepaliDigits(calculateScore()) : calculateScore()}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h3 className="text-sm text-gray-500 mb-1">{t('bestStreak')}</h3>
                    <div className="text-2xl font-bold text-orange-600">
                      {isNepali ? toNepaliDigits(bestStreak) : bestStreak}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h3 className="text-sm text-gray-500 mb-1">{t('timeRemaining')}</h3>
                    <div className="text-2xl font-bold text-green-600">{formatTime(timeLeft)}</div>
                  </div>
                </div>
                
                <button 
                  onClick={startGame}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors mb-6 mx-auto block"
                >
                  {t('playAgain')}
                </button>
                
                {/* Correctly guessed districts */}
                {correctGuesses.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2 text-green-700">
                      {t('correctGuesses')} ({isNepali ? toNepaliDigits(correctGuesses.length) : correctGuesses.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      {correctGuesses.map(id => {
                        const district = randomizedDistricts.find(d => d.id === id);
                        return district ? (
                          <div key={id} className="text-green-600 flex items-center bg-green-50 p-1 rounded">
                            <span className="mr-1">✓</span> 
                            <span>{district.translations[isNepali ? 'ne' : 'en']}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NepalDistrictQuiz;