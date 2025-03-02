'use client';
import { useState, useEffect } from 'react';
import GuessFestivalHeader from '../components/GuessFestivalHeader';
import ScoreBoard from '../components/ScoreBoard';
import QuizSection from '../components/QuizSection';
import AnswerReveal from '../components/AnswerReveal';
import { festivals, translations, enhancedTranslations } from '../data/festival-data';

export default function Home() {
  // Use enhanced translations to ensure all festivals have proper translations
  const enhancedTranslationsData = enhancedTranslations(translations);
  
  const [currentFestival, setCurrentFestival] = useState(festivals[0]);
  const [clueIndex, setClueIndex] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isNepali, setIsNepali] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [gameMode, setGameMode] = useState<'standard' | 'timed'>('standard');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [festivalHistory, setFestivalHistory] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

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

  const generateOptions = (correctFestival: string) => {
    const allFestivals = festivals.map(f => f.name);
    const distractors = allFestivals.filter(name => name !== correctFestival);
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([correctFestival, ...shuffledDistractors].sort(() => 0.5 - Math.random()));
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

  useEffect(() => {
    if (isAnswered && currentFestival) {
      try {
        const audio = new Audio(isCorrect ? currentFestival.sound : '/sounds/wrong_answer.mp3');
        audio.volume = 0.5;
        audio.play().catch(() => console.log('Audio play failed'));
      } catch (error) {
        console.log('Audio play error:', error);
      }
    }
  }, [isAnswered, isCorrect, currentFestival]);

  const shuffleFestivals = () => {
    const randomIndex = Math.floor(Math.random() * festivals.length);
    const newFestival = festivals[randomIndex];
    setCurrentFestival(newFestival);
    generateOptions(newFestival.name);
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
    if (currentFestival && clueIndex < currentFestival.clues.length - 1) {
      setClueIndex(clueIndex + 1);
    }
  };

  const handleGuess = (selectedOption: string) => {
    if (isAnswered || !currentFestival) return;
    const isGuessCorrect = selectedOption.toLowerCase() === currentFestival.name.toLowerCase();
    if (isGuessCorrect) {
      const cluePoints = 3 - clueIndex;
      const newPoints = Math.max(1, cluePoints) * (gameMode === 'timed' ? 2 : 1);
      setScore(prevScore => prevScore + newPoints);
      setFeedback(`+${newPoints} points!`);
      setIsCorrect(true);
    } else {
      setFeedback(isNepali ? enhancedTranslationsData.ui['Try again!'] : 'Try again!');
      setIsCorrect(false);
    }
    setGuess(selectedOption);
    setIsAnswered(true);
    setFestivalHistory(prev => [...prev, currentFestival.name]);
    if (gameMode === 'timed') setTimerActive(false);
  };

  const handleNextFestival = () => {
    if (!currentFestival) return;
    let availableFestivals = festivals.filter(
      f => !festivalHistory.slice(-Math.min(3, festivals.length - 1)).includes(f.name)
    );
    if (availableFestivals.length === 0) {
      setFestivalHistory([currentFestival.name]);
      availableFestivals = festivals.filter(f => f.name !== currentFestival.name);
    }
    const nextIndex = Math.floor(Math.random() * availableFestivals.length);
    const newFestival = availableFestivals[nextIndex];
    setCurrentFestival(newFestival);
    generateOptions(newFestival.name);
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
    setFeedback('Time\'s up!');
    setTimerActive(false);
  };

  const toggleLanguage = () => {
    if (!currentFestival) return;
    setIsNepali(prev => !prev);
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

  if (!currentFestival) {
    return <div>Loading...</div>; // Temporary loading state
  }

  return (
    <div className="min-h-screen flex justify-center scale-90">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-orange-200 dark:bg-orange-700 opacity-20 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-yellow-200 dark:bg-yellow-700 opacity-20 rounded-full animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-36 h-36 bg-red-200 dark:bg-red-700 opacity-20 rounded-full animate-float-slow"></div>
      </div>
      
      <div className="relative z-10 w-full md:max-w-3xl">
        <div className="flex flex-col pt-4 md:py-12 md:px-10 bg-gradient-to-b from-white via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl shadow-none md:shadow-2xl">
          
          <GuessFestivalHeader
            isNepali={isNepali}
            toggleLanguage={toggleLanguage}
            gameMode={gameMode}
            switchGameMode={switchGameMode}
            translations={enhancedTranslationsData.ui}
          />
          
          <ScoreBoard
            score={score}
            gameMode={gameMode}
            timeLeft={timeLeft}
            isNepali={isNepali}
            translations={enhancedTranslationsData.ui}
          />
          
          <div className="relative p-1 rounded-xl bg-gradient-to-br from-orange-400 to-purple-500 mb-6 shadow-lg">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8">
              <QuizSection
                currentFestival={currentFestival}
                isAnswered={isAnswered}
                options={options}
                handleGuess={handleGuess}
                isNepali={isNepali}
                translations={enhancedTranslationsData}
              />
              
              <AnswerReveal
                isAnswered={isAnswered}
                isCorrect={isCorrect}
                feedback={feedback}
                currentFestival={currentFestival}
                isNepali={isNepali}
                translations={enhancedTranslationsData.ui}
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
  );
}