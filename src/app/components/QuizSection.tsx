import React, { useState, useEffect } from 'react';
import { Festival } from '../../../types';
import { IoRefreshCircle } from 'react-icons/io5';
import { IoMdHelpCircle } from 'react-icons/io';

interface QuizSectionProps {
  currentFestival: Festival;
  isAnswered: boolean;
  options: string[];
  handleGuess: (option: string) => void;
  isNepali: boolean;
  translations: {
    questions: Record<string, { ne: string; en: string }>;
    [key: string]: any;
  };
  className?: string;
}

export default function QuizSection({
  currentFestival,
  isAnswered,
  options,
  handleGuess,
  isNepali,
  translations,
  className = "",
}: QuizSectionProps) {
  const [clueIndex, setClueIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hintAnimation, setHintAnimation] = useState<boolean>(false);

  // Reset selectedOption and clueIndex when currentFestival changes
  useEffect(() => {
    setSelectedOption(null);
    setClueIndex(0);
  }, [currentFestival]);

  const handleNextClueLocal = () => {
    if (!isAnswered) {
      setHintAnimation(true);
      setClueIndex((prev) => (prev + 1) % currentFestival.clues.length);
      setTimeout(() => setHintAnimation(false), 500);
    }
  };

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      handleGuess(option);
    }
  };

  const RefreshIcon = IoRefreshCircle as React.FC<React.SVGProps<SVGSVGElement>>;
  const HelpIcon = IoMdHelpCircle as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className={`text-left ${className}`}>
      {/* Question with festive decoration */}
      <div className="relative mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 pl-2">
  {isNepali 
    ? translations.questions[currentFestival.name].ne 
    : translations.questions[currentFestival.name].en
  }
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
            
            {isNepali && translations[option as keyof typeof translations]
              ? translations[option as keyof typeof translations]
              : option}
            
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
              {isNepali ? translations.hint : "Hint"}:
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
            <RefreshIcon className={`text-lg ${hintAnimation ? 'animate-spin' : ''}`} />
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