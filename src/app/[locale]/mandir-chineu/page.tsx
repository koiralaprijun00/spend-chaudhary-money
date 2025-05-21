'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getTemplesByLocale } from '../../data/guess-temple/getTemples';
import { Temple } from '../../data/guess-temple/temple';
import AdSenseGoogle from '../../components/AdSenseGoogle';
import GameButton from '../../components/ui/GameButton';
import { CheckCircleIcon, XCircleIcon, RefreshCwIcon } from 'lucide-react';
import Image from 'next/image';

// Main Component
export default function GuessTempleGame() {
  const locale = useLocale();
  const t = useTranslations('Translations');

  const temples = React.useMemo(() => getTemplesByLocale(locale), [locale]);
  const templeIds = React.useMemo(() => temples.map((temple) => temple.id), [temples]);

  const normalizeSpelling = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/pathibara/g, 'pathivara')
      .replace(/pashupatinath/g, 'pashupati')
      .replace(/swayambhunath/g, 'swayambhu')
      .replace(/boudhanath/g, 'boudha')
      .replace(/changunarayan/g, 'changu')
      .replace(/temple|mandir|stupa|monastery/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const getRandomTempleId = useCallback(() => {
    if (templeIds.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * templeIds.length);
    return templeIds[randomIndex];
  }, [templeIds]);

  const [currentTempleId, setCurrentTempleId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const currentTemple = React.useMemo(() =>
    temples.find(temple => temple.id === currentTempleId),
    [temples, currentTempleId]
  );

  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [templeHistory, setTempleHistory] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (templeIds.length > 0 && !isInitialized) {
      setCurrentTempleId(getRandomTempleId());
      setIsInitialized(true);
    }
  }, [templeIds, isInitialized, getRandomTempleId]);

  useEffect(() => {
    if (isInitialized) {
      inputRef.current?.focus();
    }
  }, [isInitialized]);

  const handleGuess = useCallback((selectedOption: string) => {
    if (isAnswered || !currentTempleId) return;
    if (!currentTemple) return;

    const normalizedGuess = normalizeSpelling(selectedOption);
    const acceptableAnswers = currentTemple.acceptableAnswers?.map(normalizeSpelling) || [];
    const normalizedTempleName = normalizeSpelling(currentTemple.name);
    const normalizedAltNames = currentTemple.alternativeNames?.map(normalizeSpelling) || [];

    const correct = normalizedGuess === normalizedTempleName || 
                    normalizedAltNames.includes(normalizedGuess) ||
                    acceptableAnswers.includes(normalizedGuess);

    setCurrentGuess('');

    if (correct) {
      const newPoints = 10;  // Standard mode points
      setScore((prev) => prev + newPoints);
      setIsCorrect(true);
      setTempleHistory((prev) => {
        const newHistory = [...prev, currentTempleId];
        return newHistory.slice(-100);
      });
    } else {
      setIsCorrect(false);
    }

    setIsAnswered(true);
  }, [isAnswered, currentTemple, currentTempleId]);

  const handleInputGuess = useCallback(() => {
    if (!currentGuess.trim()) return;
    handleGuess(currentGuess.trim());
  }, [currentGuess, handleGuess]);

  const handleNextTemple = useCallback(() => {
    if (!currentTempleId) return;

    let availableTempleIds = templeIds.filter(
      (id) => !templeHistory.slice(-Math.min(3, templeIds.length - 1)).includes(id)
    );

    if (availableTempleIds.length === 0) {
      setTempleHistory([currentTempleId]);
      availableTempleIds = templeIds.filter((id) => id !== currentTempleId);
    }

    const nextIndex = Math.floor(Math.random() * availableTempleIds.length);
    const newTempleId = availableTempleIds[nextIndex];

    setCurrentTempleId(newTempleId);
    setIsAnswered(false);
    setIsCorrect(false);
    setCurrentGuess('');

    setTimeout(() => inputRef.current?.focus(), 0);
  }, [templeIds, templeHistory, currentTempleId]);

  // Handle Enter key press when answer is revealed
  useEffect(() => {
    if (!isAnswered) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleNextTemple();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, handleNextTemple]);

  const restartGame = useCallback(() => {
    setScore(0);
    setTempleHistory([]);
    setIsAnswered(false);
    setIsCorrect(false);
    setCurrentGuess('');

    const newTempleId = getRandomTempleId();
    setCurrentTempleId(newTempleId);
  }, [getRandomTempleId]);

  const handleShareScore = async () => {
    const shareMessage = t('guessTemple.shareMessage', {
      defaultValue: 'I scored {score} points in the Guess the Temple game! Can you beat my score?',
      score,
      url: 'https://piromomo.com/mandir-chineu',
    });

    try {
      if (navigator.share) {
        await navigator.share({
          title: t('guessTemple.title', { defaultValue: 'Guess the Temple' }),
          text: shareMessage,
          url: 'https://piromomo.com/mandir-chineu',
        });
      } else {
        await navigator.clipboard.writeText(shareMessage);
        alert(t('guessTemple.clipboardMessage', { defaultValue: 'Score copied to clipboard!' }));
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      await navigator.clipboard.writeText(shareMessage);
      alert(t('guessTemple.clipboardMessage', { defaultValue: 'Score copied to clipboard!' }));
    }
  };

  if (!isInitialized || !currentTemple) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading', { defaultValue: 'Loading...' })}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left AdSense Sidebar */}
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] ml-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle
              adSlot="6865219846"
              adFormat="vertical"
              style={{ width: '160px', height: '400px' }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto px-4 py-8">
          <div className="min-h-screen w-full py-4 px-4 md:px-6">
            <div className="max-w-xl mx-auto">
              {/* Main Game Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-500 p-1 rounded-xl shadow-lg mb-4">
                <div className="box-border px-4 py-6 text-white">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {t('guessTemple.title', { defaultValue: 'Guess the Temple' })}
                  </h1>
                  <p className="text-base sm:text-lg">
                    {t('guessTemple.description', { defaultValue: 'Test your knowledge of Nepali temples and sacred sites!' })}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  {/* Game Controls */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-3 py-1.5 flex items-center">
                      <span className="text-xs sm:text-sm text-gray-600 mr-2">{t('score', { defaultValue: 'Score' })}:</span>
                      <span className="text-lg sm:text-xl font-bold text-blue-700">{score}</span>
                    </div>
                    <button
                      onClick={restartGame}
                      className="bg-gray-100 p-1.5 sm:p-2 rounded-lg hover:bg-gray-200"
                      title={t('guessTemple.restart', { defaultValue: 'Restart Game' })}
                      aria-label={t('guessTemple.restart', { defaultValue: 'Restart Game' })}
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                    </button>
                  </div>

                  {!isAnswered ? (
                    <div className="space-y-4">
                      {/* Temple Image */}
                      <div className="relative aspect-[16/9] max-h-[300px] w-full rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={currentTemple.imagePath}
                          alt={t('guessTemple.templeToGuess', { defaultValue: 'Temple to guess' })}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 67vw"
                          priority
                        />
                      </div>

                      {/* Input Method */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          {t('guessTemple.typeTemplementName', { defaultValue: 'Type the temple name:' })}
                        </h3>

                        <form onSubmit={(e) => { e.preventDefault(); handleInputGuess(); }} className="space-y-3">
                          <label htmlFor="temple-guess" className="sr-only">
                            {t('guessTemple.enterTempleName', { defaultValue: 'Enter temple name...' })}
                          </label>
                          <input
                            id="temple-guess"
                            ref={inputRef}
                            type="text"
                            value={currentGuess}
                            onChange={(e) => setCurrentGuess(e.target.value)}
                            placeholder={t('guessTemple.enterTempleName', { defaultValue: 'Enter temple name...' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            disabled={isAnswered}
                            aria-label={t('guessTemple.enterTempleName', { defaultValue: 'Enter temple name...' })}
                          />

                          <p className="text-sm text-gray-600 mt-1">
                            {t('guessTemple.inputHint', {
                              defaultValue: 'Tip: You can type just the main name (e.g., "Pathibara" for "Pathivara Devi Temple"). Common spelling variations are accepted.'
                            })}
                          </p>

                          <GameButton
                            type="primary"
                            onClick={handleInputGuess}
                            disabled={!currentGuess.trim()}
                            className="w-full py-3"
                          >
                            {t('guessTemple.submitGuess', { defaultValue: 'Submit Guess' })}
                          </GameButton>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Result */}
                      <div className={`p-4 rounded-lg flex items-center gap-3 ${
                        isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        {isCorrect ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        ) : (
                          <XCircleIcon className="h-6 w-6 text-red-600" />
                        )}
                        <div>
                          <h3 className="font-bold text-lg">
                            {isCorrect ? t('correct', { defaultValue: 'Correct!' }) : t('incorrect', { defaultValue: 'Incorrect' })}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isCorrect
                              ? t('guessTemple.wellDone', { defaultValue: 'Well done! You got it right!' })
                              : t('guessTemple.betterLuckNext', { defaultValue: 'Better luck next time!' })
                            }
                          </p>
                        </div>
                      </div>

                      {/* Temple Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {currentTemple.name}
                        </h4>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p><strong>{t('guessTemple.location', { defaultValue: 'Location' })}:</strong> {currentTemple.location}</p>
                          <p><strong>{t('guessTemple.type', { defaultValue: 'Type' })}:</strong> {currentTemple.type}</p>
                          {currentTemple.built && (
                            <p><strong>{t('guessTemple.built', { defaultValue: 'Built' })}:</strong> {currentTemple.built}</p>
                          )}
                          {currentTemple.deity && (
                            <p><strong>{t('guessTemple.deity', { defaultValue: 'Primary Deity' })}:</strong> {currentTemple.deity}</p>
                          )}
                        </div>

                        {currentTemple.description && (
                          <p className="text-gray-700 leading-relaxed">
                            {currentTemple.description}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <GameButton onClick={handleNextTemple} type="primary" className="flex-1">
                          {t('guessTemple.nextTemple', { defaultValue: 'Next Temple' })} →
                        </GameButton>
                        <GameButton onClick={handleShareScore} type="success" className="flex-1">
                          {t('shareScore', { defaultValue: 'Share Score' })}
                        </GameButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right AdSense Sidebar */}
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