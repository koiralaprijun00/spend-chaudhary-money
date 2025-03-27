'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { districtData } from '../../data/district-data';

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
        tDistricts(currentDistrict.id),
        ...distractors.map(d => tDistricts(d.id)),
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
      tDistricts(currentDistrict.id).toLowerCase() === guess ||
      (isNepali ? currentDistrict.translations.ne.toLowerCase() : currentDistrict.translations.en.toLowerCase()) === guess;

    if (isCorrect) {
      handleCorrectAnswer(currentDistrict);
    } else {
      setFeedback(t('incorrect'));
      setStreak(0);
    }
  };

  const handleMultipleChoiceSelection = (selectedOption: string) => {
    const currentDistrict = randomizedDistricts[currentDistrictIndex];
    const isCorrect = tDistricts(currentDistrict.id).toLowerCase() === selectedOption.toLowerCase();

    if (isCorrect) {
      handleCorrectAnswer(currentDistrict);
    } else {
      setFeedback(t('incorrect'));
      setStreak(0);
    }
  };

  const handleCorrectAnswer = (district: { id: string }) => {
    if (!correctGuesses.includes(district.id)) {
      setCorrectGuesses(prev => [...prev, district.id]);
    }
    setFeedback(t('correct', { district: tDistricts(district.id) }));
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
        setFeedback(t('remainingDistricts', { count: unansweredIndices.length }));
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
    <div className="max-w-2xl mx-auto p-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{t('title')}</h1>
            {gameStarted && (
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="text-xs text-blue-200">{t('score')}</div>
                  <div className="font-bold">{correctGuesses.length}/{TOTAL_DISTRICTS}</div>
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
          {gameStarted && !showResults && randomizedDistricts.length > 0 && (
            <div className="quiz-container">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={goToPrevDistrict}
                  className="border border-gray-300 rounded px-3 py-1 flex items-center hover:bg-gray-50 disabled:opacity-50"
                  disabled={currentDistrictIndex === 0}
                >
                  ← {t('prev')}
                </button>
                <form onSubmit={handleGuess} className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    placeholder={t('guessingPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id)}
                  />
                </form>
                <button
                  onClick={goToNextDistrict}
                  className="border border-gray-300 rounded px-3 py-1 flex items-center hover:bg-gray-50"
                >
                  {t('next')} →
                </button>
              </div>

              <div className="flex justify-between mb-3">
                <div>
                  {feedback && (
                    <p className={`text-sm font-medium ${feedback === t('incorrect') ? 'text-red-600' : 'text-green-600'}`}>
                      {feedback}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleGiveUp}
                  className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <span>🏳️</span> {t('giveUp')}
                </button>
              </div>

              {/* District image */}
              <div className="mb-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="district-display bg-gray-100 p-4 flex justify-center items-center">
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
                            {tDistricts(randomizedDistricts[currentDistrictIndex].id)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <button
                  onClick={goToPrevDistrict}
                  className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 disabled:opacity-50 flex items-center"
                  disabled={currentDistrictIndex === 0}
                >
                  ← {t('prev')}
                </button>
                <div
                  ref={paginationRef}
                  className="flex-1 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {randomizedDistricts.map((district, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDistrictIndex(index)}
                      className={`border border-gray-300 rounded px-3 py-1 min-w-[40px] text-center ${
                        correctGuesses.includes(district.id)
                          ? 'bg-green-500 text-white'
                          : currentDistrictIndex === index
                          ? 'bg-orange-500 text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {isNepali ? toNepaliNumerals(index + 1) : index + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={goToNextDistrict}
                  className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 flex items-center"
                  disabled={currentDistrictIndex === randomizedDistricts.length - 1}
                >
                  {t('next')} →
                </button>
              </div>

              {/* Multiple choice options */}
              <div className="grid grid-cols-1 gap-2 mb-5">
                {options.map((option, index) => (
                  <button
                    key={`${option}-${index}`}
                    onClick={() => handleMultipleChoiceSelection(option)}
                    className={`p-2 text-center rounded-lg text-sm font-medium transition-colors ${
                      correctGuesses.includes(randomizedDistricts[currentDistrictIndex].id)
                        ? tDistricts(randomizedDistricts[currentDistrictIndex].id) === option
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
            </div>
          )}

          {/* Results overlay */}
          {showResults && (
            <div className="results-overlay">
              <div className="max-w-xl mx-auto">
                <h2 className="text-xl font-bold text-blue-800 mb-4">{t('gameOver')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h3 className="text-sm text-gray-500 mb-1">{t('finalScore')}</h3>
                    <div className="text-2xl font-bold text-blue-600">{calculateScore()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h3 className="text-sm text-gray-500 mb-1">{t('bestStreak')}</h3>
                    <div className="text-2xl font-bold text-orange-600">{bestStreak}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h3 className="text-sm text-gray-500 mb-1">{t('correctDistricts')}</h3>
                    <div className="text-2xl font-bold text-green-600">
                      {correctGuesses.length}/{TOTAL_DISTRICTS}
                    </div>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors mb-6 mx-auto block"
                >
                  {t('playAgain')}
                </button>
                {correctGuesses.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2 text-green-700">
                      {t('correctGuesses')} ({correctGuesses.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      {correctGuesses.map(id => {
                        const district = randomizedDistricts.find(d => d.id === id);
                        return district ? (
                          <div key={id} className="text-green-600 flex items-center bg-green-50 p-1 rounded">
                            <span className="mr-1">✓</span>
                            <span>{tDistricts(district.id)}</span>
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