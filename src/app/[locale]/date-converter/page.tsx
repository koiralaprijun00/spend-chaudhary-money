"use client";

import { useState, useEffect } from "react";
import NepaliDate from "nepali-date-converter";
import AdSenseGoogle from '../../components/AdSenseGoogle';

export default function Home() {
  const [englishDate, setEnglishDate] = useState({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
    day: new Date().getDate().toString().padStart(2, "0"),
  });

  const [nepaliDate, setNepaliDate] = useState({
    year: "2080",
    month: "01",
    day: "01",
  });

  const [convertedDate, setConvertedDate] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<"toNepali" | "toEnglish">("toNepali");

  // Theme and style constants
  const theme = {
    bgGradient: "bg-white", // Updated to white background
    cardBg: "bg-[#f5f5f5]/90", // Lighter card background for better contrast
    primaryBtn: "bg-[#ff5f5f] hover:bg-[#ff4646]",
    secondaryBtn: "bg-[#333333] hover:bg-[#555555]",
    accentColor: "text-[#ff5f5f]",
    resultBg: "bg-[#f5f5f5]", // Updated background for result container
  };

  // Helper Functions
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const convertToNepali = () => {
    setIsAnimating(true);
    const dateStr = `${englishDate.year}-${englishDate.month}-${englishDate.day}`;
    const date = new Date(dateStr);
    const nepaliDateObj = new NepaliDate(date);
    const result = nepaliDateObj.format("YYYY-MM-DD");

    setTimeout(() => {
      setConvertedDate(result);
      setIsAnimating(false);
    }, 800);
  };

  const convertToEnglish = () => {
    setIsAnimating(true);
    const year = parseInt(nepaliDate.year);
    const month = parseInt(nepaliDate.month);
    const day = parseInt(nepaliDate.day);

    const nDate = new NepaliDate(year, month - 1, day);
    const engDate = nDate.toJsDate();
    const result = engDate.toISOString().split("T")[0];

    setTimeout(() => {
      setConvertedDate(result);
      setIsAnimating(false);
    }, 800);
  };

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
        <div className="flex-1 max-w-4xl mx-auto px-4 py-8">
          <main className={`min-h-screen ${theme.bgGradient} p-8 text-black`}>
            <div className="max-w-4xl mx-auto">
              <div className="relative flex flex-col items-center justify-center text-center space-y-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-black to-[#ff5f5f]">
                  Piromomo Nepali Date Converter - Not Rajan's
                </h1>

                <div className="space-y-4 text-lg">
                  <p className="text-black/80">
                    Effortlessly convert between Nepali (Bikram Sambat) and English (Gregorian) calendars.
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    className={`py-2 px-6 text-xl font-semibold rounded-xl transition-all duration-300 transform ${
                      activeTab === "toNepali"
                        ? "bg-gradient-to-r from-[#ff5f5f] to-[#ff4646] text-white shadow-lg scale-105 border-2 border-[#ff5f5f]"
                        : "bg-[#f0f0f0] text-gray-400 shadow-md scale-95 hover:scale-105 hover:shadow-lg"
                    }`}
                    onClick={() => setActiveTab("toNepali")}
                  >
                    English to Nepali
                  </button>
                  <button
                    className={`py-2 px-6 text-xl font-semibold rounded-xl transition-all duration-300 transform ${
                      activeTab === "toEnglish"
                        ? "bg-gradient-to-r from-[#ff5f5f] to-[#ff4646] text-white shadow-lg scale-105 border-2 border-[#ff5f5f]"
                        : "bg-[#f0f0f0] text-gray-400 shadow-md scale-95 hover:scale-105 hover:shadow-lg"
                    }`}
                    onClick={() => setActiveTab("toEnglish")}
                  >
                    Nepali to English
                  </button>
                </div>

                <div
                  className={`space-y-6 mt-6 ${theme.cardBg} p-8 rounded-lg shadow-xl transition-all duration-500 ease-in-out transform ${
                    isAnimating ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {activeTab === "toNepali" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm mb-2">Year</label>
                          <input
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#ffffff] text-black"
                            value={englishDate.year}
                            onChange={(e) =>
                              setEnglishDate((prev) => ({ ...prev, year: e.target.value }))
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Month</label>
                          <input
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#ffffff] text-black"
                            value={englishDate.month}
                            onChange={(e) =>
                              setEnglishDate((prev) => ({ ...prev, month: e.target.value }))
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Day</label>
                          <input
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#ffffff] text-black"
                            value={englishDate.day}
                            onChange={(e) =>
                              setEnglishDate((prev) => ({ ...prev, day: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                      <button
                        className={`w-full p-4 mt-4 rounded-xl font-medium ${theme.primaryBtn} transform transition-transform duration-300 ${
                          isAnimating ? "opacity-70" : ""
                        }`}
                        onClick={convertToNepali}
                        disabled={isAnimating}
                      >
                        {isAnimating ? "Converting..." : "Convert to Nepali"}
                      </button>
                    </div>
                  )}

                  {activeTab === "toEnglish" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm mb-2">Year</label>
                          <input
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#ffffff] text-black"
                            value={nepaliDate.year}
                            onChange={(e) =>
                              setNepaliDate((prev) => ({ ...prev, year: e.target.value }))
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Month</label>
                          <input
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#ffffff] text-black"
                            value={nepaliDate.month}
                            onChange={(e) =>
                              setNepaliDate((prev) => ({ ...prev, month: e.target.value }))
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Day</label>
                          <input
                            type="number"
                            className="w-full p-3 rounded-lg bg-[#ffffff] text-black"
                            value={nepaliDate.day}
                            onChange={(e) =>
                              setNepaliDate((prev) => ({ ...prev, day: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                      <button
                        className={`w-full p-4 mt-4 rounded-xl font-medium ${theme.primaryBtn} transform transition-transform duration-300 ${
                          isAnimating ? "opacity-70" : ""
                        }`}
                        onClick={convertToEnglish}
                        disabled={isAnimating}
                      >
                        {isAnimating ? "Converting..." : "Convert to English"}
                      </button>
                    </div>
                  )}

                  {convertedDate && (
                    <div className="mt-8 p-6 rounded-lg border border-white/10 bg-[#f5f5f5] text-center">
                      <h3 className="text-xl font-semibold mb-2">Converted Date:</h3>
                      <p className="text-3xl font-bold text-[#ff5f5f]">{convertedDate}</p>
                      <p className="mt-2 text-sm text-black/60">
                        {activeTab === "toNepali" ? "Nepali Date" : "English Date"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
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
