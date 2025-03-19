'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface QuizSectionProps {
  currentQuestion: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    fact: string;
  };
  isAnswered: boolean;
  handleGuess: (selectedOption: string) => void;
}

export default function QuizSection({
  currentQuestion,
  isAnswered,
  handleGuess,
}: QuizSectionProps) {
  const t = useTranslations('Translations');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestion]);
  
  // Mark component as mounted after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      handleGuess(option);
    }
  };

  // Don't render category until client-side
  if (!isMounted) {
    return (
      <div className="text-left">
        <div className="relative mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 pl-2">
            {currentQuestion.question}
          </h2>
        </div>
        {/* Options Grid - render without showing category */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              disabled={true}
              className="relative overflow-hidden px-4 py-3 text-sm md:text-base font-semibold rounded-xl shadow-md bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-left">
      {/* Question with category badge on the right */}
      <div className="relative mb-8">
        <div className="flex justify-between items-start">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 pl-2 flex-1 pr-4">
            {currentQuestion.question}
          </h2>
        </div>
      </div>

      {/* Options Grid */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`relative overflow-hidden px-4 py-3 text-sm md:text-base font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] ${
              isAnswered
                ? option === currentQuestion.correctAnswer
                  ? 'bg-gradient-to-br from-green-600 to-green-500 text-white' // Correct answer
                  : option === selectedOption
                    ? 'bg-gradient-to-br from-red-600 to-red-500 text-white' // Wrong answer selected
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' // Other options
                : option === selectedOption
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white' // Selected but not submitted
                  : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-500' // Unselected
            }`}
          >
            {option}
            
            {/* Show checkmark for correct answer when answered */}
            {isAnswered && option === currentQuestion.correctAnswer && (
              <div className="absolute top-2 right-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}