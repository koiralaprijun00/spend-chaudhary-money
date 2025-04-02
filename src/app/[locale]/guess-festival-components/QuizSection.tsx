'use client';
import GameButton from '../../components/ui/GameButton';
import { FiRefreshCw } from 'react-icons/fi';

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
           <FiRefreshCw width="16" height="16" />
            </GameButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};