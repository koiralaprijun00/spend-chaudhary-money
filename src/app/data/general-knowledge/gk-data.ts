// src/app/data/nepal-gk/gk-data.ts
export interface GKQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  fact: string;
  image: string;
  category: string;
  hint?: string; // Optional hint
}

export const gkQuestions: GKQuestion[] = [
  {
    id: 'geography-1',
    question: 'What is the highest lake in Nepal?',
    options: ['Tilicho Lake', 'Phewa Lake', 'Rara Lake', 'Gosaikunda'],
    correctAnswer: 'Tilicho Lake',
    fact: 'Tilicho Lake is located at an altitude of 4,919 meters in the Annapurna range and is the highest lake in Nepal. It\'s often called the highest lake of its size in the world.',
    image: '/images/gk/tilicho-lake.jpg',
    category: 'Geography',
    hint: 'This lake is located in the Annapurna region at an altitude of nearly 5,000 meters.'
  },
  {
    id: 'history-1',
    question: 'In which year was the Sugauli Treaty signed between Nepal and British India?',
    options: ['1814', '1815', '1816', '1818'],
    correctAnswer: '1816',
    fact: 'The Sugauli Treaty was signed on March 4, 1816, following the Anglo-Nepalese War (1814-1816). This treaty reduced Nepal\'s territory significantly, establishing most of Nepal\'s current borders.',
    image: '/images/gk/sugauli-treaty.jpg',
    category: 'History',
    hint: 'This treaty was signed after the Anglo-Nepalese War.'
  },
  {
    id: 'politics-1',
    question: 'How many provinces are there in Nepal according to the 2015 constitution?',
    options: ['5', '7', '8', '10'],
    correctAnswer: '7',
    fact: 'The 2015 Constitution of Nepal divided the country into 7 provinces, replacing the previous structure of 14 administrative zones. The provinces were initially numbered but later named.',
    image: '/images/gk/nepal-provinces.jpg',
    category: 'Politics',
    hint: 'This number is less than the previous 14 administrative zones.'
  },
  {
    id: 'culture-1',
    question: 'Which ethnic group celebrates Udhauli-Ubhauli festivals?',
    options: ['Newars', 'Kirati', 'Tharu', 'Sherpa'],
    correctAnswer: 'Kirati',
    fact: 'Udhauli and Ubhauli are important agricultural festivals of the Kirati people (including Rai, Limbu, Sunuwar, and Yakkha communities). Udhauli marks the descent to lower altitudes in winter, while Ubhauli celebrates the ascent to higher regions in summer.',
    image: '/images/gk/kirati-festival.jpg',
    category: 'Culture',
    hint: 'This ethnic group includes Rai, Limbu, Sunuwar, and Yakkha communities.'
  },
  {
    id: 'sports-1',
    question: 'Who was the first Nepali cricketer to score a century in an international match?',
    options: ['Paras Khadka', 'Gyanendra Malla', 'Sharad Vesawkar', 'Dipendra Singh Airee'],
    correctAnswer: 'Paras Khadka',
    fact: 'Paras Khadka became the first Nepali cricketer to score a century in an international match during a One Day International against the United Arab Emirates in 2019.',
    image: '/images/gk/paras-khadka.jpg',
    category: 'Sports',
    hint: 'This player was the captain of Nepal\'s national cricket team for many years.'
  },
  {
    id: 'science-1',
    question: 'Which Nepali scientist received the Rolex Award for Enterprise?',
    options: ['Dr. Sanduk Ruit', 'Dr. Mahabir Pun', 'Dr. Pramod Joshi', 'Dr. Upendra Mahato'],
    correctAnswer: 'Dr. Mahabir Pun',
    fact: 'Dr. Mahabir Pun received the prestigious Rolex Award for Enterprise in 2007 for his pioneering work in connecting remote Himalayan villages to the internet and creating wireless technology solutions for rural Nepal.',
    image: '/images/gk/mahabir-pun.jpg',
    category: 'Science & Technology',
    hint: 'This person is known for bringing wireless internet technology to remote villages in Nepal.'
  },
  {
    id: 'literature-1',
    question: 'Who wrote the famous Nepali epic poem "Muna Madan"?',
    options: ['Laxmi Prasad Devkota', 'Bhanubhakta Acharya', 'Balkrishna Sama', 'Madhav Prasad Ghimire'],
    correctAnswer: 'Laxmi Prasad Devkota',
    fact: '"Muna Madan" is one of the most popular Nepali poems, written by Laxmi Prasad Devkota, who is known as the "Mahakavi" (Great Poet) in Nepali literature. This epic tells the tragic love story of Muna and Madan.',
    image: '/images/gk/laxmi-prasad-devkota.jpg',
    category: 'Literature',
    hint: 'This poet is known as "Mahakavi" (Great Poet) in Nepali literature.'
  },
  {
    id: 'international-1',
    question: 'How many countries share a border with Nepal?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    fact: 'Nepal shares its borders with only two countries: India to the east, south, and west, and China (Tibet Autonomous Region) to the north.',
    image: '/images/gk/nepal-borders.jpg',
    category: 'International Relations',
    hint: 'These countries are the two most populous nations in the world.'
  },
  {
    id: 'economy-1',
    question: 'Which is the main export crop of Nepal?',
    options: ['Tea', 'Rice', 'Coffee', 'Cardamom'],
    correctAnswer: 'Cardamom',
    fact: 'Large cardamom (Amomum subulatum) is one of Nepal\'s most valuable export crops by value. Nepal is the world\'s largest producer of large cardamom, primarily growing in the eastern hills.',
    image: '/images/gk/cardamom.jpg',
    category: 'Economy',
    hint: 'This spice is known as the "black gold" and is primarily grown in eastern Nepal.'
  },
  {
    id: 'entertainment-1',
    question: 'Which was the first feature film produced in Nepal?',
    options: ['Maitighar', 'Aama', 'Parivartan', 'Manko Bandh'],
    correctAnswer: 'Aama',
    fact: '"Aama" (Mother), released in 1964, is considered the first feature-length Nepali film. It was directed by Hira Singh Khatri and produced by the government to promote national unity and Nepali culture.',
    image: '/images/gk/aama-film.jpg',
    category: 'Entertainment',
    hint: 'The title of this film refers to a family member who holds great importance in Nepali culture.'
  }
];

