import React from 'react';

interface GuessFestivalHeaderProps {
  isNepali: boolean;
  toggleLanguage: () => void;
  gameMode: 'standard' | 'timed';
  switchGameMode: (mode: 'standard' | 'timed') => void;
  translations: Record<string, string>;
}

export default function GuessFestivalHeader({
  isNepali,
  toggleLanguage,
  gameMode,
  switchGameMode,
  translations,
}: GuessFestivalHeaderProps) {
  return (
    <header className="mb-6 text-left">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600">
        {isNepali ? 'चाडपर्व अनुमान गर्नुहोस्' : 'Guess the Festival'}
      </h1>
      <button
          onClick={toggleLanguage}
          className="px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition"
        >
          {isNepali ? 'in English' : 'नेपालीमा'}
        </button>
        </div>
      <div className="mt-2 flex flex-wrap gap-2 justify-start">
        
        <button
          onClick={() => switchGameMode('standard')}
          className={`px-3 py-1 rounded-full transition ${
            gameMode === 'standard' ? 'bg-sky-800 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {isNepali ? translations['Standard Mode'] : 'No Timer'}
        </button>
        <button
          onClick={() => switchGameMode('timed')}
          className={`px-3 py-1 rounded-full transition ${
            gameMode === 'timed' ? 'bg-sky-800 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {isNepali ? translations['Timed Mode'] : 'Timed Mode'}
        </button>
      </div>
    </header>
  );
}