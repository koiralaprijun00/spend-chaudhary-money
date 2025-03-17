'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { useTranslations } from 'next-intl';
import { getKingsInChronologicalOrder, King } from '../../../data/kings-data'; // Updated import

export default function KingsOfNepalParallax({ params: paramsPromise }: { params: Promise<{ locale: string }> }) {
  const params = React.use(paramsPromise);
  const { locale } = params;
  const t = useTranslations('Translations');
  
  const kings = getKingsInChronologicalOrder();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const getLocalizedContent = (king: King, field: string) => {
    if (locale === 'ne' && king[`${field}_ne` as keyof King]) {
      return king[`${field}_ne` as keyof King];
    }
    return king[field as keyof King];
  };
  
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, kings.length);
  }, [kings.length]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let newActiveIndex = 0;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const offsetTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + sectionHeight) {
          newActiveIndex = index;
        }
      });
      
      setActiveIndex(newActiveIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToKing = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const getGlobalEra = (reignStart: number) => {
    if (reignStart < 1800) return t('enlightenment');
    if (reignStart < 1850) return t('industrial');
    if (reignStart < 1900) return t('imperialism');
    if (reignStart < 1950) return t('worldWars');
    return t('modern');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href={`/${locale}`}
            aria-label={t('backToHome')}
            className="group flex items-center text-gray-500 font-medium hover:text-gray-800 transition duration-200"
          >
            <TbArrowBigLeftLinesFilled className="mr-2 transition-colors duration-200 group-hover:text-gray-800" size={20} />
            {t('backToHome')}
          </Link>
          
          <h1 className="text-xl font-bold text-gray-800">{t('pageTitle')}</h1>
          
          <Link
            href={`/${locale}/kings-of-nepal`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {t('takeQuiz')}
          </Link>
        </div>
      </div>
      
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-3">
          {kings.map((king, index) => (
            <button
              key={king.id}
              onClick={() => scrollToKing(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={String(getLocalizedContent(king, 'name'))}
              aria-label={t('scrollToKing', { name: String(getLocalizedContent(king, 'name')) })}
            />
          ))}
        </div>
      </div>
      
      <div className="pt-20">
        {kings.map((king, index) => (
          <section
            key={king.id}
            ref={el => { sectionRefs.current[index] = el as HTMLDivElement; }}
            className={`min-h-screen relative transition-opacity duration-500 ${
              Math.abs(activeIndex - index) <= 1 ? 'opacity-100' : 'opacity-40'
            }`}
            style={{
              backgroundAttachment: 'fixed'
            }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 30%, ${
                  String(getLocalizedContent(king, 'dynasty')) === 'Shah' ? 'rgba(30, 64, 175, 0.05)' : 'rgba(125, 30, 175, 0.05)'
                }, ${
                  String(getLocalizedContent(king, 'dynasty')) === 'Shah' ? 'rgba(30, 64, 175, 0.3)' : 'rgba(125, 30, 175, 0.3)'
                })`
              }}
            ></div>
            
            <div className="relative z-20 max-w-6xl mx-auto px-4 py-16 flex flex-col justify-center min-h-screen">
              <div className="mb-6 flex items-center">
                <div 
                  className={`h-0.5 w-16 mr-4 ${
                    String(getLocalizedContent(king, 'dynasty')) === 'Shah' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}
                ></div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${
                  String(getLocalizedContent(king, 'dynasty')) === 'Shah' ? 'text-blue-600' : 'text-purple-600'
                }`}>
                  {getLocalizedContent(king, 'dynasty')} {t('dynasty')}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-3">{getLocalizedContent(king, 'name')}</h2>
              <h3 className="text-xl md:text-2xl text-gray-600 mb-8">
                {king.reignStart} — {king.reignEnd} • {king.reignEnd - king.reignStart} {t('years')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{t('notableAchievements')}</h4>
                  <p className="text-gray-700 mb-6">{getLocalizedContent(king, 'notable')}</p>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{t('historicalFacts')}</h4>
                  <ul className="space-y-3">
                    {(locale === 'ne' && king.facts_ne 
                      ? king.facts_ne 
                      : king.facts).map((fact, factIndex) => (
                      <li key={factIndex} className="flex">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="md:col-span-2">
                  {/* King's Picture */}
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">{t('portrait')}</h4>
                    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
                      {king.imgSrc ? (  // Changed from imageUrl to imgSrc
                        <img 
                          src={king.imgSrc}  // Changed from imageUrl to imgSrc
                          alt={`${getLocalizedContent(king, 'name')} portrait`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-500">{t('noImageAvailable')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">{t('historicalContext')}</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-700">{t('precededBy')}</h5>
                        <p className="text-gray-600">
                          {index > 0 
                            ? getLocalizedContent(kings[index - 1], 'name')
                            : t('founderOfDynasty')}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-700">{t('succeededBy')}</h5>
                        <p className="text-gray-600">
                          {index < kings.length - 1 
                            ? getLocalizedContent(kings[index + 1], 'name')
                            : t('lastKing')}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-700">{t('globalEra')}</h5>
                        <p className="text-gray-600">
                          {getGlobalEra(king.reignStart)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-12">
                <button
                  onClick={() => scrollToKing(Math.max(0, index - 1))}
                  disabled={index === 0}
                  className={`flex items-center ${
                    index === 0 
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {index > 0 && (
                    <span className="font-medium">{t('previous')}: {getLocalizedContent(kings[index - 1], 'name')}</span>
                  )}
                </button>
                
                <button
                  onClick={() => scrollToKing(Math.min(kings.length - 1, index + 1))}
                  disabled={index === kings.length - 1}
                  className={`flex items-center ${
                    index === kings.length - 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {index < kings.length - 1 && (
                    <span className="font-medium">{t('next')}: {getLocalizedContent(kings[index + 1], 'name')}</span>
                  )}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
          </section>
        ))}
      </div>
      
      <div className="bg-blue-50 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('testYourKnowledge')}</h2>
          <p className="text-gray-700 mb-6">
            {t('quizInvitation')}
          </p>
          <Link
            href={`/${locale}/kings-of-nepal`}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors"
          >
            {t('takeQuiz')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}