'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {getKingsInChronologicalOrder, isAnswerCorrect, King } from '../../data/kings-data';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

// Async function to generate metadata
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    // Basic metadata
    title: 'Kings of Nepal | Historical Timeline of Nepali Monarchy',
    description:
      'Explore the history of Nepal\'s monarchy from Prithvi Narayan Shah to Gyanendra Bir Bikram Shah. Test your knowledge with our interactive quiz.',

    // OpenGraph metadata for social sharing
    openGraph: {
      title: 'Kings of Nepal | Historical Timeline',
      description: 'Learn about the royal history of Nepal from unification to republic.',
      url: `https://piromomo.com/${params.locale}/kings-of-nepal`,
      type: 'website',
      images: [
        {
          url: 'https://piromomo.com/kings-of-nepal.jpg',
          width: 1200,
          height: 630,
          alt: 'Kings of Nepal Timeline',
        },
      ],
    },

    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: 'Kings of Nepal | Historical Timeline',
      description: 'Learn about the royal history of Nepal from unification to republic.',
      images: ['https://piromomo.com/kings-of-nepal.jpg'],
    },

    // Additional metadata
    keywords: ['Kings of Nepal', 'Nepali Monarchy', 'Prithvi Narayan Shah', 'Gyanendra Shah', 'History'],
    robots: 'index, follow',
  };
}

export default function KingsOfNepalQuiz() {
  // Quiz state
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [gameStarted, setGameStarted] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [gaveUp, setGaveUp] = useState(false);
  
  const sortedKings = useMemo(() => getKingsInChronologicalOrder(), []);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("Translations");

  useEffect(() => {
    setTimeLeft(300);
    setCorrectAnswers([]);
    setGameOver(false);
    setGaveUp(false);
    setInput('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const percentComplete = (correctAnswers.length / sortedKings.length) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    const matchedKing = sortedKings.find((king: King) => 
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
    setTimeLeft(300);
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
    const scoreText = `I named ${correctAnswers.length}/${sortedKings.length} Kings of Nepal in the Sporcle-style quiz on Piromomo! Can you beat my score? #NepalKingsQuiz`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Kings of Nepal Quiz Score',
          text: scoreText,
          url: 'https://piromomo.com/kings-of-nepal'
        });
      } else {
        await navigator.clipboard.writeText(scoreText);
        alert('Score copied to clipboard! Paste it to share.');
      }
    } catch (error) {
      console.error('Error sharing score:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column - Title and Instructions */}
        <div className="md:w-1/3">
          <div className="mb-8 md:mt-8 mt-4 sticky top-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{t('kingTitle')}</h1>
            <p className="text-lg text-gray-700 mb-4">
              {t('quizInstructions', { kingCount: sortedKings.length })}
              <br />{t('typeNamesInstruction')}
            </p>
            <Link href="/kings-of-nepal/about" className="block mt-4 text-blue-600 hover:underline">
              {t('LearnAboutKingsLink')}
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
                  <span>{correctAnswers.length} of {sortedKings.length} ({Math.round(percentComplete)}%)</span>
                  <span>{formatTime(timeLeft)} remaining</span>
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
                  placeholder="Type a king's name..."
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
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reign</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">King's Name</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedKings.map((king: King, index: number) => (
                      <tr key={king.id} className={correctAnswers.includes(king.id) ? "bg-green-50" : ""}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{king.reignStart} - {king.reignEnd}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {correctAnswers.includes(king.id) ? (
                            <span className="font-medium">{king.name}</span>
                          ) : (
                            <span className="text-gray-400">?????</span>
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
                  Give Up & See Answers
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
                    ? "Quiz Ended - You Gave Up" 
                    : correctAnswers.length === sortedKings.length 
                      ? "Congratulations! Perfect Score!" 
                      : "Time's Up!"}
                </h2>
                <p className="text-lg text-gray-600">
                  You named {correctAnswers.length} out of {sortedKings.length} kings
                  {!gaveUp && ` with ${formatTime(timeLeft)} remaining`}.
                  {correctAnswers.length === sortedKings.length && " - Impressive knowledge of Nepal's history!"}
                </p>
              </div>
              
              <div className="overflow-hidden rounded-lg border border-gray-200 mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reign</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">King's Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notable For</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedKings.map((king: King, index: number) => (
                      <tr key={king.id} className={correctAnswers.includes(king.id) ? "bg-green-50" : "bg-red-50"}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{king.reignStart} - {king.reignEnd}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {king.name}
                          {correctAnswers.includes(king.id) ? (
                            <span className="ml-2 text-green-600">✓</span>
                          ) : (
                            <span className="ml-2 text-red-600">✗</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{king.notable}</td>
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
                  Play Again
                </button>
                <button
                  onClick={handleShareScore}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Share Score
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}