"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import QuizSection from "../nepal-gk-components/QuizSection";
import { getQuestionsByLocale } from "../../data/general-knowledge/getQuestions";
import AdSenseGoogle from "../../components/AdSenseGoogle";
import GameButton from "../../components/ui/GameButton";
import CustomDropdown from "../../components/ui/CustomDropdown";

function createSafeT(t: ReturnType<typeof useTranslations>) {
  return (key: string, defaultValue = "", params = {}) => {
    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return defaultValue;
    }
  };
}


export default function NepalGKQuiz() {
  const t = useTranslations("Translations");
  const safeT = useMemo(() => createSafeT(t), [t]);
  const locale = useLocale();

  // Load questions based on locale
  const gkQuestions = getQuestionsByLocale(locale);

  // Game state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Add category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get all available categories with normalized names
  const categories = useMemo(() => {
    const normalizeCategory = (category: string): string => {
      if (category.includes("&")) {
        const parts = category.split("&").map(part => part.trim());
        return parts.sort().join(" & ");
      }
      return category.trim();
    };
  
    const categoryCountMap: Record<string, { originalNames: string[], count: number }> = {};
  
    gkQuestions.forEach((q) => {
      const normalizedName = normalizeCategory(q.category);
      if (!categoryCountMap[normalizedName]) {
        categoryCountMap[normalizedName] = {
          originalNames: [q.category],
          count: 0
        };
      } else if (!categoryCountMap[normalizedName].originalNames.includes(q.category)) {
        categoryCountMap[normalizedName].originalNames.push(q.category);
      }
      categoryCountMap[normalizedName].count++;
    });
  
    const uniqueCategories = [{
      id: "all",
      name: safeT("nepalGk.allCategories", "All Categories"),
      originalNames: ["all"]
    }];
  
    Object.entries(categoryCountMap)
      .sort((a, b) => b[1].count - a[1].count) // 🔥 sort by count (descending)
      .forEach(([normalizedName, { originalNames, count }]) => {
        uniqueCategories.push({
          id: normalizedName,
          name: `${normalizedName} (${count})`,
          originalNames
        });
      });
  
    return uniqueCategories;
  }, [gkQuestions, safeT]);
  

  // Filter questions by selected category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === "all") {
      return gkQuestions;
    }
    
    // Find the selected category in our normalized list
    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
    
    if (!selectedCategoryObj) {
      return [];
    }
    
    // Filter questions that match any of the original category names
    return gkQuestions.filter((q) => 
      selectedCategoryObj.originalNames.includes(q.category)
    );
  }, [selectedCategory, gkQuestions, categories]);

  // Shuffle questions at the start
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof gkQuestions>([]);

  // Initialize with unshuffled questions, then shuffle on client
  useEffect(() => {
    setIsMounted(true);
    setShuffledQuestions([...filteredQuestions].sort(() => Math.random() - 0.5));
  }, [filteredQuestions]);

  // When category changes, reset game state
  useEffect(() => {
    setIsMounted(true);
  
    // Reset everything and shuffle only once when category changes
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback("");
    setScore(0);
  }, [filteredQuestions]);
  

  // Current question
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Handle user's guess
  const handleGuess = (selectedOption: string) => {
    if (isAnswered) return;

    const isGuessCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isGuessCorrect) {
      setScore((prevScore) => prevScore + 10);
      setFeedback(`+10 ${t("points") || "points"}`);
      setIsCorrect(true);
    } else {
      setFeedback(t("incorrect") || "Incorrect");
      setIsCorrect(false);
    }

    setIsAnswered(true);
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setFeedback("");
    }
  };

  // Restart the game
  const restartGame = () => {
    setShuffledQuestions([...filteredQuestions].sort(() => Math.random() - 0.5));
    setCurrentQuestionIndex(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback("");
    setScore(0);
  };

  // Handle category change
  const handleCategoryChange = (category: string | number) => {
      if (typeof category === "string") {
          setSelectedCategory(category);
      }
  };

  // Share score
  const handleShareScore = async () => {
    const categoryText = selectedCategory === "all" ? "" : ` (${selectedCategory} category)`;
    const shareMessage = t("nepalGk.shareMessage", {
      score,
      category: categoryText,
      url: "https://piromomo.com/nepal-gk",
    });

    try {
      if (navigator.share && navigator.canShare({ text: shareMessage })) {
        await navigator.share({
          title: t("nepalGk.shareScore"),
          text: shareMessage,
          url: "https://piromomo.com/nepal-gk",
        });
      } else {
        await navigator.clipboard.writeText(shareMessage);
        alert(t("nepalGk.clipboardMessage"));
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      await navigator.clipboard.writeText(shareMessage);
      alert(t("nepalGk.clipboardMessage"));
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-center">
        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] ml-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle
              adSlot="6865219846"
              adFormat="vertical"
              style={{ width: "160px", height: "400px" }}
            />
          </div>
        </div>

        <div className="flex-1 px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 max-w-5xl mx-auto px-2">
            <div className="hidden md:block md:w-1/3 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-left bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-2">
                    {safeT("nepalGk.title", "Nepal GK Quiz")}
                  </h1>
                  <p className="text-left text-gray-600">
                    {safeT("nepalGk.description", "Test your knowledge about Nepal!")}
                  </p>
                </div>

                <div className="mb-4 flex justify-center">
  <CustomDropdown
    options={categories}
    value={selectedCategory}
    onChange={handleCategoryChange}
    className="w-full max-w-xs"
  />
</div>

                <div>
                  <h2 className="text-sm mb-3">{safeT("nepalGk.score", "Score")}</h2>
                  <div className="bg-gradient-to-r from-blue-600 to-red-500 p-0.5 rounded-lg">
                    <div className="bg-white rounded-md p-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-3xl font-bold">{score}</span>
                        <span className="ml-2 text-gray-600">{t("points")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <GameButton onClick={restartGame} type="neutral" size="sm" fullWidth>
                    {safeT("nepalGk.restart", "Restart Quiz")}
                  </GameButton>

                  {score > 0 && (
                    <GameButton onClick={handleShareScore} type="success" size="sm" fullWidth>
                      {safeT("nepalGk.shareScore", "Share Score")}
                    </GameButton>
                  )}
                </div>
              </div>
            </div>

            <div className="md:w-2/3 w-full">
              <div className="bg-gradient-to-br from-blue-600 to-red-500 p-1 rounded-xl shadow-lg">
              <div className="bg-white rounded-lg p-3 md:p-6">
                  <div className="md:hidden mb-6">
                  <h1 className="text-xl md:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-500 mb-2">
                      {safeT("nepalGk.title", "Nepal GK Quiz")}
                    </h1>

                    <div className="mb-6">
  <h2 className="text-sm mb-2">{safeT("nepalGk.categories", "Categories")}</h2>
  <CustomDropdown
    options={categories}
    value={selectedCategory}
    onChange={handleCategoryChange}
    className="w-full"
  />
</div>

<div className="flex flex-col xs:flex-row justify-between items-center gap-2 mb-4">
                      <div className="bg-gray-100 px-3 py-1.5 rounded-lg">
                        <span className="font-bold">
                          {safeT("nepalGk.score", "Score")}: {score}
                        </span>
                      </div>

                      {score > 0 && (
                        <GameButton onClick={handleShareScore} type="neutral" size="sm">
                          {safeT("nepalGk.shareScore", "Share Score")}
                        </GameButton>
                      )}
                    </div>
                  </div>

                  {(shuffledQuestions.length === 0 && isMounted) ? (
                    <div className="text-center py-8">
                      <p className="text-lg text-gray-600">
                        {safeT("nepalGk.noQuestionsInCategory", "No questions available in this category.")}
                      </p>
                      <GameButton
                        onClick={() => setSelectedCategory("all")}
                        type="primary"
                        className="mt-4"
                      >
                        {safeT("nepalGk.viewAllCategories", "View All Categories")}
                      </GameButton>
                    </div>
                  ) : currentQuestion ? (
                    <>
                      <QuizSection
                        currentQuestion={currentQuestion}
                        isAnswered={isAnswered}
                        handleGuess={handleGuess}
                        handleNextQuestion={handleNextQuestion}
                        totalQuestions={shuffledQuestions.length}
                        currentIndex={currentQuestionIndex}
                        isLastQuestion={currentQuestionIndex === shuffledQuestions.length - 1}
                        feedback={feedback}
                        isCorrect={isCorrect}
                      />
                      
                      {/* Show final screen only on the last question after it's answered */}
                      {isAnswered && currentQuestionIndex === shuffledQuestions.length - 1 && (
                        <div className="mt-8 text-center p-6 bg-blue-50 rounded-lg">
                          <h3 className="text-xl font-bold text-blue-800 mb-4">
                            🎉 {safeT("nepalGk.quizComplete", "Quiz Complete!")}
                          </h3>
                          <p className="mb-4">
                            {safeT(
                              "nepalGk.finalScoreMessage", 
                              `Your final score is ${score} out of ${shuffledQuestions.length * 10}.`,
                              { score, total: shuffledQuestions.length * 10 }
                            )}
                          </p>
                          <div className="flex justify-center gap-4 mt-6">
                            <GameButton onClick={handleShareScore} type="primary" size="sm">
                              {safeT("nepalGk.shareScore", "Share Score")}
                            </GameButton>
                            <GameButton onClick={restartGame} type="success" size="sm">
                              {safeT("nepalGk.playAgain", "Play Again")}
                            </GameButton>
                          </div>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] mr-4">
          <div className="w-[160px] h-[600px]">
            <AdSenseGoogle
              adSlot="9978468343"
              adFormat="vertical"
              style={{ width: "160px", height: "400px" }}
            />
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-10">
        <div className="flex justify-between items-center">
        <GameButton onClick={restartGame} type="neutral" size="sm" className="py-1 px-2 text-xs">
            {safeT("nepalGk.restart", "Restart Quiz")}
          </GameButton>

          {score > 0 && (
            <GameButton onClick={handleShareScore} type="success" size="sm" className="py-1 text-xs">
              {safeT("nepalGk.shareScore", "Share Score")}
            </GameButton>
          )}
        </div>
      </div>
    </div>
  );
}