'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

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

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestion]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      handleGuess(option);
    }
  };

  if (!isMounted) {
    return (
      <div className="text-left animate-pulse">
        <div className="mb-8">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-left max-w-3xl mx-auto p-4">
      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 pl-2 leading-snug">
            {currentQuestion.question}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            whileTap={{ scale: 0.98 }}
            className={`relative px-5 py-4 rounded-xl shadow-sm font-medium text-sm md:text-base transition-all duration-200 ease-in-out focus:outline-none ${
              isAnswered
                ? option === currentQuestion.correctAnswer
                  ? 'bg-green-600 text-white shadow-green-200'
                  : option === selectedOption
                    ? 'bg-red-600 text-white shadow-red-200'
                    : 'bg-gray-100 text-gray-400'
                : option === selectedOption
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200 hover:border-blue-400 hover:shadow-md'
            }`}
          >
            {option}
            {isAnswered && option === currentQuestion.correctAnswer && (
              <div className="absolute top-2 right-2">
                <FiCheck className="w-5 h-5 text-white" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
