'use client';
import React, { useState, useEffect } from 'react';
import GameButton from '../../components/ui/GameButton';

interface QuizSectionProps {
  currentFestival: {
    id: string;
    name: string;
    question: string;
    clues: string[];
    fact: string;
    image: string;
  };
  clueIndex: number;
  handleNextClue: () => void;
  isAnswered: boolean;
  options: string[];
  handleGuess: (selectedOption: string) => void;
  className?: string;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  currentFestival,
  clueIndex,
  handleNextClue,
  isAnswered,
  options,
  handleGuess
}) => {
  console.log("QuizSection rendered with isAnswered:", isAnswered); // Debug log
  
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-lora font-bold mb-4">{currentFestival.question}</h2>
      
      {/* Options - Moved above clues */}
      {!isAnswered && (
        <div className="mb-6">
          <h3 className="text-md mb-3">Your Guess:</h3>
          <div className="space-y-2">
            {options.map((option, index) => (
              <GameButton
                key={index}
                onClick={() => handleGuess(option)}
                type="neutral"
                fullWidth
                className="text-left justify-start transition-transform duration-200 hover:scale-105"
              >
                {option}
              </GameButton>
            ))}
          </div>
        </div>
      )}
      
      {/* Clues Section - Explicitly hide if answered */}
      {isAnswered === false ? (
        <div className="clues-container">
          <h3 className="text-m mb-2">Clues:</h3>
          {/* Single clue container with fixed height and shuffle button */}
          <div className="p-3 bg-gray-100 rounded-lg min-h-[80px] flex items-center justify-between">
            <div>
              {/* Only show the current clue based on clueIndex */}
              {currentFestival.clues[clueIndex]}
            </div>
            
            <GameButton 
              type="grayNeutral"
              onClick={handleNextClue}
              size="sm"
              className="ml-3 flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
            </GameButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};