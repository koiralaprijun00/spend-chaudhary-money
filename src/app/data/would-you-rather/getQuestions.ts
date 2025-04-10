// src/app/data/would-you-rather/getQuestions.ts

export interface WouldYouRatherQuestion {
  id: string;
  optionA: string;
  optionB: string;
  optionAVotes: number;
  optionBVotes: number;
}

// Sample English questions
const englishQuestions: WouldYouRatherQuestion[] = [
  // Food Category
  {
    id: 'food-1',
    optionA: 'eat momo every day for a year',
    optionB: 'never eat momo again',
    optionAVotes: 865,
    optionBVotes: 135
  },
  {
    id: 'food-2',
    optionA: 'only eat Newari cuisine for the rest of your life',
    optionB: 'only eat Thakali cuisine for the rest of your life',
    optionAVotes: 423,
    optionBVotes: 577
  },
  {
    id: 'food-3',
    optionA: 'give up sel roti forever',
    optionB: 'give up aloo tama forever',
    optionAVotes: 320,
    optionBVotes: 680
  },
  {
    id: 'food-4',
    optionA: 'drink chiya without sugar for life',
    optionB: 'drink chiya without milk for life',
    optionAVotes: 289,
    optionBVotes: 711
  },
  {
    id: 'food-5',
    optionA: 'eat only buff momo',
    optionB: 'eat only veg momo',
    optionAVotes: 521,
    optionBVotes: 479
  },
  
  // Travel Category
  {
    id: 'travel-1',
    optionA: 'climb to Everest Base Camp',
    optionB: 'raft all of the Karnali River',
    optionAVotes: 723,
    optionBVotes: 277
  },
  {
    id: 'travel-2',
    optionA: 'be stuck in Kathmandu traffic for 3 hours',
    optionB: 'walk up 1,000 steps to a hilltop temple',
    optionAVotes: 245,
    optionBVotes: 755
  },
  {
    id: 'travel-3',
    optionA: 'live in Pokhara with no electricity',
    optionB: 'live in Kathmandu with no internet',
    optionAVotes: 657,
    optionBVotes: 343
  },
  {
    id: 'travel-4',
    optionA: 'trek the entire Annapurna Circuit in monsoon season',
    optionB: 'spend a month in Dolpa during winter',
    optionAVotes: 421,
    optionBVotes: 579
  },
  {
    id: 'travel-5',
    optionA: 'drive a scooter through Thamel during peak tourist season',
    optionB: 'take a crowded local bus from Kathmandu to Pokhara during Dashain',
    optionAVotes: 513,
    optionBVotes: 487
  },
  
  // Culture Category
  {
    id: 'culture-1',
    optionA: 'experience Holi in Kathmandu',
    optionB: 'experience Dashain in your ancestral village',
    optionAVotes: 325,
    optionBVotes: 675
  },
  {
    id: 'culture-2',
    optionA: 'have tea with a living Buddha',
    optionB: 'have a conversation with Prithvi Narayan Shah',
    optionAVotes: 583,
    optionBVotes: 417
  },
  {
    id: 'culture-3',
    optionA: 'attend Indra Jatra every year',
    optionB: 'attend Bisket Jatra every year',
    optionAVotes: 558,
    optionBVotes: 442
  },
  {
    id: 'culture-4',
    optionA: 'be an incredible classical Nepali dancer',
    optionB: 'be an exceptional traditional Nepali musician',
    optionAVotes: 372,
    optionBVotes: 628
  },
  {
    id: 'culture-5',
    optionA: 'receive tika from 100 relatives during Dashain',
    optionB: 'give tika to 100 relatives during Dashain',
    optionAVotes: 462,
    optionBVotes: 538
  },
  
  // Daily Life Category
  {
    id: 'daily-1',
    optionA: 'live without electricity for a month',
    optionB: 'live without water for a day',
    optionAVotes: 699,
    optionBVotes: 301
  },
  {
    id: 'daily-2',
    optionA: 'speak only Nepali for the rest of your life',
    optionB: 'speak any language but Nepali for the rest of your life',
    optionAVotes: 532,
    optionBVotes: 468
  },
  {
    id: 'daily-3',
    optionA: 'be caught in a sudden monsoon rain without an umbrella',
    optionB: 'be caught in Kathmandu dust storm without a mask',
    optionAVotes: 843,
    optionBVotes: 157
  },
  {
    id: 'daily-4',
    optionA: 'never have to deal with load shedding again',
    optionB: 'never have to deal with water shortages again',
    optionAVotes: 347,
    optionBVotes: 653
  },
  {
    id: 'daily-5',
    optionA: 'work in Thamel shops during peak tourist season',
    optionB: 'work as a porter on the Everest Base Camp trek',
    optionAVotes: 621,
    optionBVotes: 379
  },
  
  // History Category
  {
    id: 'history-1',
    optionA: 'witness the unification of Nepal by Prithvi Narayan Shah',
    optionB: 'witness the signing of the 2015 Constitution',
    optionAVotes: 765,
    optionBVotes: 235
  },
  {
    id: 'history-2',
    optionA: 'be present during the construction of Pashupatinath Temple',
    optionB: 'be present during the construction of Swayambhunath Stupa',
    optionAVotes: 477,
    optionBVotes: 523
  },
  {
    id: 'history-3',
    optionA: 'meet Araniko and learn about his architectural genius',
    optionB: 'meet Bhrikuti and learn about her influence in Tibet',
    optionAVotes: 413,
    optionBVotes: 587
  },
  {
    id: 'history-4',
    optionA: 'live during the Malla period',
    optionB: 'live during the early Shah period',
    optionAVotes: 614,
    optionBVotes: 386
  },
  {
    id: 'history-5',
    optionA: 'be a royal courtier in medieval Nepal',
    optionB: 'be a Buddhist monk in ancient Nepal',
    optionAVotes: 398,
    optionBVotes: 602
  },
  
  // Hypothetical Category
  {
    id: 'hypothetical-1',
    optionA: 'have the ability to speak every Nepali language and dialect',
    optionB: 'be able to cook every Nepali dish perfectly',
    optionAVotes: 497,
    optionBVotes: 503
  },
  {
    id: 'hypothetical-2',
    optionA: 'add one more public holiday to the Nepali calendar',
    optionB: 'remove one existing public holiday from the Nepali calendar',
    optionAVotes: 887,
    optionBVotes: 113
  },
  {
    id: 'hypothetical-3',
    optionA: 'have an endless supply of momo',
    optionB: 'have an endless supply of dal bhat',
    optionAVotes: 634,
    optionBVotes: 366
  },
  {
    id: 'hypothetical-4',
    optionA: 'own a luxury penthouse in Kathmandu',
    optionB: 'own a traditional house with land in a scenic village',
    optionAVotes: 225,
    optionBVotes: 775
  },
  {
    id: 'hypothetical-5',
    optionA: 'be a famous Nepali actor/actress',
    optionB: 'be a respected Nepali politician',
    optionAVotes: 643,
    optionBVotes: 357
  }
];

