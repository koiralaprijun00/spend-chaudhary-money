'use client';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { festivalAssets } from '../../data/guess-festival/festival-assets';
import AdSenseGoogle from '../../components/AdSenseGoogle';
import GameButton from '../../components/ui/GameButton';
  
// Define TypeScript interface for the festival assets
type FestivalId = keyof typeof festivalAssets;

interface Festival {
  id: string;
  name: string;
  question: string;
  clues: string[];
  fact: string;
  image: string;
}

// QuizSection Component
interface QuizSectionProps {
  currentFestival: Festival;
  clueIndex: number;
  handleNextClue: () => void;
  isAnswered: boolean;
  options: string[];
  handleGuess: (option: string) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({
  currentFestival,
  clueIndex,
  handleNextClue,
  isAnswered,
  options,
  handleGuess
}) => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-lora mb-4">{currentFestival.question}</h2>
      
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
      
      {/* Clues Section */}
      <div>
        <h3 className="text-m mb-2">Clues:</h3>
        {/* Single clue container with fixed height and shuffle button */}
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[80px] flex items-center justify-between">
          <div>
            {/* Only show the current clue based on clueIndex */}
            {currentFestival.clues[clueIndex]}
          </div>
          
          {!isAnswered && (
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
          )}
        </div>
      </div>
    </div>
  );
};

// AnswerReveal Component
interface AnswerRevealProps {
  isAnswered: boolean;
  isCorrect: boolean;
  feedback: string;
  currentFestival: Festival;
  handleNextFestival: () => void;
  restartGame: () => void;
  handleShareScore: () => void;
  score: number;
}

const AnswerReveal: React.FC<AnswerRevealProps> = ({
  isAnswered,
  isCorrect,
  feedback,
  currentFestival,
  handleNextFestival
}) => {
  if (!isAnswered) return null;
  
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
        <h3 className="text-xl font-bold mb-2">
          {isCorrect ? '✓ Correct!' : '✗ Not Quite!'}
        </h3>
        <p className="font-semibold">
          {feedback}
        </p>
      </div>
      
      <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">
  <span className="text-md font-normal text-gray-600 dark:text-gray-400 mr-1">Correct Answer:</span> 
  {currentFestival.name}
</h3>
        <p>{currentFestival.fact}</p>
      </div>
      
      <div className="flex gap-3">
        <GameButton
          onClick={handleNextFestival}
          type="primary"
        >
          Next Festival
        </GameButton>
        
      
      </div>
    </div>
  );
};

