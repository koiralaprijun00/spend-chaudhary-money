import React from 'react';

interface QuizSectionProps {
  currentFestival: any;
  isAnswered: boolean;
  options: string[];
  handleGuess: (guess: string) => void;
}

export default function QuizSection({ currentFestival, isAnswered, options, handleGuess }: QuizSectionProps) {
  return (
    <div className="space-y-6">
      {/* Festival Image */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={currentFestival.image}
          alt={currentFestival.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleGuess(option)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-left transition-all ${
              isAnswered
                ? 'bg-gray-100 cursor-not-allowed'
                : 'bg-blue-50 hover:bg-blue-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 