/**
 * Gets questions based on the locale
 * @param locale - The current locale (en or np)
 * @returns Array of questions in the appropriate language
 */
export function getQuestionsByLocale(locale: string): WouldYouRatherQuestion[] {
  return locale === 'np' ? nepaliQuestions : englishQuestions;
}

// Nepali translations of the questions (for Nepali language users)
const nepaliQuestions: WouldYouRatherQuestion[] = [
  // Food Category
  {
    id: 'food-1',
    optionA: 'एक वर्षसम्म हरेक दिन मोमो खाने',
    optionB: 'फेरि कहिल्यै मोमो नखाने',
    optionAVotes: 865,
    optionBVotes: 135
  },
  {
    id: 'food-2',
    optionA: 'बाँकी जीवनभर नेवारी खाना मात्र खाने',
    optionB: 'बाँकी जीवनभर थकाली खाना मात्र खाने',
    optionAVotes: 423,
    optionBVotes: 577
  },
  {
    id: 'food-3',
    optionA: 'सधैंका लागि सेल रोटी त्याग्ने',
    optionB: 'सधैंका लागि आलु तामा त्याग्ने',
    optionAVotes: 320,
    optionBVotes: 680
  },
  {
    id: 'food-4',
    optionA: 'जीवनभर चिनी बिनाको चिया पिउने',
    optionB: 'जीवनभर दूध बिनाको चिया पिउने',
    optionAVotes: 289,
    optionBVotes: 711
  },
  {
    id: 'food-5',
    optionA: 'बफ मोमो मात्र खाने',
    optionB: 'वेज मोमो मात्र खाने',
    optionAVotes: 521,
    optionBVotes: 479
  },
  
  // Travel Category
  {
    id: 'travel-1',
    optionA: 'एभरेस्ट बेस क्याम्पसम्म चढ्ने',
    optionB: 'कर्णाली नदीमा सम्पूर्ण र्‍याफ्टिङ गर्ने',
    optionAVotes: 723,
    optionBVotes: 277
  },
  {
    id: 'travel-2',
    optionA: 'काठमाडौंको ट्राफिकमा ३ घण्टा फस्ने',
    optionB: 'पहाडको मन्दिरसम्म पुग्न १,००० खुड्किला चढ्ने',
    optionAVotes: 245,
    optionBVotes: 755
  },
  {
    id: 'travel-3',
    optionA: 'बिजुली बिनाको पोखरामा बस्ने',
    optionB: 'इन्टरनेट बिनाको काठमाडौंमा बस्ने',
    optionAVotes: 657,
    optionBVotes: 343
  },
  {
    id: 'travel-4',
    optionA: 'वर्षा याममा पूरै अन्नपूर्ण परिक्रमा गर्ने',
    optionB: 'जाडो याममा एक महिना डोल्पामा बिताउने',
    optionAVotes: 421,
    optionBVotes: 579
  },
  {
    id: 'travel-5',
    optionA: 'पर्यटकीय मौसममा ठमेलमा स्कुटर चलाउने',
    optionB: 'दशैंको बेला काठमाडौंबाट पोखरासम्म भरिएको स्थानीय बसमा यात्रा गर्ने',
    optionAVotes: 513,
    optionBVotes: 487
  },
  
  // Culture Category
  {
    id: 'culture-1',
    optionA: 'काठमाडौंमा होली मनाउने',
    optionB: 'आफ्नो पुर्ख्यौली गाउँमा दशैं मनाउने',
    optionAVotes: 325,
    optionBVotes: 675
  },
  {
    id: 'culture-2',
    optionA: 'जीवित बुद्धसँग चिया पिउने',
    optionB: 'पृथ्वीनारायण शाहसँग कुराकानी गर्ने',
    optionAVotes: 583,
    optionBVotes: 417
  },
  {
    id: 'culture-3',
    optionA: 'हरेक वर्ष इन्द्रजात्रा मनाउने',
    optionB: 'हरेक वर्ष विस्केट जात्रा मनाउने',
    optionAVotes: 558,
    optionBVotes: 442
  },
  {
    id: 'culture-4',
    optionA: 'अद्भुत नेपाली शास्त्रीय नृत्यकार हुने',
    optionB: 'अद्वितीय परम्परागत नेपाली संगीतकार हुने',
    optionAVotes: 372,
    optionBVotes: 628
  },
  {
    id: 'culture-5',
    optionA: 'दशैंमा १०० जना आफन्तबाट टीका लगाउने',
    optionB: 'दशैंमा १०० जना आफन्तलाई टीका लगाइदिने',
    optionAVotes: 462,
    optionBVotes: 538
  },
  
  // Daily Life Category
  {
    id: 'daily-1',
    optionA: 'एक महिनासम्म बिजुली बिना बाँच्ने',
    optionB: 'एक दिन पानी बिना बाँच्ने',
    optionAVotes: 699,
    optionBVotes: 301
  },
  {
    id: 'daily-2',
    optionA: 'जीवनभर नेपाली मात्र बोल्ने',
    optionB: 'जीवनभर नेपाली बाहेक अन्य भाषा बोल्ने',
    optionAVotes: 532,
    optionBVotes: 468
  },
  {
    id: 'daily-3',
    optionA: 'छाता बिना अचानक वर्षामा फस्ने',
    optionB: 'मास्क बिना काठमाडौंको धुलोको आँधीमा फस्ने',
    optionAVotes: 843,
    optionBVotes: 157
  },
  {
    id: 'daily-4',
    optionA: 'कहिल्यै पनि लोडसेडिङको सामना नगर्ने',
    optionB: 'कहिल्यै पनि पानीको अभावको सामना नगर्ने',
    optionAVotes: 347,
    optionBVotes: 653
  },
  {
    id: 'daily-5',
    optionA: 'पर्यटकीय मौसममा ठमेलका पसलमा काम गर्ने',
    optionB: 'एभरेस्ट बेस क्याम्प ट्रेकमा पोर्टरको रूपमा काम गर्ने',
    optionAVotes: 621,
    optionBVotes: 379
  },
  
  // History Category
  {
    id: 'history-1',
    optionA: 'पृथ्वीनारायण शाहद्वारा नेपालको एकीकरण देख्ने',
    optionB: '२०७२ को संविधानमा हस्ताक्षर हुँदा देख्ने',
    optionAVotes: 765,
    optionBVotes: 235
  },
  {
    id: 'history-2',
    optionA: 'पशुपतिनाथ मन्दिर निर्माणको बेला उपस्थित हुने',
    optionB: 'स्वयम्भू स्तूप निर्माणको बेला उपस्थित हुने',
    optionAVotes: 477,
    optionBVotes: 523
  },
  {
    id: 'history-3',
    optionA: 'अरनिकोलाई भेट्ने र उनको वास्तुकला प्रतिभा सिक्ने',
    optionB: 'भृकुटीलाई भेट्ने र तिब्बतमा उनको प्रभाव बारे सिक्ने',
    optionAVotes: 413,
    optionBVotes: 587
  },
  {
    id: 'history-4',
    optionA: 'मल्ल कालमा बाँच्ने',
    optionB: 'शुरुवाती शाह कालमा बाँच्ने',
    optionAVotes: 614,
    optionBVotes: 386
  },
  {
    id: 'history-5',
    optionA: 'मध्यकालीन नेपालमा राजदरबारको कर्मचारी हुने',
    optionB: 'प्राचीन नेपालमा बौद्ध भिक्षु हुने',
    optionAVotes: 398,
    optionBVotes: 602
  },
  
  // Hypothetical Category
  {
    id: 'hypothetical-1',
    optionA: 'सबै नेपाली भाषा र बोली बोल्न सक्ने क्षमता हुने',
    optionB: 'सबै नेपाली परिकार सिद्ध बनाउन सक्ने',
    optionAVotes: 497,
    optionBVotes: 503
  },
  {
    id: 'hypothetical-2',
    optionA: 'नेपाली पात्रोमा एउटा अतिरिक्त सार्वजनिक बिदा थप्ने',
    optionB: 'नेपाली पात्रोबाट एउटा मौजुदा सार्वजनिक बिदा हटाउने',
    optionAVotes: 887,
    optionBVotes: 113
  },
  {
    id: 'hypothetical-3',
    optionA: 'अनन्त मोमो आपूर्ति पाउने',
    optionB: 'अनन्त दालभात आपूर्ति पाउने',
    optionAVotes: 634,
    optionBVotes: 366
  },
  {
    id: 'hypothetical-4',
    optionA: 'काठमाडौंमा विलासी पेन्टहाउस हुने',
    optionB: 'रमणीय गाउँमा जमिनसहितको परम्परागत घर हुने',
    optionAVotes: 225,
    optionBVotes: 775
  },
  {
    id: 'hypothetical-5',
    optionA: 'प्रख्यात नेपाली अभिनेता/अभिनेत्री हुने',
    optionB: 'सम्मानित नेपाली राजनीतिज्ञ हुने',
    optionAVotes: 643,
    optionBVotes: 357
  }
];