// Mobile Header Component
const MobileHeader: React.FC<{
  score: number;
  gameMode: 'standard' | 'timed';
  timeLeft: number;
  t: any;
}> = ({ score, gameMode, timeLeft, t }) => {
  return (
    <div className="md:hidden flex justify-between items-center mb-4">
      <div className="flex items-center">
        <div className="bg-gradient-to-r from-blue-600 to-red-500 p-0.5 rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-md px-2 py-1 flex items-center">
            <span className="text-xl font-bold">{score}</span>
            <span className="ml-1 text-xs text-gray-600 dark:text-gray-300">{t('points')}</span>
          </div>
        </div>
      </div>
      
      {gameMode === 'timed' && (
        <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          <span className={`font-mono ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
            {timeLeft}s
          </span>
        </div>
      )}
    </div>
  );
};

// Mobile Footer Component
const MobileFooter: React.FC<{
  gameMode: 'standard' | 'timed';
  switchGameMode: (mode: 'standard' | 'timed') => void;
  restartGame: () => void;
}> = ({ gameMode, switchGameMode, restartGame }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2 z-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <GameButton 
            type={gameMode === 'standard' ? 'grayNeutral' : 'neutral'}
            onClick={() => switchGameMode('standard')}
            size="sm"
            className="py-1 text-xs rounded-md"
          >
            Standard
          </GameButton>
          <GameButton 
            type={gameMode === 'timed' ? 'danger' : 'neutral'}
            onClick={() => switchGameMode('timed')}
            size="sm"
            className="py-1 text-xs rounded-md"
          >
            Timed
          </GameButton>
        </div>
        
        <GameButton
          onClick={restartGame}
          type="neutral"
          size="sm"
          className="py-1 text-xs"
        >
          Restart
        </GameButton>
      </div>
    </div>
  );
};

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('Translations');
  
  // Get all festival IDs
  const festivalIds = Object.keys(festivalAssets) as FestivalId[];
  
  const [currentFestivalId, setCurrentFestivalId] = useState<FestivalId>(festivalIds[0]);
  const [clueIndex, setClueIndex] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [gameMode, setGameMode] = useState<'standard' | 'timed'>('standard');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [festivalHistory, setFestivalHistory] = useState<FestivalId[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const getCurrentFestival = (): Festival => {
    // Generate an ID that matches the filename pattern
    const id = currentFestivalId.toLowerCase().replace(/ /g, '-');
    
    return {
      id: id, // This ID will be used in the URL path
      name: t(`festivals.${currentFestivalId}.name`),
      question: t(`festivals.${currentFestivalId}.question`),
      clues: [
        t(`festivals.${currentFestivalId}.clues.0`),
        t(`festivals.${currentFestivalId}.clues.1`),
        t(`festivals.${currentFestivalId}.clues.2`)
      ],
      fact: t(`festivals.${currentFestivalId}.fact`),
      image: festivalAssets[currentFestivalId].image,
    };
  };

  const handleShareScore = async () => {
    const shareMessage = `I scored ${score} points in the Nepali Festival Quiz! Can you beat me? Try it at: piromomo.com/guess-festival #NepaliFestivals`;
    const shareData = {
      title: 'Nepali Festival Quiz Score',
      text: shareMessage,
      url: 'https://piromomo.com/guess-festival', 
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareMessage);
        alert('Score copied to clipboard! Paste it to share.');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      await navigator.clipboard.writeText(shareMessage);
      alert('Score copied to clipboard! Paste it to share.');
    }
  };

  // Corrected generateOptions function
  const generateOptions = (correctFestivalId: FestivalId) => {
    // Get 3 random festival IDs different from the correct one
    const otherFestivalIds = festivalIds.filter(id => id !== correctFestivalId);
    const randomIds = otherFestivalIds
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    // Add correct festival ID and shuffle
    const optionIds = [correctFestivalId, ...randomIds].sort(() => 0.5 - Math.random());
    
    // Get the names from the translations - add "festivals." prefix to match JSON structure
    setOptions(optionIds.map(id => t(`festivals.${id}.name`)));
  };

  useEffect(() => {
    shuffleFestivals();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameMode === 'timed' && timerActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (gameMode === 'timed' && timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
    return () => { if (timer) clearInterval(timer); };
  }, [timeLeft, timerActive, gameMode, isAnswered]);

  const shuffleFestivals = () => {
    const randomIndex = Math.floor(Math.random() * festivalIds.length);
    const newFestivalId = festivalIds[randomIndex];
    setCurrentFestivalId(newFestivalId);
    generateOptions(newFestivalId);
    setClueIndex(0);
    setGuess('');
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback('');
    if (gameMode === 'timed') {
      setTimeLeft(30);
      setTimerActive(true);
    }
  };

  const handleNextClue = () => {
    // Cycle through clues in a loop (0 -> 1 -> 2 -> 0)
    setClueIndex((prevIndex) => (prevIndex + 1) % currentFestival.clues.length);
  };

  const handleGuess = (selectedOption: string) => {
    if (isAnswered) return;
    
    const currentFestival = getCurrentFestival();
    const isGuessCorrect = selectedOption === currentFestival.name;
    
    if (isGuessCorrect) {
      const cluePoints = 3 - clueIndex;
      const newPoints = Math.max(1, cluePoints) * (gameMode === 'timed' ? 2 : 1);
      setScore(prevScore => prevScore + newPoints);
      setFeedback(`+${newPoints} ${t('points')}`);
      setIsCorrect(true);
    } else {
      setFeedback(t('tryAgain'));
      setIsCorrect(false);
    }
    
    setGuess(selectedOption);
    // Make sure this is being set to true
    console.log("Setting isAnswered to true");
    setIsAnswered(true);
    setFestivalHistory(prev => [...prev, currentFestivalId]);
    if (gameMode === 'timed') setTimerActive(false);
  };

  const handleNextFestival = () => {
    let availableFestivalIds = festivalIds.filter(
      id => !festivalHistory.slice(-Math.min(3, festivalIds.length - 1)).includes(id)
    );
    
    if (availableFestivalIds.length === 0) {
      setFestivalHistory([currentFestivalId]);
      availableFestivalIds = festivalIds.filter(id => id !== currentFestivalId);
    }
    
    const nextIndex = Math.floor(Math.random() * availableFestivalIds.length);
    const newFestivalId = availableFestivalIds[nextIndex];
    
    setCurrentFestivalId(newFestivalId);
    generateOptions(newFestivalId);
    setClueIndex(0);
    setGuess('');
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback('');
    
    if (gameMode === 'timed') {
      setTimeLeft(30);
      setTimerActive(true);
    }
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    setFeedback(t('timeUp') || "Time's up!");
    setTimerActive(false);
  };

  const switchGameMode = (mode: 'standard' | 'timed') => {
    setGameMode(mode);
    restartGame();
  };

  const restartGame = () => {
    setScore(0);
    setFestivalHistory([]);
    shuffleFestivals();
    if (gameMode === 'timed') {
      setTimeLeft(30);
      setTimerActive(true);
    }
  };

  const currentFestival = getCurrentFestival();

  return (
    <div className="min-h-screen w-full">
      {/* Main layout with outer ad sidebars */}
      <div className="flex justify-center">
        {/* Left sidebar ad - hidden on mobile */}
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] ml-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle
              adSlot="6865219846"
              adFormat="vertical"
              style={{ width: '160px', height: '400px' }}
            />
          </div>
        </div>
        
        {/* Main content area with two columns */}
        <div className="flex-1 px-4 py-8 pb-16 md:pb-8">
          {/* Mobile title at the top */}
          <div className="md:hidden mb-6">
            <h1 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500">
              Nepali Festival Quiz
            </h1>
          </div>
          
          {/* Mobile score display */}
          <MobileHeader 
            score={score}
            gameMode={gameMode}
            timeLeft={timeLeft}
            t={t}
          />
          
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            
            {/* Left column - Title, Game Mode, Score - Hidden on mobile */}
            <div className="hidden md:block md:w-1/3 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-2">
                    Nepali Festival Quiz
                  </h1>
                  <p className="text-left text-gray-600 dark:text-gray-300">
                    Test your knowledge of Nepali festivals!
                  </p>
                </div>
                
                {/* Game Mode Selector */}
                <div className="mb-6">
                  <h2 className="text-sm mb-2">Game Mode</h2>
                  <div className="flex gap-2">
                    <GameButton 
                      type={gameMode === 'standard' ? 'grayNeutral' : 'neutral'}
                      onClick={() => switchGameMode('standard')}
                      size="sm"
                      fullWidth
                      className="py-1 text-sm rounded-md"
                    >
                      Standard
                    </GameButton>
                    <GameButton 
                      type={gameMode === 'timed' ? 'danger' : 'neutral'}
                      onClick={() => switchGameMode('timed')}
                      size="sm"
                      fullWidth
                      className="py-1 text-sm rounded-md"
                    >
                      Timed
                    </GameButton>
                  </div>
                </div>
                
                {/* Score Display */}
                <div>
                  <h2 className="text-sm mb-3">Score</h2>
                  <div className="bg-gradient-to-r from-blue-600 to-red-500 p-0.5 rounded-lg">
                    <div className="bg-white dark:bg-gray-800 rounded-md p-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold">{score}</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{t('points')}</span>
                      </div>
                      
                      {gameMode === 'timed' && (
                        <div className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                          <span className={`font-mono ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-800 dark:text-gray-200'}`}>
                            {timeLeft}s
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Reset Button */}
                <GameButton
                  onClick={restartGame}
                  type="neutral"
                  size='sm'
                  className="mt-6 mr-2"
                >
                  Restart Game
                </GameButton>
                
                {/* Share Button - Only shows when answered */}
                {isAnswered && (
                  <GameButton
                    onClick={handleShareScore}
                    type="success"
                    size='sm'
                    className="mt-3"
                  >
                    Share Score
                  </GameButton>
                )}
              </div>
            </div>
            
            {/* Right column - Quiz Content - Full width on mobile */}
            <div className="md:w-2/3 w-full">
              <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6">
                  <QuizSection
                    currentFestival={currentFestival}
                    clueIndex={clueIndex}
                    handleNextClue={handleNextClue}
                    isAnswered={isAnswered}
                    options={options}
                    handleGuess={handleGuess}
                  />
                  
                  <AnswerReveal
  isAnswered={isAnswered}
  isCorrect={isCorrect}
  feedback={feedback}
  currentFestival={currentFestival}
  handleNextFestival={handleNextFestival}
  restartGame={restartGame}
  handleShareScore={handleShareScore}
  score={score}
/>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right sidebar ad - hidden on mobile */}
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] mr-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle 
              adSlot="9978468343"
              adFormat="vertical"
              style={{ width: '160px', height: '400px' }}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Footer */}
      <MobileFooter
        gameMode={gameMode}
        switchGameMode={switchGameMode}
        restartGame={restartGame}
      />
    </div>
  );
}