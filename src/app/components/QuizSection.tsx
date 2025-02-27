import React, { useState, useEffect } from 'react'; // Added useEffect
import { Festival } from '../../../types';
import { IoRefreshCircle } from 'react-icons/io5';

interface QuizSectionProps {
  currentFestival: Festival;
  isAnswered: boolean;
  options: string[];
  handleGuess: (option: string) => void;
  isNepali: boolean;
  translations: Record<string, string>;
}

export default function QuizSection({
  currentFestival,
  isAnswered,
  options,
  handleGuess,
  isNepali,
  translations,
}: QuizSectionProps) {
  const [clueIndex, setClueIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Reset selectedOption and clueIndex when currentFestival changes
  useEffect(() => {
    setSelectedOption(null); // Reset selected option
    setClueIndex(0); // Reset clue index (optional, if you want clues to reset too)
  }, [currentFestival]); // Dependency on currentFestival

  const handleNextClueLocal = () => {
    if (!isAnswered) {
      setClueIndex((prev) => (prev + 1) % currentFestival.clues.length);
    }
  };

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      handleGuess(option);
    }
  };

  const RefreshIcon = IoRefreshCircle as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <div className="text-left">
      <h2 className="text-xl md:text-2xl text-gray-800 mb-6 ">
        {currentFestival.question}
      </h2>
      <div className="mb-6 grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`px-4 py-2 text-lg font-semibold rounded-lg transition duration-300 ${
              isAnswered
                ? option === selectedOption
                  ? 'bg-sky-800 text-white'
                  : 'bg-gray-300 cursor-not-allowed'
                : option === selectedOption
                  ? 'bg-sky-800 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-sky-800 hover:text-white'
            }`}
          >
            {isNepali && translations[option as keyof typeof translations]
              ? translations[option as keyof typeof translations]
              : option}
          </button>
        ))}
      </div>
      <div className="flex justify-end items-center space-x-3">
        <p className="text-lg font-semibold text-gray-700">
          <span className="text-orange-600">Hint:</span> {currentFestival.clues[clueIndex]}
        </p>
        <RefreshIcon onClick={handleNextClueLocal} className={`text-4xl p-2 rounded-lg cursor-pointer transition duration-300 ${
    isAnswered ? 'text-gray-400 bg-gray-200 cursor-not-allowed' : 'bg-orange-300 text-orange-500 hover:text-white hover:bg-orange-500'
  }`}
/>
</div>
      </div>
  );
}