'use client';

import { useState } from 'react';
import NepaliDate from 'nepali-date-converter';
import AdSenseGoogle from '../../components/AdSenseGoogle';
import { motion } from 'framer-motion';
import CustomDropdown from '../../components/ui/CustomDropdown';
import { useTranslations } from 'next-intl';

// Define interfaces
interface DateState {
  year: string;
  month: string;
  day: string;
}

interface DropdownOption {
  id: string;
  name: string;
}

export default function DateConverterPage() {
  const t = useTranslations('Translations.dateConverter');

  const [englishDate, setEnglishDate] = useState<DateState>({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
    day: new Date().getDate().toString().padStart(2, '0'),
  });

  const [nepaliDate, setNepaliDate] = useState<DateState>({
    year: '2080',
    month: '01',
    day: '01',
  });

  const [convertedDate, setConvertedDate] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'toNepali' | 'toEnglish'>('toNepali');

  // Generate year options
  const englishYearOptions: DropdownOption[] = Array.from({ length: 91 }, (_, i) => ({
    id: (1943 + i).toString(),
    name: (1943 + i).toString(),
  }));

  const nepaliYearOptions: DropdownOption[] = Array.from({ length: 91 }, (_, i) => ({
    id: (2000 + i).toString(),
    name: (2000 + i).toString(),
  }));

  // Generate month options
  const englishMonthOptions: DropdownOption[] = Array.from({ length: 12 }, (_, i) => {
    const monthNum = (i + 1).toString().padStart(2, '0');
    const monthNames = [
      t('months.january'),
      t('months.february'),
      t('months.march'),
      t('months.april'),
      t('months.may'),
      t('months.june'),
      t('months.july'),
      t('months.august'),
      t('months.september'),
      t('months.october'),
      t('months.november'),
      t('months.december'),
    ];
    return {
      id: monthNum,
      name: `${monthNum} - ${monthNames[i]}`,
    };
  });

  const nepaliMonthOptions: DropdownOption[] = Array.from({ length: 12 }, (_, i) => {
    const monthNum = (i + 1).toString().padStart(2, '0');
    const nepaliMonthNames = [
      t('months.baisakh'),
      t('months.jestha'),
      t('months.ashadh'),
      t('months.shrawan'),
      t('months.bhadra'),
      t('months.ashwin'),
      t('months.kartik'),
      t('months.mangsir'),
      t('months.poush'),
      t('months.magh'),
      t('months.falgun'),
      t('months.chaitra'),
    ];
    return {
      id: monthNum,
      name: `${monthNum} - ${nepaliMonthNames[i]}`,
    };
  });

  // Generate day options
  const dayOptions: DropdownOption[] = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, '0');
    return {
      id: day,
      name: day,
    };
  });

  // Conversion functions
  const convertToNepali = (): void => {
    setIsAnimating(true);
    const dateStr = `${englishDate.year}-${englishDate.month}-${englishDate.day}`;
    const date = new Date(dateStr);

    try {
      const nepaliDateObj = new NepaliDate(date);
      const result = nepaliDateObj.format('YYYY-MM-DD');

      setTimeout(() => {
        setConvertedDate(result);
        setIsAnimating(false);
      }, 800);
    } catch (error) {
      setIsAnimating(false);
      alert(t('dateRangeError', { startDate: t('englishDateRange'), endDate: t('nepaliDateRange') }));
    }
  };

  const convertToEnglish = (): void => {
    setIsAnimating(true);
    const year = parseInt(nepaliDate.year);
    const month = parseInt(nepaliDate.month);
    const day = parseInt(nepaliDate.day);

    try {
      const nDate = new NepaliDate(year, month - 1, day);
      const engDate = nDate.toJsDate();
      const result = engDate.toISOString().split('T')[0];

      setTimeout(() => {
        setConvertedDate(result);
        setIsAnimating(false);
      }, 800);
    } catch (error) {
      setIsAnimating(false);
      alert(t('dateRangeError', { startDate: t('nepaliDateRange'), endDate: t('englishDateRange') }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global styles */}
      <style jsx global>{`
        /* Remove default select appearance */
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: none;
          background-color: white;
          cursor: pointer;
        }

        /* Custom styling for the dropdown menu */
        select option {
          font-size: 16px;
          padding: 12px 16px;
          background-color: white;
          color: #1f2937;
          cursor: pointer;
          border-bottom: 1px solid #e5e7eb;
        }

        /* Hover and focus states */
        select option:hover,
        select option:focus {
          background-color: #f3f4f6 !important;
          color: #1f2937;
        }

        /* Selected option */
        select option:checked {
          background-color: #e5e7eb !important;
          color: #1f2937;
          font-weight: 500;
        }

        /* Custom dropdown container styling */
        .custom-select-container {
          position: relative;
          width: 100%;
        }

        /* Create custom arrow icon */
        .custom-select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 10;
        }

        /* Add custom scrollbar - Chrome, Safari */
        select::-webkit-scrollbar {
          width: 8px;
        }

        select::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        /* Firefox scrollbar */
        @supports (scrollbar-color: #9ca3af #f3f4f6) {
          select {
            scrollbar-color: #9ca3af #f3f4f6;
            scrollbar-width: thin;
          }
        }

        /* Special dropdown styles for different browsers */
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          /* Chrome/Safari specific styles */
          select {
            background-color: white;
          }

          select:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
          }

          select option {
            background-color: white;
            color: #1f2937;
          }
        }

        @-moz-document url-prefix() {
          /* Firefox specific styles */
          select {
            background-color: white;
            text-indent: 0;
          }

          select:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
          }

          select option {
            background-color: white;
            color: #1f2937;
          }
        }

        /* For checkmark on selected item */
        select option:checked::before {
          content: '✓';
          position: absolute;
          left: 6px;
          color: #3b82f6;
        }

        /* Additional styles for better dropdown appearance */
        select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
        }

        select:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* Style for the dropdown list */
        select option {
          padding: 8px 12px;
          margin: 2px 0;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        select option:hover {
          background-color: #f3f4f6;
          transform: translateX(2px);
        }

        select option:checked {
          background-color: #e5e7eb;
          font-weight: 500;
        }
      `}</style>

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
        <div className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg mb-6">
            <div className="mx-4 my-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold">
                {t('title')}
              </h1>
              <p className="mt-3 max-w-2xl text-white/90">
                {t('description')}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 md:p-8">
              <div className="flex mb-4">
                <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-inner">
                  <button
                    onClick={() => setActiveTab('toNepali')}
                    className={`px-4 py-2 text-sm rounded-md font-bold transition-all duration-200 ${
                      activeTab === 'toNepali'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t('toNepali')}
                  </button>
                  <button
                    onClick={() => setActiveTab('toEnglish')}
                    className={`px-4 py-2 text-sm rounded-md font-bold transition-all duration-200 ${
                      activeTab === 'toEnglish'
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t('toEnglish')}
                  </button>
                </div>
              </div>

              {convertedDate && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`mb-6 p-4 rounded-lg border shadow-md w-fit min-w-[320px] ${
                    activeTab === 'toNepali' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <h3 className="text-base">{t('convertedDate')}:</h3>
                  <p className="text-3xl font-bold">
                    {convertedDate}
                  </p>
                </motion.div>
              )}

              <div
                className={`space-y-6 ${
                  isAnimating ? 'opacity-50' : 'opacity-100'
                } transition-opacity duration-300`}
              >
                {activeTab === 'toNepali' && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-xl shadow-sm border border-blue-100">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-2">
                            {t('year')}
                          </label>
                          <CustomDropdown
                            options={englishYearOptions}
                            value={englishDate.year}
                            onChange={(value) =>
                              setEnglishDate((prev) => ({ ...prev, year: value.toString() }))
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-2">
                            {t('month')}
                          </label>
                          <CustomDropdown
                            options={englishMonthOptions}
                            value={englishDate.month}
                            onChange={(value) =>
                              setEnglishDate((prev) => ({ ...prev, month: value.toString() }))
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-800 mb-2">
                            {t('day')}
                          </label>
                          <CustomDropdown
                            options={dayOptions}
                            value={englishDate.day}
                            onChange={(value) =>
                              setEnglishDate((prev) => ({ ...prev, day: value.toString() }))
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      <button
                        onClick={convertToNepali}
                        disabled={isAnimating}
                        className={`w-full mt-8 py-4 px-4 rounded-xl font-medium transition duration-200 text-lg ${
                          isAnimating
                            ? 'bg-blue-400 text-white cursor-wait'
                            : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                        }`}
                      >
                        {isAnimating ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {t('converting')}
                          </div>
                        ) : (
                          t('convert')
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'toEnglish' && (
                  <div className="space-y-6">
                    <div className="p-6 rounded-xl shadow-sm border border-red-100">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-red-800 mb-2">
                            {t('year')}
                          </label>
                          <CustomDropdown
                            options={nepaliYearOptions}
                            value={nepaliDate.year}
                            onChange={(value) =>
                              setNepaliDate((prev) => ({ ...prev, year: value.toString() }))
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-red-800 mb-2">
                            {t('month')}
                          </label>
                          <CustomDropdown
                            options={nepaliMonthOptions}
                            value={nepaliDate.month}
                            onChange={(value) =>
                              setNepaliDate((prev) => ({ ...prev, month: value.toString() }))
                            }
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-red-800 mb-2">
                            {t('day')}
                          </label>
                          <CustomDropdown
                            options={dayOptions}
                            value={nepaliDate.day}
                            onChange={(value) =>
                              setNepaliDate((prev) => ({ ...prev, day: value.toString() }))
                            }
                            className="w-full"
                          />
                        </div>
                      </div>

                      <button
                        onClick={convertToEnglish}
                        disabled={isAnimating}
                        className={`w-full mt-8 py-4 px-4 rounded-xl font-medium transition duration-200 text-lg ${
                          isAnimating
                            ? 'bg-red-400 text-white cursor-wait'
                            : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg'
                        }`}
                      >
                        {isAnimating ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {t('converting')}
                          </div>
                        ) : (
                          t('convert')
                        )}
                      </button>
                    </div>
                  </div>
                )}
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