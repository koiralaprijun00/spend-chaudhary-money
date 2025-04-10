'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getQuestionsByLocale } from '../../data/would-you-rather/getQuestions';
import GameButton from '../../components/ui/GameButton';
import AdSenseGoogle from '../../components/AdSenseGoogle';
import { FiShare2, FiRefreshCw, FiSend } from 'react-icons/fi';
import { useLocale } from 'next-intl';

interface WouldYouRatherQuestion {
  id: string;
  optionA: string;
  optionB: string;
  optionAVotes: number;
  optionBVotes: number;
}

export default function WouldYouRatherPage() {
  const locale = useLocale();
  const t = useTranslations('Translations');
  
  const allQuestions = getQuestionsByLocale(locale);
  
  const [questions, setQuestions] = useState<WouldYouRatherQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [loading, setLoading] = useState(false);
  const [realVoteCounts, setRealVoteCounts] = useState<{[key: string]: {optionA: number, optionB: number}}>({});

  useEffect(() => {
    if (allQuestions.length > 0) {
      shuffleQuestions();
    }
  }, [allQuestions]);

  const shuffleQuestions = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
  };
  
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      fetchVoteCounts(questions[currentQuestionIndex].id);
    }
  }, [questions, currentQuestionIndex]);

  const fetchVoteCounts = async (questionId: string) => {
    try {
      if (realVoteCounts[questionId]) return;
      
      const response = await fetch(`/api/would-you-rather?questionId=${questionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch vote counts');
      }
      
      const data = await response.json();
      
      setRealVoteCounts(prev => ({
        ...prev,
        [questionId]: {
          optionA: data.optionA,
          optionB: data.optionB
        }
      }));
      
    } catch (error) {
      console.error('Error fetching vote counts:', error);
    }
  };

  const submitVote = async (questionId: string, vote: 'A' | 'B') => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/would-you-rather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId, vote }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }
      
      const data = await response.json();
      
      setRealVoteCounts(prev => ({
        ...prev,
        [questionId]: {
          optionA: data.optionA,
          optionB: data.optionB
        }
      }));
      
    } catch (error) {
      console.error('Error submitting vote:', error);
      setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        if (vote === 'A') {
          updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            optionAVotes: updatedQuestions[currentQuestionIndex].optionAVotes + 1
          };
        } else {
          updatedQuestions[currentQuestionIndex] = {
            ...updatedQuestions[currentQuestionIndex],
            optionBVotes: updatedQuestions[currentQuestionIndex].optionBVotes + 1
          };
        }
        return updatedQuestions;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: 'A' | 'B') => {
    if (selectedOption || loading) return;
    
    setSelectedOption(option);
    
    if (currentQuestion) {
      submitVote(currentQuestion.id, option);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
    }
  };

  const handleShareResult = async () => {
    if (!selectedOption || !currentQuestion) return;
    
    const chosenOption = selectedOption === 'A' ? currentQuestion.optionA : currentQuestion.optionB;
    const percentageChosen = selectedOption === 'A' ? percentageA : percentageB;
    
    const shareText = t('wouldYouRather.shareText', {
      question: `Would you rather ${currentQuestion.optionA} OR ${currentQuestion.optionB}?`,
      choice: chosenOption,
      percentage: percentageChosen
    });
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: t('wouldYouRather.title'),
          text: shareText,
          url: 'https://piromomo.com/would-you-rather'
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert(t('clipboardMessage'));
      }
    } catch (error) {
      console.error('Error sharing:', error);
      await navigator.clipboard.writeText(shareText);
      alert(t('clipboardMessage'));
    }
  };

  const getVoteCounts = () => {
    if (!currentQuestion) return { optionA: 0, optionB: 0 };
    
    if (realVoteCounts[currentQuestion.id]) {
      return realVoteCounts[currentQuestion.id];
    }
    
    return {
      optionA: currentQuestion.optionAVotes,
      optionB: currentQuestion.optionBVotes
    };
  };

  const calculatePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const votes = getVoteCounts();
  const totalVotes = votes.optionA + votes.optionB;
  const percentageA = calculatePercentage(votes.optionA, totalVotes);
  const percentageB = calculatePercentage(votes.optionB, totalVotes);

  return (
    <div className="min-h-screen w-full py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-3">
            {t('wouldYouRather.title') || 'Would You Rather - Nepal Edition'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('wouldYouRather.description') || 'Choose between two uniquely Nepali scenarios and see how your choices compare with others!'}
          </p>
        </div>
        
       
        
        {/* Main Game Card */}
        <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg mb-6">
          <div className="bg-white rounded-lg p-6">
          <div className="flex justify-end items-center">
            {/* Refresh Button */}
            <button
              onClick={shuffleQuestions}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg px-3 py-2 text-sm flex items-center transition"
            >
              <FiRefreshCw className="mr-2 h-4 w-4" />
              {t('wouldYouRather.newQuestions') || 'New Questions'}
            </button>
          </div>
            <h2 className="text-2xl font-bold text-center mb-8">
              {t('wouldYouRather.questionPrefix') || 'Would you rather...'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleOptionSelect('A')}
                disabled={selectedOption !== null || loading}
                className={`p-6 rounded-xl text-lg font-medium transition transform hover:scale-105 focus:outline-none ${
                  loading ? 'opacity-75 cursor-wait' : ''
                } ${
                  selectedOption === 'A'
                    ? 'bg-blue-100 border-2 border-blue-600 text-blue-900'
                    : selectedOption === 'B'
                    ? 'bg-gray-100 border border-gray-300 text-gray-500'
                    : 'bg-white border-2 border-blue-200 text-gray-800 hover:border-blue-600 hover:bg-blue-50'
                }`}
              >
                <div className="mb-3 text-3xl">🇦</div>
                <div>{currentQuestion.optionA}</div>
                
                {selectedOption && (
                  <div className="mt-4">
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-1000 ease-out"
                        style={{ width: `${percentageA}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-bold text-blue-700">{percentageA}%</span>
                      <span className="text-sm text-gray-500">{votes.optionA} votes</span>
                    </div>
                  </div>
                )}
              </button>
              
              <button
                onClick={() => handleOptionSelect('B')}
                disabled={selectedOption !== null || loading}
                className={`p-6 rounded-xl text-lg font-medium transition transform hover:scale-105 focus:outline-none ${
                  loading ? 'opacity-75 cursor-wait' : ''
                } ${
                  selectedOption === 'B'
                    ? 'bg-red-100 border-2 border-red-600 text-red-900'
                    : selectedOption === 'A'
                    ? 'bg-gray-100 border border-gray-300 text-gray-500'
                    : 'bg-white border-2 border-red-200 text-gray-800 hover:border-red-600 hover:bg-red-50'
                }`}
              >
                <div className="mb-3 text-3xl">🇧</div>
                <div>{currentQuestion.optionB}</div>
                
                {selectedOption && (
                  <div className="mt-4">
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 transition-all duration-1000 ease-out"
                        style={{ width: `${percentageB}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-bold text-red-700">{percentageB}%</span>
                      <span className="text-sm text-gray-500">{votes.optionB} votes</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
            
            {loading && (
              <div className="flex justify-center items-center my-4">
                <div className="animate-spin h-5 w-5 border-2 border-blue-600 rounded-full border-t-transparent"></div>
                <span className="ml-2 text-sm text-gray-600">{t('loading')}</span>
              </div>
            )}
            
            {selectedOption && !loading && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-gray-700">
                  {t('wouldYouRather.resultMessage', {
                    percentage: selectedOption === 'A' ? percentageA : percentageB
                  }) || `${selectedOption === 'A' ? percentageA : percentageB}% of people agree with you!`}
                </p>
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              {selectedOption && !loading ? (
                <div className="flex gap-4">
                  <GameButton onClick={handleShareResult} type="neutral">
                    <FiShare2 className="mr-2" />
                    {t('wouldYouRather.share') || 'Share'}
                  </GameButton>
                  <GameButton onClick={handleNextQuestion} type="primary">
                    {t('wouldYouRather.next') || 'Next Question'} →
                  </GameButton>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm py-2">
                  {loading 
                    ? t('loading') || 'Processing...' 
                    : t('wouldYouRather.choosePrompt') || 'Select an option to see how others voted'}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-yellow-800 mb-2">
            {t('wouldYouRather.submitYourOwn') || 'Have a great "Would You Rather" idea?'}
          </h3>
          <p className="text-sm text-yellow-700 mb-3">
            {t('wouldYouRather.submitDescription') || 'Submit your own questions for possible inclusion in the game!'}
          </p>
          <a
            href="mailto:submit@piromomo.com?subject=Would You Rather Submission"
            className="inline-flex items-center px-3 py-2 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition"
          >
            <FiSend className="mr-2" />
            {t('wouldYouRather.submitButton') || 'Submit a Question'}
          </a>
        </div>
        
        <div className="flex justify-center">
          <div className="w-[300px] h-[250px]">
            <AdSenseGoogle
              adSlot="9573643237"
              adFormat="rectangle"
              style={{ width: '300px', height: '250px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}