'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import AdSenseGoogle from '../../components/AdSenseGoogle';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function NepalChecklistPage() {
  const t = useTranslations();
  const mainT = useTranslations('Translations');

  const items: ChecklistItem[] = React.useMemo(() => {
    const checklistData = t.raw('lifeChecklist');
    return Object.entries(checklistData).map(([key, item]) => {
      return item as ChecklistItem;
    });
  }, [t]);

  const [userProgress, setUserProgress] = useState<{ [key: string]: boolean }>({});
  const [adsLoaded, setAdsLoaded] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem('nepalChecklistProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    
    // Delay ad loading slightly to ensure containers are ready
    const timer = setTimeout(() => {
      setAdsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('nepalChecklistProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  const handleToggleItem = (itemId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const stats = React.useMemo(() => {
    const totalItems = items.length;
    const completedItems = Object.keys(userProgress).filter((id) => userProgress[id]).length;
    return {
      totalItems,
      completedItems,
      percentComplete: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
    };
  }, [userProgress, items]);

  return (
    <div className="min-h-screen">
      {/* Main layout with sidebars */}
      <div className="flex justify-center w-full">
        {/* Left sidebar ad - hidden on mobile */}
        <div className="hidden lg:block sticky top-24 self-start h-fit ml-2" style={{ width: '160px', minHeight: '600px' }}>
          {adsLoaded && (
            <div className="border border-gray-100" style={{ width: '160px', height: '600px' }}>
              <AdSenseGoogle
                adSlot="6865219846" // Replace with your actual ad slot
                adFormat="vertical"
                style={{ width: '160px', height: '600px' }}
              />
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="max-w-5xl w-full mx-auto p-4">
          <header className="text-center py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {mainT('nepalChecklist.navbarTitle')}
            </h1>
            <p className="mt-2 text-gray-600">{mainT('nepalChecklist.subtitle')}</p>

            <div className="mt-6 w-full max-w-3xl mx-auto">
              <p className="text-lg mb-2">
                {mainT('nepalChecklist.completionText', { 
                  completed: stats.completedItems, 
                  total: stats.totalItems, 
                  percent: stats.percentComplete 
                })}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${stats.percentComplete}%` }}
                ></div>
              </div>
            </div>
          </header>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  userProgress[item.id]
                    ? 'bg-green-50 border-green-500'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleToggleItem(item.id)}
              >
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full mr-3 flex-shrink-0">
                    {userProgress[item.id] ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile horizontal ad - only visible on mobile and smaller tablets */}
          {adsLoaded && (
            <div className="block lg:hidden w-full my-8 border border-gray-100" style={{ height: '250px' }}>
              <AdSenseGoogle 
                adSlot="6865219846" // Replace with your actual ad slot
                adFormat="horizontal" 
                style={{ width: '100%', height: '250px' }}
              />
            </div>
          )}
        </div>
        
        {/* Right sidebar ad - hidden on mobile */}
        <div className="hidden lg:block sticky top-24 self-start h-fit mr-2" style={{ width: '160px', minHeight: '600px' }}>
          {adsLoaded && (
            <div className="border border-gray-100" style={{ width: '160px', height: '600px' }}>
              <AdSenseGoogle 
                adSlot="6865219846" // Replace with your actual ad slot
                adFormat="vertical"
                style={{ width: '160px', height: '600px' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}