"use client";

import { useState, useEffect } from "react";
import NepaliDate from "nepali-date-converter";

export default function Home() {
  const [englishDate, setEnglishDate] = useState<{
    year: string;
    month: string;
    day: string;
  }>({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
    day: new Date().getDate().toString().padStart(2, "0"),
  });
  
  const [nepaliDate, setNepaliDate] = useState<{
    year: string;
    month: string;
    day: string;
  }>({
    year: "2080",
    month: "01",
    day: "01",
  });

  const [convertedDate, setConvertedDate] = useState<string>("");
  const [dayName, setDayName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"toNepali" | "toEnglish">("toNepali");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>(""); // Initialize as empty string

  // Validation constants
  const MIN_ENGLISH_DATE = new Date("1913-04-13");
  const MAX_ENGLISH_DATE = new Date("2043-04-13");

  const theme = {
    bgGradient: "bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900",
    cardBg: "bg-indigo-900/80",
    primaryBtn: "bg-pink-600 hover:bg-pink-700 text-white",
    accentColor: "text-pink-400",
    secondaryBtn: "bg-indigo-800 hover:bg-indigo-700 text-gray-200",
    resultBg: "bg-indigo-950",
  };

  // Start clock only on client side after mount
  useEffect(() => {
    setCurrentTime(formatTime(new Date())); // Set initial time after mount
    const timer = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateYearOptions = (start: number, end: number): string[] => {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const months: string[] = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const generateDayOptions = (year: number, month: number, isNepali: boolean): string[] => {
    let daysInMonth = 31;
    if (!isNepali) {
      daysInMonth = new Date(year, month, 0).getDate();
    } else {
      const nepaliMonthDays = [
        [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
      ];
      daysInMonth = month === 1 ? 31 : 32;
    }
    return Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );
  };

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getNepaliDayName = (date: Date): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  };

  const convertToNepali = () => {
    try {
      setError("");
      setIsAnimating(true);

      const dateStr = `${englishDate.year}-${englishDate.month}-${englishDate.day}`;
      const date = new Date(dateStr);

      if (date < MIN_ENGLISH_DATE || date > MAX_ENGLISH_DATE) {
        setError(
          `Please enter a date between ${MIN_ENGLISH_DATE.toISOString().split("T")[0]} and ${
            MAX_ENGLISH_DATE.toISOString().split("T")[0]
          }`
        );
        setConvertedDate("");
        setIsAnimating(false);
        return;
      }

      const nepaliDateObj = new NepaliDate(date);
      const result = nepaliDateObj.format("YYYY-MM-DD");
      const dayNameResult = getNepaliDayName(nepaliDateObj.toJsDate());

      setTimeout(() => {
        setConvertedDate(result);
        setDayName(dayNameResult);
        setIsAnimating(false);
      }, 800);
    } catch (error) {
      setError("Invalid date format. Please enter a valid date.");
      setConvertedDate("");
      setDayName("");
      setIsAnimating(false);
    }
  };

  const convertToEnglish = () => {
    try {
      setError("");
      setIsAnimating(true);

      const year = parseInt(nepaliDate.year);
      const month = parseInt(nepaliDate.month);
      const day = parseInt(nepaliDate.day);

      if (year < 1970 || year > 2100) {
        setError("Please enter a Nepali year between 1970 BS and 2100 BS");
        setConvertedDate("");
        setDayName("");
        setIsAnimating(false);
        return;
      }

      const nDate = new NepaliDate(year, month - 1, day);
      const engDate = nDate.toJsDate();

      if (year >= 2000) {
        engDate.setDate(engDate.getDate() + 1);
      }

      const result = engDate.toISOString().split("T")[0];
      const dayNameResult = getDayName(engDate);

      setTimeout(() => {
        setConvertedDate(result);
        setDayName(dayNameResult);
        setIsAnimating(false);
      }, 800);
    } catch (error) {
      setError("Invalid date. Please check if the date actually exists in the Nepali calendar.");
      setConvertedDate("");
      setDayName("");
      setIsAnimating(false);
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <main className={`min-h-screen ${theme.bgGradient} p-4 md:p-8 text-white`}>
      <div className="max-w-5xl mx-auto">
        <div className={`${theme.cardBg} p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/10`}>
          <div className="grid grid-cols-2 gap-2 mb-8 relative">
            <button
              className={`p-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                activeTab === "toNepali" ? theme.primaryBtn : theme.secondaryBtn
              }`}
              onClick={() => setActiveTab("toNepali")}
            >
              English to Nepali
            </button>
            <button
              className={`p-3 text-lg font-medium rounded-lg transition-all duration-300 ${
                activeTab === "toEnglish" ? theme.primaryBtn : theme.secondaryBtn
              }`}
              onClick={() => setActiveTab("toEnglish")}
            >
              Nepali to English
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/70 text-white rounded-lg animate-pulse">
              {error}
            </div>
          )}

          {activeTab === "toNepali" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm mb-2 block">Year</label>
                  <select
                    className="w-full p-3 border border-white/20 rounded-lg bg-black/20 text-white"
                    value={englishDate.year}
                    onChange={(e) =>
                      setEnglishDate((prev) => ({ ...prev, year: e.target.value }))
                    }
                  >
                    {generateYearOptions(1913, 2043).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-2 block">Month</label>
                  <select
                    className="w-full p-3 border border-white/20 rounded-lg bg-black/20 text-white"
                    value={englishDate.month}
                    onChange={(e) =>
                      setEnglishDate((prev) => ({ ...prev, month: e.target.value }))
                    }
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {new Date(2000, parseInt(month) - 1).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-2 block">Day</label>
                  <select
                    className="w-full p-3 border border-white/20 rounded-lg bg-black/20 text-white"
                    value={englishDate.day}
                    onChange={(e) =>
                      setEnglishDate((prev) => ({ ...prev, day: e.target.value }))
                    }
                  >
                    {generateDayOptions(
                      parseInt(englishDate.year),
                      parseInt(englishDate.month),
                      false
                    ).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={convertToNepali}
                disabled={isAnimating}
                className={`w-full p-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01] ${
                  theme.primaryBtn
                } ${isAnimating ? "opacity-70" : ""} flex items-center justify-center`}
              >
                {isAnimating ? (
                  <>
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
                    Converting...
                  </>
                ) : (
                  "Convert to Nepali Date"
                )}
              </button>
            </div>
          )}

          {activeTab === "toEnglish" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm mb-2 block">Year</label>
                  <select
                    className="w-full p-3 border border-white/20 rounded-lg bg-black/20 text-white"
                    value={nepaliDate.year}
                    onChange={(e) =>
                      setNepaliDate((prev) => ({ ...prev, year: e.target.value }))
                    }
                  >
                    {generateYearOptions(1970, 2100).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-2 block">Month</label>
                  <select
                    className="w-full p-3 border border-white/20 rounded-lg bg-black/20 text-white"
                    value={nepaliDate.month}
                    onChange={(e) =>
                      setNepaliDate((prev) => ({ ...prev, month: e.target.value }))
                    }
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {[
                          "Baisakh",
                          "Jestha",
                          "Ashadh",
                          "Shrawan",
                          "Bhadra",
                          "Ashwin",
                          "Kartik",
                          "Mangsir",
                          "Poush",
                          "Magh",
                          "Falgun",
                          "Chaitra",
                        ][parseInt(month) - 1]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm mb-2 block">Day</label>
                  <select
                    className="w-full p-3 border border-white/20 rounded-lg bg-black/20 text-white"
                    value={nepaliDate.day}
                    onChange={(e) =>
                      setNepaliDate((prev) => ({ ...prev, day: e.target.value }))
                    }
                  >
                    {generateDayOptions(
                      parseInt(nepaliDate.year),
                      parseInt(nepaliDate.month),
                      true
                    ).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={convertToEnglish}
                disabled={isAnimating}
                className={`w-full p-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.01] ${
                  theme.primaryBtn
                } ${isAnimating ? "opacity-70" : ""} flex items-center justify-center`}
              >
                {isAnimating ? (
                  <>
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
                    Converting...
                  </>
                ) : (
                  "Convert to English Date"
                )}
              </button>
            </div>
          )}

          {convertedDate && (
            <div className="flex">
            <div
              className={`mt-8 p-6 ${theme.resultBg} rounded-lg border border-white/10 transition-all duration-500 animate-fadeIn`}
            >
              <h3 className="text-xl font-semibold mb-2">Converted Date:</h3>
              <div className="flex items-center">
                <p className={`text-4xl font-bold ${theme.accentColor}`}>
                  {convertedDate}
                </p>
                <span className="ml-4 px-3 py-1 bg-white/10 rounded-full text-sm">
                  {dayName}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Current date in other calendar:</p>
                  <p className="text-lg">
                    {activeTab === "toNepali"
                      ? `${englishDate.year}-${englishDate.month}-${englishDate.day}`
                      : `${nepaliDate.year}-${nepaliDate.month}-${nepaliDate.day}`}
                  </p>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-white/60 text-sm">
          <p>Calendar System Information</p>
          <div className="grid grid-cols-2 gap-4 mt-4 text-left max-w-2xl mx-auto">
            <div>
              <h4 className="font-semibold mb-2">English (Gregorian) Calendar</h4>
              <p>The international standard calendar used globally</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Nepali (Bikram Sambat) Calendar</h4>
              <p>Official calendar of Nepal, approximately 56-57 years ahead of Gregorian</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}