'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AdSenseGoogle from '../../components/AdSenseGoogle';
import { FiShare2 } from 'react-icons/fi';

interface King {
  id: string;
  name: string;
  reignStart: string;
  reignEnd: string;
  acceptableAnswers: string[];
}

export default function KingsOfNepalQuiz() {
  // Quiz state
  const [input, setInput] = useState<string>('');
  const [gameStarted, setGameStarted] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [gaveUp, setGaveUp] = useState<boolean>(false);
  
  const t = useTranslations('Translations');
  const kingsT = useTranslations('kingsofnepal');
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Get kings data from translations
  const sortedKings = useMemo<King[]>(() => {
    const kingsIds = [
      'prithvi_narayan_shah',
      'pratap_singh_shah',
      'rana_bahadur_shah',
      'girvan_yuddha_bikram_shah',
      'rajendra_bikram_shah',
      'surendra_bikram_shah',
      'prithvi_bir_bikram_shah',
      'tribhuvan_bir_bikram_shah',
      'mahendra_bir_bikram_shah',
      'birendra_bir_bikram_shah',
      'dipendra_bir_bikram_shah',
      'gyanendra_bir_bikram_shah'
    ];
    
    return kingsIds.map(id => ({
      id,
      name: kingsT(`${id}.title`),
      reignStart: kingsT(`${id}.reign_years`).split('-')[0].trim(),
      reignEnd: kingsT(`${id}.reign_years`).split('-')[1].trim(),
      acceptableAnswers: [kingsT(`${id}.title`)]
    }));
  }, [kingsT]);

  // Function to check if an answer is correct
  const isAnswerCorrect = (input: string, king: King): boolean => {
    const normalizedInput = input.trim().toLowerCase();
    const normalizedFullName = king.name.toLowerCase();

    // Remove common suffixes like 'shah', 'bir bikram', etc.
    const removeSuffix = (str: string) => str.replace(/\s*(shah|bir\s*bikram)\s*$/i, '').trim();

    return removeSuffix(normalizedFullName) === removeSuffix(normalizedInput);
  };

  useEffect(() => {
    setGameStarted(true);
    setCorrectAnswers([]);
    setGameOver(false);
    setGaveUp(false);
    setInput('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const percentComplete = (correctAnswers.length / sortedKings.length) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    const matchedKing = sortedKings.find((king) => 
      !correctAnswers.includes(king.id) && isAnswerCorrect(value, king)
    );
    if (matchedKing) {
      setCorrectAnswers(prev => [...prev, matchedKing.id]);
      setInput('');
      if (correctAnswers.length + 1 === sortedKings.length) {
        setGameOver(true);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCorrectAnswers([]);
    setGameOver(false);
    setGaveUp(false);
    setInput('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleGiveUp = () => {
    setGameOver(true);
    setGaveUp(true);
  };

  const handlePlayAgain = () => {
    startGame();
  };

  const handleShareScore = async () => {
    const scoreText = t('shareScoreText', {
      count: correctAnswers.length,
      total: sortedKings.length
    });
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: t('shareScoreTitle'),
          text: scoreText,
          url: t('shareScoreUrl')
        });
      } else {
        await navigator.clipboard.writeText(scoreText);
        alert(t('scoreCopiedAlert'));
      }
    } catch (error) {
      console.error('Error sharing score:', error);
    }
  };

  // Safe translation function to prevent errors
  const safeT = (key: string, defaultValue: string = '', params: any = {}) => {
    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return defaultValue;
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Main layout with sidebars */}
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
        
        {/* Main content */}
        <div className="flex-1 px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
            {/* Left Column - Title and Instructions */}
            <div className="md:w-1/3 space-y-6">
              <div className="bg-white  rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-2">
                    {safeT('kingQuizTitle', 'Write all Kings of Nepal Quiz')}
                  </h1>
                  <p className="text-left text-gray-600">
                  {safeT('quizInstructions', `You have 5 minutes to name all ${sortedKings.length} kings who ruled Nepal from 1743 to 2008.`, { kingCount: sortedKings.length })}
                  </p>
                  <p className="text-left text-gray-600  mt-2">
                    {safeT('typeNamesInstruction', 'Type the names of the kings in the input field.')}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-sm mb-2">Progress</h2>
                  <div className="bg-gradient-to-r from-blue-600 to-red-500 p-0.5 rounded-lg">
                    <div className="bg-white  rounded-md p-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-xl font-bold">{correctAnswers.length}</span>
                        <span className="ml-2 text-gray-600 ">/ {sortedKings.length}</span>
                      </div>
                      
                      <div className="bg-gray-100  px-2 py-0.5 rounded-full">
                        <span className="font-mono text-gray-800 ">
                          {Math.round(percentComplete)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {!gameStarted && !gameOver && (
                  <button
                    onClick={startGame}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                  >
                    {safeT('startQuiz', 'Start Quiz')}
                  </button>
                )}
                
                {gameStarted && !gameOver && (
                  <button
                    onClick={handleGiveUp}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800  font-medium py-2 px-4 rounded-md transition"
                  >
                    {safeT('giveUpButton', 'Give Up')}
                  </button>
                )}
                
                {gameOver && (
                  <div className="space-y-3">
                    <button
                      onClick={handlePlayAgain}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                    >
                      {safeT('playAgainButton', 'Play Again')}
                    </button>
                    
                    <button
                      onClick={handleShareScore}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center"
                    >
                     <FiShare2 className="h-5 w-5 mr-2" />
                      {safeT('shareScoreButton', 'Share Score')}
                    </button>
                  </div>
                )}
                
                <Link 
                  href="/kings-of-nepal/about" 
                  className="block mt-6 text-blue-600 hover:underline text-sm"
                >
                  {safeT('learnAboutKingsLink', 'Learn about the Kings of Nepal')}
                </Link>
              </div>
            </div>

            {/* Right Column - Game Content */}
            <div className="md:w-2/3">
              <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg">
                <div className="bg-white rounded-lg p-6">
                  
                  {/* Active game */}
                  {gameStarted && !gameOver && (
                    <div>
                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">{t('KingsofNepalTitle')}</h2>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${percentComplete}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <input
                          ref={inputRef}
                          type="text"
                          value={input}
                          onChange={handleInputChange}
                          placeholder={safeT('inputPlaceholder', 'Type a king\'s name...')}
                          className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                          autoComplete="off"
                          autoCapitalize="off"
                          spellCheck="false"
                        />
                      </div>
                      
                      <div className="overflow-hidden rounded-lg border border-gray-200 ">
                        <table className="min-w-full divide-y divide-gray-200 ">
                          <thead className="bg-gray-50 ">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">{safeT('numberSymbol', '#')}</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">{safeT('reignLabel', 'Reign')}</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">{safeT('kingNameLabel', 'King')}</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white  divide-y divide-gray-200">
                            {sortedKings.map((king, index) => (
                              <tr key={king.id} className={correctAnswers.includes(king.id) ? "bg-green-50" : ""}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 ">{index + 1}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 ">{king.reignStart} - {king.reignEnd}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 ">
                                  {correctAnswers.includes(king.id) ? (
                                    <span className="font-medium">{king.name}</span>
                                  ) : (
                                    <span className="text-gray-400">{safeT('unguessedPlaceholder', '?????')}</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {/* Game over / results screen */}
                  {gameOver && (
                    <div>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">
                          {gaveUp 
                            ? safeT('gaveUpHeading', 'You Gave Up')
                            : correctAnswers.length === sortedKings.length 
                              ? safeT('perfectScoreHeading', 'Perfect Score!')
                              : safeT('timesUpHeading', 'Game Over!')}
                        </h2>
                        <p className="text-gray-600">
                          You got {correctAnswers.length} out of {sortedKings.length} kings correct.
                        </p>
                      </div>
                      
                      <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">{safeT('numberSymbol', '#')}</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">{safeT('reignLabel', 'Reign')}</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">{safeT('kingNameLabel', 'King')}</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-20">
                            {sortedKings.map((king, index) => (
                              <tr key={king.id} className={correctAnswers.includes(king.id) ? "bg-green-50" : "bg-red-50"}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 ">{index + 1}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 ">{king.reignStart} - {king.reignEnd}</td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900  font-medium">
                                  {king.name}
                                  {correctAnswers.includes(king.id) ? (
                                    <span className="ml-2 text-green-600 ">✓</span>
                                  ) : (
                                    <span className="ml-2 text-red-600">✗</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
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
    </div>
  );
}