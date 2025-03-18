'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { checklistData } from '../../data/checklist-data';

export default function NepalChecklistPage() {
  const t = useTranslations('Translations');
  const [userProgress, setUserProgress] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('nepalChecklistProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
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
    const totalItems = Object.keys(checklistData.items).length;
    const completedItems = Object.keys(userProgress).filter((id) => userProgress[id]).length;

    return {
      totalItems,
      completedItems,
      percentComplete: Math.round((completedItems / totalItems) * 100)
    };
  }, [userProgress]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto p-4">
        <header className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t('nepalChecklist.title')}
          </h1>
          <p className="mt-2 text-gray-600">{t('nepalChecklist.subtitle')}</p>
          
          <div className="mt-6 w-full max-w-3xl mx-auto">
            <p className="text-lg mb-2">
              <span className="font-bold">{stats.completedItems}</span> / {stats.totalItems} completed ({stats.percentComplete}%)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-600 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${stats.percentComplete}%` }}
              ></div>
            </div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(checklistData.items).map(item => (
            <div 
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProgress[item.id] 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start space-x-2">
                <div 
                  className="w-6 h-6 rounded-full mr-3 flex-shrink-0 cursor-pointer"
                  onClick={() => handleToggleItem(item.id)}
                >
                  {userProgress[item.id] ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  )}
                </div>
                <div>
                <div className="checklist-item">
  <h3 className="text-md">{item.title}</h3>
</div>
                  <p className="text-gray-600 text-xs">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar moved to the top */}
      </div>
    </div>
  );
}