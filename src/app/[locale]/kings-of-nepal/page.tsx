'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AdSenseGoogle from '../../components/AdSenseGoogle'; // Import AdSense component

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

  return (
    <div className="min-h-screen w-full">
      {/* Main layout with sidebars */}
      <div className="flex justify-center">
        {/* Left sidebar ad - hidden on mobile */}
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] ml-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle
              adSlot="6865219846" // Use your actual left sidebar ad slot ID
              adFormat="vertical"
              style={{ width: '160px', height: '400px' }}
            />
          </div>
        </div>
        
        {/* Main content */}
        <div className="bg-gray-50 py-8 px-4 flex-1">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Left Column - Title and Instructions */}
            <div className="md:w-1/3">
              <div className="mb-8 md:mt-8 mt-4 sticky top-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t('kingQuizTitle')}</h1>
                <p className="text-lg text-gray-700 mb-4">
                  {t('quizInstructions', { kingCount: sortedKings.length })}
                  <br />{t('typeNamesInstruction')}
                </p>
                <Link href="/kings-of-nepal/about" className="block mt-4 text-blue-600 hover:underline">
                  {t('learnAboutKingsLink')}
                </Link>
                {!gameStarted && !gameOver && (
                  <button
                    onClick={startGame}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-200"
                  >
                    {t('startQuiz')}
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Game Content */}
            <div className="md:w-2/3">
              {/* Active game */}
              {gameStarted && !gameOver && (
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{t('progressCounter', { 
                        current: correctAnswers.length, 
                        total: sortedKings.length,
                        percent: Math.round(percentComplete)
                      })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${percentComplete}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder={t('inputPlaceholder')}
                      className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                  
                  <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">{t('numberSymbol')}</th>
                          <th scope="col" className="px-4 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">{t('reignLabel')}</th>
                          <th scope="col" className="px-4 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">{t('kingNameLabel')}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedKings.map((king, index) => (
                          <tr key={king.id} className={correctAnswers.includes(king.id) ? "bg-green-50" : ""}>
                            <td className="px-4 py-3 whitespace-nowrap text-md text-gray-900">{index + 1}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-md text-gray-900">{king.reignStart} - {king.reignEnd}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-md text-gray-900">
                              {correctAnswers.includes(king.id) ? (
                                <span className="font-medium">{king.name}</span>
                              ) : (
                                <span className="text-gray-400">{t('unguessedPlaceholder')}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={handleGiveUp}
                      className="text-gray-600 hover:text-gray-800 underline text-sm font-medium"
                    >
                      {t('giveUpButton')}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Game over / results screen */}
              {gameOver && (
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {gaveUp 
                        ? t('gaveUpHeading')
                        : correctAnswers.length === sortedKings.length 
                          ? t('perfectScoreHeading')
                          : t('timesUpHeading')}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {t.rich('resultsMessage', {
                        count: correctAnswers.length,
                        total: sortedKings.length,
                        isPerfect: correctAnswers.length === sortedKings.length
                      })}
                    </p>
                  </div>
                  
                  <div className="overflow-hidden rounded-lg border border-gray-200 mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">{t('numberSymbol')}</th>
                          <th scope="col" className="px-4 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">{t('reignLabel')}</th>
                          <th scope="col" className="px-4 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">{t('kingNameLabel')}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedKings.map((king, index) => (
                          <tr key={king.id} className={correctAnswers.includes(king.id) ? "bg-green-50" : "bg-red-50"}>
                            <td className="px-4 py-3 whitespace-nowrap text-md text-gray-900">{index + 1}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-md text-gray-900">{king.reignStart} - {king.reignEnd}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-md text-gray-900 font-medium">
                              {king.name}
                              {correctAnswers.includes(king.id) ? (
                                <span className="ml-2 text-green-600">✓</span>
                              ) : (
                                <span className="ml-2 text-red-600">✗</span>
                              )}
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handlePlayAgain}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-200"
                    >
                      {t('playAgainButton')}
                    </button>
                    <button
                      onClick={handleShareScore}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      {t('shareScoreButton')}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        
        {/* Right sidebar ad - hidden on mobile */}
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] mr-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle 
              adSlot="9978468343" // Use your actual right sidebar ad slot ID
              adFormat="vertical"
              style={{ width: '160px', height: '400px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}