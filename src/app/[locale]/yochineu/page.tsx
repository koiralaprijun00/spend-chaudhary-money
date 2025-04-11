'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import GameButton from '../../components/ui/GameButton';
import { getLogosByLocale } from '../../data/logo-quiz/getLogos';
import { FiShare2, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Logo {
  id: string;
  name: string;
  imagePath: string;
  category: string;
  difficulty: string;
  acceptableAnswers?: string[];
}

const LogoQuizGame = () => {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [currentFocusedLogo, setCurrentFocusedLogo] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  
  const logosPerPage = 6;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('Translations');
  const locale = useLocale();

  // Initialize game with logos
  useEffect(() => {
    const logoData = getLogosByLocale(locale);
    if (logoData.length > 0) {
      const shuffled = [...logoData].sort(() => 0.5 - Math.random());
      
      setLogos(shuffled);
      setTotalPages(Math.ceil(shuffled.length / logosPerPage));
      
      const initialAnswers: Record<string, string> = {};
      shuffled.forEach(logo => {
        initialAnswers[logo.id] = '';
      });
      setAnswers(initialAnswers);
      
      const initialCorrectAnswers: Record<string, boolean> = {};
      shuffled.forEach(logo => {
        initialCorrectAnswers[logo.id] = false;
      });
      setCorrectAnswers(initialCorrectAnswers);
    }
  }, [locale]);

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, timerActive]);

  // Initialize timer when game loads
  useEffect(() => {
    setTimerActive(true);
  }, []);

  // Handle timer completion
  const handleTimeUp = () => {
    setTimerActive(false);
    setShowResults(true);
    let finalScore = 0;
    Object.values(correctAnswers).forEach(isCorrect => {
      if (isCorrect) finalScore++;
    });
    setScore(finalScore);
  };

  // Handle input change for a specific logo
  const handleInputChange = (logoId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [logoId]: value
    }));
  };

  // Check answer for a specific logo
  const checkAnswer = (logoId: string) => {
    const logo = logos.find(l => l.id === logoId);
    if (!logo) return;
    
    const userAnswer = answers[logoId].trim();
    if (!userAnswer) return;
    
    const isCorrect = logo.acceptableAnswers?.some(
      answer => answer.toLowerCase() === userAnswer.toLowerCase()
    ) || logo.name.toLowerCase() === userAnswer.toLowerCase();
    
    setCorrectAnswers(prev => ({
      ...prev,
      [logoId]: isCorrect
    }));
    
    if (isCorrect && !correctAnswers[logoId]) {
      setScore(prev => prev + 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalScore = 0;
    Object.values(correctAnswers).forEach(isCorrect => {
      if (isCorrect) finalScore++;
    });
    
    setScore(finalScore);
    setShowResults(true);
    setTimerActive(false);
  };

  // Reset the game
  const resetGame = () => {
    const logoData = getLogosByLocale(locale);
    const shuffled = [...logoData].sort(() => 0.5 - Math.random());
    
    setLogos(shuffled);
    setTotalPages(Math.ceil(shuffled.length / logosPerPage));
    setCurrentPage(0);
    
    const initialAnswers: Record<string, string> = {};
    shuffled.forEach(logo => {
      initialAnswers[logo.id] = '';
    });
    setAnswers(initialAnswers);
    
    const initialCorrectAnswers: Record<string, boolean> = {};
    shuffled.forEach(logo => {
      initialCorrectAnswers[logo.id] = false;
    });
    setCorrectAnswers(initialCorrectAnswers);
    
    setScore(0);
    setShowResults(false);
    setCurrentFocusedLogo(null);
    setTimeLeft(300);
    setTimerActive(true);
  };

  // Share score
  const handleShareScore = () => {
    const totalLogos = logos.length;
    const shareText = `I identified ${score} out of ${totalLogos} logos in the Nepal Logo Quiz in ${formatTimeForDisplay(300 - timeLeft)}! Can you beat my score?`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Logo Quiz Score',
        text: shareText,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Score copied to clipboard!');
      });
    }
  };

  // Focus on a specific logo
  const focusLogo = (logoId: string) => {
    setCurrentFocusedLogo(currentFocusedLogo === logoId ? null : logoId);
  };

  // Format time for display (MM:SS)
  const formatTimeForDisplay = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Next page of logos
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Previous page of logos
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Get current page logos
  const getCurrentPageLogos = () => {
    const startIndex = currentPage * logosPerPage;
    return logos.slice(startIndex, startIndex + logosPerPage);
  };

  // Render results
  if (showResults) {
    const percentCorrect = Math.round((score / logos.length) * 100);
    const timeUsed = 300 - timeLeft;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 min-h-[90vh] max-w-6xl mx-auto overflow-hidden flex flex-col">
        <div className="text-center flex-grow overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500">
            {t('logoQuiz.finalScore') || 'Your Final Score'}
          </h2>
          <div className="text-5xl font-bold mb-2 text-blue-600">{score}/{logos.length}</div>
          <p className="text-xl mb-2 text-gray-700">
            {percentCorrect}% Accuracy
          </p>
          <p className="text-md mb-6 text-gray-500">
            Time Used: {formatTimeForDisplay(timeUsed)}
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <GameButton onClick={resetGame} type="primary">
              {t('logoQuiz.playAgain') || 'Play Again'}
            </GameButton>
            <GameButton onClick={handleShareScore} type="success" className="flex items-center">
              <FiShare2 className="mr-2" />
              {t('logoQuiz.shareScore') || 'Share Score'}
            </GameButton>
          </div>
          
          <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold mb-6 text-xl">Results Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {logos.map((logo) => (
                <motion.div 
                  key={logo.id} 
                  className={`p-4 rounded-lg border-2 ${
                    correctAnswers[logo.id] 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-500 bg-red-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-2">
                    <img 
                      src={logo.imagePath} 
                      alt={logo.name} 
                      className="w-10 h-10 object-contain mr-3"  // Reduced from w-12 h-12
                    />
                    <div>
                      <div className="font-medium">
                        {logo.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {correctAnswers[logo.id] 
                          ? <span className="text-green-600">✓ Correct</span> 
                          : <span className="text-red-600">✗ Incorrect</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div><strong>Your answer:</strong> {answers[logo.id] || '(No answer)'}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render main game interface
  return (
    <div className="bg-white rounded-xl p-6 min-h-[90vh] max-w-6xl mx-auto flex flex-col">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-4 py-2 flex items-center">
          <span className="text-sm text-gray-600 mr-2">{t('logoQuiz.score') || 'Score'}:</span>
          <span className="text-xl font-bold text-blue-700">{score}/{logos.length}</span>
        </div>
        
        <div className="text-gray-600 font-medium">
          Page {currentPage + 1} of {totalPages}
        </div>
        
        <div className={`rounded-lg px-4 py-2 flex items-center ${
          timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
        }`}>
          <FiClock className={`mr-2 ${timeLeft < 60 && 'animate-pulse'}`} />
          <span className="font-mono font-bold">{formatTimeForDisplay(timeLeft)}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col">
  {/* Logo Grid Container */}
  <div className="mb-4"> {/* Add margin-bottom to create a small gap */}
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentPage}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        {getCurrentPageLogos().map((logo) => (
          <div 
            key={logo.id}
            className={`relative p-3 rounded-lg border-2 hover:shadow-md transition-all flex flex-col ${
              correctAnswers[logo.id] 
                ? 'border-green-500 bg-green-50' 
                : answers[logo.id].trim() 
                  ? 'border-yellow-300 bg-yellow-50' 
                  : 'border-gray-200 bg-white'
            } ${currentFocusedLogo === logo.id ? 'ring-2 ring-blue-500' : ''}`}
          >
            {/* Logo Image */}
            <div 
              className="h-24 md:h-36 flex items-center justify-center mb-2 cursor-pointer flex-shrink-0"
              onClick={() => focusLogo(logo.id)}
            >
              <img 
                src={logo.imagePath} 
                alt="Mystery Logo" 
                className="max-h-full max-w-full object-contain" 
              />
            </div>
            
            {/* Answer Input */}
            <div className="mt-auto">
              <input
                type="text"
                value={answers[logo.id]}
                onChange={(e) => handleInputChange(logo.id, e.target.value)}
                onBlur={() => checkAnswer(logo.id)}
                placeholder={t('logoQuiz.enterLogoName') || "Enter logo name..."}
                className={`w-full p-2 text-sm border rounded-md ${
                  correctAnswers[logo.id] 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }`}
                disabled={correctAnswers[logo.id]}
              />
            </div>
            
            {/* Success Icon */}
            {correctAnswers[logo.id] && (
              <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
  
  {/* Navigation and Submit Controls */}
  <div className="flex justify-between items-center pt-4 shrink-0">
    <button
      type="button"
      onClick={prevPage}
      disabled={currentPage === 0}
      className={`flex items-center px-4 py-2 rounded-lg ${
        currentPage === 0 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      }`}
    >
      <FiChevronLeft className="mr-2" />
      Previous
    </button>
    
    <GameButton type="primary" className="px-8">
      Submit All
    </GameButton>
    
    <button
      type="button"
      onClick={nextPage}
      disabled={currentPage === totalPages - 1}
      className={`flex items-center px-4 py-2 rounded-lg ${
        currentPage === totalPages - 1 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      }`}
    >
      Next
      <FiChevronRight className="ml-2" />
    </button>
  </div>
</form>
      
      {/* Logo Detail Modal */}
      {currentFocusedLogo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl max-w-lg w-full p-6 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              onClick={() => setCurrentFocusedLogo(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {(() => {
              const logo = logos.find(l => l.id === currentFocusedLogo);
              if (!logo) return null;
              
              return (
                <>
                  <div className="flex justify-center mb-6">
                    <img 
                      src={logo.imagePath} 
                      alt="Logo Detail" 
                      className="max-h-32 object-contain"  // Reduced from max-h-40
                    />
                  </div>
                  
                  <div className="space-y-4">
                    {correctAnswers[logo.id] ? (
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                        <h3 className="font-bold">Correct!</h3>
                        <p>This is the logo for <strong>{logo.name}</strong></p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold mb-2">
                          What brand is this logo for?
                        </h3>
                        <div className="flex">
                          <input
                            type="text"
                            value={answers[logo.id]}
                            onChange={(e) => handleInputChange(logo.id, e.target.value)}
                            className="flex-1 p-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your answer"
                          />
                          <button
                            onClick={() => checkAnswer(logo.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                          >
                            Check
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p><strong>Brand:</strong> {logo.name}</p>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LogoQuizGame;