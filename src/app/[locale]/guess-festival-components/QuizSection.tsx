'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { IoRefreshCircle } from 'react-icons/io5';

interface QuizSectionProps {
  currentFestival: {
    id: string;
    name: string;
    question: string;
    clues: string[];
    fact: string;
    sound: string;
    image: string;
  };
  clueIndex: number;
  handleNextClue: () => void;
  isAnswered: boolean;
  options: string[];
  handleGuess: (selectedOption: string) => void;
  className?: string; // Add this line
}

export default function QuizSection({
  currentFestival,
  clueIndex,
  handleNextClue,
  isAnswered,
  options,
  handleGuess,
  className = "",
}: QuizSectionProps) {
  const t = useTranslations('common');
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hintAnimation, setHintAnimation] = useState<boolean>(false);

  // Reset selectedOption when currentFestival changes
  useEffect(() => {
    setSelectedOption(null);
  }, [currentFestival]);

  const handleNextClueLocal = () => {
    if (!isAnswered) {
      setHintAnimation(true);
      handleNextClue();
      setTimeout(() => setHintAnimation(false), 500);
    }
  };

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      handleGuess(option);
    }
  };

  return (
    <div className={`text-left ${className}`}>
      {/* Question with festive decoration */}
      <div className="relative mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 pl-2">
          {currentFestival.question}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`relative overflow-hidden px-4 py-3 text-sm md:text-base font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] ${
              isAnswered
                ? option === selectedOption
                  ? 'bg-gradient-to-br from-purple-800 to-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : option === selectedOption
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-purple-300 dark:hover:border-purple-500'
            }`}
          >
            {option}
            
            {/* Selection indicator dots */}
            {!isAnswered && option === selectedOption && (
              <div className="absolute top-1 right-1 flex space-x-1">
                <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
                <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-100"></div>
                <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-200"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Hint Section */}
      <div className="relative bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {t('hint')}:
            </p>
          </div>
          
          <button 
            onClick={handleNextClueLocal}
            disabled={isAnswered}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-all duration-300 ${
              isAnswered 
                ? 'text-gray-400 bg-gray-200 dark:bg-gray-700 cursor-not-allowed' 
                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 hover:bg-orange-500 hover:text-white'
            }`}
          >
            <IoRefreshCircle className={`text-lg ${hintAnimation ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {/* Hint Text with animation */}
        <div className={`mt-2 p-3 bg-white dark:bg-gray-700/50 rounded-lg shadow-inner ${hintAnimation ? 'animate-pulse' : ''}`}>
          <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
            {currentFestival.clues[clueIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}