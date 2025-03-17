'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { useTranslations } from 'next-intl';
import { getKingsInChronologicalOrder, King } from '../../../data/kings-data';

export default function KingsOfNepalParallax({ params: paramsPromise }: { params: Promise<{ locale: string }> }) {
  const params = React.use(paramsPromise);
  const { locale } = params;
  const t = useTranslations('Translations');
  
  const kings = getKingsInChronologicalOrder();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const getLocalizedContent = (king: King, field: string) => {
    if (locale === 'ne' && king[`${field}_ne` as keyof King]) {
      return king[`${field}_ne` as keyof King];
    }
    return king[field as keyof King];
  };
  
  const navigateToKing = (index: number) => {
    if (index >= 0 && index < kings.length && !isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your transition duration
    }
  };

  const king = kings[activeIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
    {/* Header with subtle gradient */}
    <div className="p-4 bg-white  z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          href={`/${locale}`}
          aria-label={t('backToHome')}
          className="group flex items-center text-gray-600 font-medium hover:text-blue-600 transition duration-200"
        > 
          <TbArrowBigLeftLinesFilled className="mr-2 transition-colors duration-200 group-hover:text-blue-600" size={22} />
          {t('backToHome')}
        </Link>
        
        <Link
          href={`/${locale}/kings-of-nepal`}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-md transition-colors duration-300"
        >
          {t('takeQuiz')}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
    
    {/* Main content */}
    <div className="flex-grow flex flex-col">
      {/* Navigation dots - made more prominent */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-4 p-2 rounded-full backdrop-blur-sm shadow-lg">
          {kings.map((king, index) => (
            <button
              key={king.id}
              onClick={() => navigateToKing(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-blue-600 scale-125 shadow-md' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={String(getLocalizedContent(king, 'name'))}
              aria-label={t('scrollToKing', { name: String(getLocalizedContent(king, 'name')) })}
            />
          ))}
        </div>
      </div>
      
      {/* King content */}
      <div className="flex-grow relative overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="max-w-6xl mx-auto px-4 py-8 h-full flex flex-col">
            <div className="mb-6 flex items-center">
              <div 
                className={`h-1 w-20 mr-4 ${
                  String(getLocalizedContent(king, 'dynasty')) === 'Shah' ? 'bg-blue-600' : 'bg-purple-600'
                }`}
              ></div>
              <span className={`text-sm font-semibold uppercase tracking-wider ${
                String(getLocalizedContent(king, 'dynasty')) === 'Shah' ? 'text-blue-600' : 'text-purple-600'
              }`}>
                {getLocalizedContent(king, 'dynasty')} {t('dynasty')}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">{getLocalizedContent(king, 'name')}</h2>
            <h3 className="text-lg md:text-xl text-gray-600 mb-6">
              <span className="font-medium">{king.reignStart} — {king.reignEnd}</span> • <span className="italic">{king.reignEnd - king.reignStart} {t('years')}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-grow overflow-auto max-h-[calc(100vh-300px)]">
              <div className="md:col-span-3 bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">{t('historicalFacts')}</h4>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {locale === 'ne' && king.paragraph_ne ? king.paragraph_ne : king.paragraph}
                </p>
              </div>
              
              <div className="md:col-span-2">
                {/* Enhanced King's Portrait */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-4 transform transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                  {/* Decorative background element */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 bg-blue-600"></div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-4 relative z-10">{t('portrait')}</h4>
                  
                  <div className="relative w-full overflow-hidden rounded-lg shadow-inner">
                    {/* Portrait with enhanced border and hover effect */}
                    {king.imgSrc ? (
                      <div className="relative border-4 border-gray-100 rounded-lg transition-transform duration-500 hover:scale-[1.03] shadow-lg group">
                        <img 
                          src={king.imgSrc}
                          alt={`${getLocalizedContent(king, 'name')} portrait`}
                          className="w-full h-64 md:h-80 object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-sm font-medium">{getLocalizedContent(king, 'name')}</p>
                          <p className="text-xs opacity-80">{king.reignStart} — {king.reignEnd}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-64 md:h-80 flex items-center justify-center bg-gray-100 border-4 border-gray-100 rounded-lg">
                        <span className="text-gray-500">{t('noImageAvailable')}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Notable achievement callout */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-blue-800 font-medium">
                      {getLocalizedContent(king, 'notable')}
                    </p>
                  </div>
                </div>
                
                {/* Facts section - new addition */}
                {king.facts && king.facts.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{t('quickFacts')}</h4>
                    <ul className="space-y-2">
                      {(locale === 'ne' && king.facts_ne ? king.facts_ne : king.facts).map((fact, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 mt-0.5 bg-blue-100 text-blue-600 rounded-full">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </span>
                          <span className="text-gray-700 text-sm">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Buttons - enhanced */}
            <div className="flex justify-between mt-6 py-2">
              <button
                onClick={() => navigateToKing(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0 || isTransitioning}
                className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 ${
                  activeIndex === 0 || isTransitioning
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {activeIndex > 0 && (
                  <span className="font-medium">{getLocalizedContent(kings[activeIndex - 1], 'name')}</span>
                )}
              </button>
              
              <button
                onClick={() => navigateToKing(Math.min(kings.length - 1, activeIndex + 1))}
                disabled={activeIndex === kings.length - 1 || isTransitioning}
                className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 ${
                  activeIndex === kings.length - 1 || isTransitioning
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md'
                }`}
              >
                {activeIndex < kings.length - 1 && (
                  <span className="font-medium">{getLocalizedContent(kings[activeIndex + 1], 'name')}</span>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}