// Add translations for UI elements
export const translations = {
  en: {
    quizTitle: 'Nepal General Knowledge Quiz',
    quizDescription: 'Test your knowledge about Nepal with this quiz!',
    nextQuestion: 'Next Question',
    correctAnswer: 'Correct Answer',
    didYouKnow: 'Did you know?',
    totalScore: 'Total Score',
    quizComplete: 'Quiz Complete!',
    finalScoreMessage: 'You\'ve completed the quiz! Your final score is {score} out of {total}.',
    playAgain: 'Play Again',
    shareScore: 'Share Score',
    hint: 'Hint'
  },
  ne: {
    quizTitle: 'नेपाल सामान्य ज्ञान क्विज',
    quizDescription: 'यो क्विजका साथ नेपालको बारेमा आफ्नो ज्ञान परीक्षण गर्नुहोस्!',
    nextQuestion: 'अर्को प्रश्न',
    correctAnswer: 'सही उत्तर',
    didYouKnow: 'के तपाईंलाई थाहा थियो?',
    totalScore: 'कुल स्कोर',
    quizComplete: 'क्विज पूरा भयो!',
    finalScoreMessage: 'तपाईंले क्विज पूरा गर्नुभयो! तपाईंको अन्तिम स्कोर {total} मध्ये {score} हो।',
    playAgain: 'फेरि खेल्नुहोस्',
    shareScore: 'स्कोर शेयर गर्नुहोस्',
    hint: 'संकेत'
  }
};