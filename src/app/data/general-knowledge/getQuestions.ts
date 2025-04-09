import { questionsEn } from "./data-gk.en";
import { questionsNp } from "./data-gk.np";
import { Question } from "./question";

export const getQuestionsByLocale = (locale: string): Question[] => {
  switch (locale) {
    case "np":
      return questionsNp;
    case "en":
    default:
      return questionsEn;
  }
};