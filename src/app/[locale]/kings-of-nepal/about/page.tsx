'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export default function KingsOfNepalBlog() {
  const mainT = useTranslations('Translations');
  const t = useTranslations('kingsofnepal');
  const [activeKing, setActiveKing] = useState<string | null>(null);
  
  // Get all kings IDs in chronological order
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

  return (
    <div className="min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-0 py-6 md:py-16">
          <h1 className="text-5xl md:text-6xl mb-4">
            {mainT('kingTitle')}
          </h1>
          <p className="max-w-2xl leading-relaxed text-lg">
            {mainT('kingofNepalSubHeading')}
          </p>
        </div>

      <div className="max-w-5xl mx-auto px-4 md:px-0 py-16">
        <div className="space-y-24">
          {kingsIds.map((kingId, index) => (
            <div 
              key={kingId}
              id={kingId}
              className="scroll-mt-20"
            >
              {/* King number indicator */}
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-700 text-white font-serif text-xl">
                  {index + 1}
                </div>
                <div className="h-0.5 flex-grow ml-4 bg-amber-400"></div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
                <div className="md:flex">
                  {/* Text - Left Side */}
                  <div className="p-8 md:w-1/2">
                    <h2 className="text-3xl font-serif text-amber-900 mb-3">
                      {t(`${kingId}.title`)}
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-amber-700 text-sm font-medium px-3 py-1 bg-amber-50 rounded-full">
                        {t(`${kingId}.reign_years`)}
                      </span>
                    </div>
                    <div className="prose prose-amber prose-lg">
                      <p className="text-gray-700 leading-relaxed">
                        {t(`${kingId}.description`)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Image - Right Side */}
                  <div className="md:w-1/2 relative">
                    <div className="relative h-96 md:h-full">
                      <Image 
                        src={t(`${kingId}.image`)}
                        alt={t(`${kingId}.title`)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}