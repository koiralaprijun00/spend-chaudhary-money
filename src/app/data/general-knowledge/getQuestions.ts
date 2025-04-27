import { questionsEn } from "./data-gk.en";
import { questionsNp } from "./data-gk.np";
import { Question } from "./question";

export const getQuestionsByLocale = (locale: string): Question[] => {
  // Get all questions for the locale
  const allQuestions = locale === "np" ? questionsNp : questionsEn;
  
  // Create a copy of the array and shuffle it
  const shuffledQuestions = [...allQuestions];
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
  }
  
  // Return only the first 8 questions
  return shuffledQuestions.slice(0, 8);
};