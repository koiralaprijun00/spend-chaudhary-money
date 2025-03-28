import { Festival } from '../../../../types';

// Translations object combining questions and UI strings
export const translations = {
  questions: {
    Dashain: {
      en: 'Which Nepali festival is celebrated for 15 days and involves flying kites, receiving tika, and enjoying feasts?',
      ne: 'कुन नेपाली चाड १५ दिनसम्म मनाइन्छ र जसमा पतंग उडाउने, टीका लगाउने र भोजन गर्ने परम्परा छ?'
    },
    Tihar: {
      en: 'Which festival is known as the festival of lights and honors crows, dogs, and cows?',
      ne: 'कुन चाडलाई प्रकाशको चाड भनिन्छ र जसमा काग, कुकुर र गाईको सम्मान गरिन्छ?'
    },
    Chhath: {
      en: 'Which festival is dedicated to the Sun God and involves standing in the river at sunrise?',
      ne: 'कुन चाड सूर्य भगवानलाई समर्पित छ र जसमा सूर्योदयको समयमा नदीमा उभिने गरिन्छ?'
    },
    'Maghe Sankranti': {
      en: 'Which festival marks the end of the coldest month and is celebrated with til ko laddu, ghee, and yam?',
      ne: 'कुन चाडले सबैभन्दा चिसो महिनाको अन्त्यलाई चिन्हित गर्छ र तिलको लड्डु, घिउ र तरुलसँग मनाइन्छ?'
    },
    Holi: {
      en: 'Which Nepali festival is known as the festival of colors and involves playing with water balloons and powder?',
      ne: 'कुन नेपाली चाडलाई रंगको चाड भनिन्छ र जसमा पानीको गुब्बारा र रंगीन पाउडरसँग खेलिन्छ?'
    },
    'Buddha Jayanti': {
      en: 'Which festival celebrates the birth, enlightenment, and passing of Gautam Buddha?',
      ne: 'कुन चाडले गौतम बुद्धको जन्म, ज्ञान प्राप्ति र परिनिर्वाणलाई मनाउँछ?'
    },
    'Indra Jatra': {
      en: 'Which festival features the Living Goddess Kumari, masked dancers, and chariot processions in Kathmandu?',
      ne: 'कुन चाडमा जीवित देवी कुमारी, नकाबधारी नर्तकहरू र काठमाडौंमा रथ यात्रा हुन्छ?'
    },
    'Gai Jatra': {
      en: 'Which festival involves a parade, people in funny costumes, and remembering loved ones who have passed away?',
      ne: 'कुन चाडमा परेड, हास्यास्पद पोशाकमा मानिसहरू र दिवंगत प्रियजनहरूलाई सम्झने गरिन्छ?'
    },
    Teej: {
      en: 'Which festival is celebrated by women wearing red, dancing, and fasting for marital happiness?',
      ne: 'कुन चाडमा महिलाहरूले रातो पहिरन लगाएर, नाचेर र वैवाहिक सुखको लागि व्रत बस्छन्?'
    },
    'Janai Purnima': {
      en: 'Which festival involves Hindu men changing their sacred thread (janai) and celebrating Rakshya Bandhan?',
      ne: 'कुन चाडमा हिन्दु पुरुषहरूले पवित्र धागो (जनै) परिवर्तन गर्छन् र रक्षा बन्धन मनाउँछन्?'
    },
    'Yomari Purnima': {
      en: 'Which Newar festival celebrates the full moon with rice flour dumplings filled with sweet ingredients?',
      ne: 'कुन नेवार चाडमा पूर्णिमाको दिन चामलको पिठोको योमरी मिठा सामग्रीले भरिएको बनाएर मनाइन्छ?'
    },
    'Rato Machhendranath Jatra': {
      en: 'Which festival in Patan involves pulling a massive chariot to welcome the monsoon season?',
      ne: 'पाटनको कुन चाडमा ठूलो रथ तानेर मनसुन मौसमको स्वागत गरिन्छ?'
    },
    'Sindoor Jatra': {
      en: 'Which festival in Bhaktapur uses orange powder and chariot processions to celebrate the Nepali New Year?',
      ne: 'भक्तपुरको कुन चाडमा सिन्दूर (सुन्तला रंगको धूलो) र रथ यात्राले नेपाली नयाँ वर्ष मनाइन्छ?'
    },
    'Tamu Lhosar': {
      en: 'Which festival celebrates the New Year for the Gurung community with traditional dances and feasts?',
      ne: 'कुन चाडले गुरुङ समुदायको नयाँ वर्षलाई परम्परागत नृत्य र भोजसँग मनाउँछ?'
    },
    'Naga Panchami': {
      en: 'Which Hindu festival honors snakes with offerings of milk and prayers for protection?',
      ne: 'कुन हिन्दु चाडमा सर्पहरूलाई दूधको भेटी र सुरक्षाको प्रार्थनाले सम्मान गरिन्छ?'
    },
    'Tamang Lhosar': {
      en: 'Which festival celebrates the New Year of the Tamang community with traditional dances and unique customs?',
      ne: 'कुन चाडले तामाङ समुदायको नयाँ वर्षलाई परम्परागत नृत्य र अनौठो चलनसँग मनाउँछ?'
    },
    'Maha Shivaratri': {
      en: 'Which festival involves devotees staying awake all night to worship Lord Shiva?',
      ne: 'कुन चाडमा भक्तहरू रातभर जागा रहन्छन् र भगवान शिवको पूजा गर्छन्?'
    },
    'Ghyu Chaku': {
      en: 'Which winter festival is known for eating sweet treats and warming foods?',
      ne: 'कुन जाडोको चाड मिठा परिकार र न्यानो खानाको लागि प्रसिद्ध छ?'
    },
    'Swasthani Brata': {
      en: 'Which month-long festival involves women reading a sacred story and fasting?',
      ne: 'कुन महिना लामो चाडमा महिलाहरूले पवित्र कथा पढ्छन् र व्रत बस्छन्?'
    },
    'Bisket Jatra': {
      en: 'Which festival marks the Nepali New Year with a massive chariot pulling ritual in Bhaktapur?',
      ne: 'कुन चाडले भक्तपुरमा ठूलो रथ तान्ने परम्परासँग नेपाली नयाँ वर्ष मनाउँछ?'
    },
    'Saraswati Puja': {
      en: 'Which festival honors the goddess of knowledge and arts?',
      ne: 'कुन चाडले ज्ञान र कलाकी देवी सरस्वतीको सम्मान गर्छ?'
    },
    'Udhauli Parva': {
      en: 'Which festival marks the migration of Kirat communities?',
      ne: 'कुन चाडले किरात समुदायको बसाइँसराइलाई चिन्हित गर्छ?'
    },
    'Chhat Parva': {
      en: 'Which festival involves elaborate sun worship near rivers and lakes?',
      ne: 'कुन चाडमा नदी र तालको नजिक विस्तृत सूर्य पूजा गरिन्छ?'
    }
  },
  ui: {
    Dashain: 'दशैं',
    Tihar: 'तिहार',
    'Next Clue': 'अर्को संकेत',
    'Submit Guess': 'अनुमान पेश गर्नुहोस्',
    'Next Festival': 'अर्को चाड',
    'Your guess...': 'तपाईंको अनुमान...',
    Score: 'अंक',
    'Correct!': 'सही!',
    'Try again!': 'फेरि प्रयास गर्नुहोस्!',
    'Standard Mode': 'टाइमर बिना',
    'Timed Mode': 'समय मोड',
    'Time Left': 'बाँकी समय',
    'Restart Game': 'खेल पुन: सुरु गर्नुहोस्',
    'Yomari Purnima': 'योमरी पूर्णिमा',
    'Rato Machhendranath Jatra': 'रातो मच्छेन्द्रनाथ जात्रा',
    'Sindoor Jatra': 'सिन्दूर जात्रा',
    'Tamu Lhosar': 'तमु ल्होसार',
    'Naga Panchami': 'नाग पञ्चमी',
    'Tamang Lhosar': 'तामाङ ल्होसार',
    'Maha Shivaratri': 'महाशिवरात्रि',
    'Ghyu Chaku': 'घ्यु चाकु',
    'Swasthani Brata': 'स्वस्थानी व्रत',
    'Bisket Jatra': 'बिस्केट जात्रा',
    'Saraswati Puja': 'सरस्वती पूजा',
    'Udhauli Parva': 'उधौली पर्व',
    'Chhat Parva': 'छठ पर्व',
    hint: 'संकेत'
  }
};

// Helper function to ensure translations exist for all festivals
export const enhancedTranslations = (originalTranslations: any) => {
  const allFestivals = festivals.map(f => f.name);
  
  // Create complete questions object with fallbacks
  const completeQuestions: Record<string, { ne: string; en: string }> = {};
  
  // For each festival, ensure there's an entry in the translations
  allFestivals.forEach(festival => {
    // If the festival exists in original translations, use it, otherwise create fallback
    completeQuestions[festival] = originalTranslations.questions[festival] || {
      en: `Which Nepali festival is ${festival}?`,
      ne: `कुन नेपाली चाड ${festival} हो?`
    };
  });
  
  // Return enhanced translations with complete questions
  return {
    ...originalTranslations,
    questions: completeQuestions
  };
};

// Define the festivals array
export const festivals: Festival[] = [
  {
    name: 'Dashain',
    question: translations.questions.Dashain.en,
    clues: [
      'A plate of khasi ko masu and kodo ko raksi.',
      'Kites fill the sky above the valley.',
      'Grandma insists on tika at 7 a.m. sharp!',
    ],
    fact: "Dashain's 15 days make it Nepal's longest festival!",
    image: '/images/dashain.jpg',
  },
  {
    name: 'Tihar',
    question: translations.questions.Tihar.en,
    clues: [
      'A plate of sel roti.',
      'Dogs with garlands around their necks.',
      'Bhailo songs echo at night.',
    ],
    fact: 'Tihar honors animals like crows, dogs, and cows!',
    image: '/images/tihar.jpg',
  },
  {
    name: 'Chhath',
    question: translations.questions.Chhath.en,
    clues: [
      'Devotees stand in the river at sunrise.',
      'Offerings of fruits, sugarcane, and thekua.',
      'Worship of the Sun God for blessings.',
    ],
    fact: 'Chhath Puja is mainly celebrated in the Terai region of Nepal.',
    image: '/images/chhath.jpg',
  },
  {
    name: 'Maghe Sankranti',
    question: translations.questions['Maghe Sankranti'].en,
    clues: [
      'Til ko laddu, ghee, and yam are must-haves.',
      'Marks the end of the coldest month.',
      'Celebrated with family gatherings and feasting.',
    ],
    fact: 'Maghe Sankranti is a New Year festival for the Tharu community.',
    image: '/images/maghe_sankranti.jpg',
  },
  {
    name: 'Holi',
    question: translations.questions.Holi.en,
    clues: [
      'Colors flying everywhere.',
      'Water balloons and pichkaris in action.',
      'Loud music and dance in the streets.',
    ],
    fact: 'Holi is known as the festival of colors and joy.',
    image: '/images/holi.jpg',
  },
  {
    name: 'Buddha Jayanti',
    question: translations.questions['Buddha Jayanti'].en,
    clues: [
      'Pilgrims gather at Lumbini.',
      'Monks chanting in monasteries.',
      'Butter lamps glow in the evening.',
    ],
    fact: 'Buddha Jayanti celebrates the birth, enlightenment, and passing of Gautam Buddha.',
    image: '/images/buddha_jayanti.jpg',
  },
  {
    name: 'Indra Jatra',
    question: translations.questions['Indra Jatra'].en,
    clues: [
      'The Living Goddess Kumari is carried on a chariot.',
      'Masked dancers perform in Kathmandu Durbar Square.',
      'Samay Baji and chhyang are popular treats.',
    ],
    fact: 'Indra Jatra marks the end of the monsoon and honors Indra, the rain god.',
    image: '/images/indra_jatra.jpg',
  },
  {
    name: 'Gai Jatra',
    question: translations.questions['Gai Jatra'].en,
    clues: [
      'A parade of people dressed in funny costumes.',
      'Families commemorate deceased loved ones.',
      'Newar communities celebrate with jokes and satire.',
    ],
    fact: 'Gai Jatra was started by a Malla king to help his queen overcome grief.',
    image: '/images/gai_jatra.jpg',
  },
  {
    name: 'Teej',
    question: translations.questions.Teej.en,
    clues: [
      'Women dressed in red and singing Teej songs.',
      'A day-long fasting for marital happiness.',
      'Dancing and celebrating in temples.',
    ],
    fact: 'Teej is a major festival for Hindu women, dedicated to Lord Shiva and Goddess Parvati.',
    image: '/images/teej.jpg',
  },
  {
    name: 'Janai Purnima',
    question: translations.questions['Janai Purnima'].en,
    clues: [
      'Men change their sacred thread (janai).',
      'Rakshya Bandhan, where sisters tie rakhi to their brothers.',
      'People visit Gosainkunda for a holy dip.',
    ],
    fact: 'Janai Purnima is celebrated by Hindus and Buddhists across Nepal.',
    image: '/images/janai_purnima.jpg',
  },
  {
    name: 'Yomari Purnima',
    question: translations.questions['Yomari Purnima'].en,
    clues: [
      'Families gather to make dumplings called yomari.',
      'Celebrated on the full moon day of Margashirsha.',
      'A time to pray for prosperity and share treats with neighbors.',
    ],
    fact: 'Yomari Purnima is a Newar tradition marking the end of the rice harvest with sweet-filled dumplings!',
    image: '/images/yomari_purnima.jpg',
  },
  {
    name: 'Rato Machhendranath Jatra',
    question: translations.questions['Rato Machhendranath Jatra'].en,
    clues: [
      'A giant chariot is paraded through the streets of Lalitpur.',
      'Celebrates the rain god Machhendranath.',
      'Takes weeks to build and lasts for days.',
    ],
    fact: 'Rato Machhendranath Jatra is one of Nepals longest chariot festivals, honoring the god of rain!',
    image: '/images/rato_machhendranath.jpg',
  },
  {
    name: 'Sindoor Jatra',
    question: translations.questions['Sindoor Jatra'].en,
    clues: [
      'People throw sindoor (orange powder) in Madhyapur Thimi.',
      'Features Newari music and dance.',
      'Marks the start of Bisket Jatra festivities.',
    ],
    fact: 'Sindoor Jatra is a colorful celebration tied to the Nepali New Year in Bhaktapur!',
    image: '/images/sindoor_jatra.jpg',
  },
  {
    name: 'Tamu Lhosar',
    question: translations.questions['Tamu Lhosar'].en,
    clues: [
      'Gurung people wear traditional attire and perform dances.',
      'Celebrated in December or January.',
      'Involves family gatherings and cultural performances.',
    ],
    fact: 'Tamu Lhosar is the Gurung communitys vibrant New Year celebration in the Himalayas!',
    image: '/images/tamu_lhosar.jpg',
  },
  {
    name: 'Naga Panchami',
    question: translations.questions['Naga Panchami'].en,
    clues: [
      'Images of snakes are placed on doorways.',
      'Devotees offer milk and honey to serpent deities.',
      'Celebrated during the monsoon in Shravan.',
    ],
    fact: 'Naga Panchami worships snakes as protectors during Nepals rainy season!',
    image: '/images/naga_panchami.jpg',
  },
  {
    name: 'Tamang Lhosar',
    question: translations.questions['Tamang Lhosar'].en,
    clues: [
      'Colorful traditional dress fills the village.',
      'Drums and traditional music echo through the hills.',
      'Families gather for special feast and celebrations.',
    ],
    fact: 'Tamang Lhosar marks the beginning of the Tamang New Year!',
    image: '/images/tamang_lhosar.jpg',
  },
  {
    name: 'Maha Shivaratri',
    question: translations.questions['Maha Shivaratri'].en,
    clues: [
      'Temples filled with devotees wearing special clothes.',
      'Lots of incense and special prayers throughout the night.',
      'People fast and visit Pashupatinath Temple.',
    ],
    fact: 'Maha Shivaratri celebrates the marriage of Lord Shiva and Goddess Parvati!',
    image: '/images/maha_shivaratri.jpg',
  },
  {
    name: 'Ghyu Chaku',
    question: translations.questions['Ghyu Chaku'].en,
    clues: [
      'Families make special sesame and molasses sweets.',
      'Warm foods help fight the winter cold.',
      'Gathering of family members to cook traditional dishes.',
    ],
    fact: 'Ghyu Chaku is a traditional winter celebration of warmth and togetherness!',
    image: '/images/ghyu_chaku.jpg',
  },
  {
    name: 'Swasthani Brata',
    question: translations.questions['Swasthani Brata'].en,
    clues: [
      'Daily reading of a special religious text.',
      'Women observe strict fasting and prayers.',
      'Celebrated during the cold winter month.',
    ],
    fact: 'Swasthani Brata is an important Hindu women spiritual practice!',
    image: '/images/swasthani_brata.jpg',
  },
  {
    name: 'Bisket Jatra',
    question: translations.questions['Bisket Jatra'].en,
    clues: [
      'Huge wooden chariots pulled through city streets.',
      'Massive crowds celebrating with traditional music.',
      'Marks the start of a new year in the Nepali calendar.',
    ],
    fact: 'Bisket Jatra is one of the most vibrant New Year celebrations in Nepal!',
    image: '/images/bisket_jatra.jpg',
  },
  {
    name: 'Saraswati Puja',
    question: translations.questions['Saraswati Puja'].en,
    clues: [
      'Students worship books and learning tools.',
      'White is the dominant color of the celebration.',
      'Special prayers in schools and temples.',
    ],
    fact: 'Saraswati Puja celebrates wisdom and artistic expression!',
    image: '/images/saraswati_puja.jpg',
  },
  {
    name: 'Udhauli Parva',
    question: translations.questions['Udhauli Parva'].en,
    clues: [
      'Traditional dance performances in open fields.',
      'Celebration of agricultural harvests.',
      'Unique cultural rituals of indigenous communities.',
    ],
    fact: 'Udhauli Parva reflects the agricultural traditions of Kirat people!',
    image: '/images/udhauli_parva.jpg',
  },
  {
    name: 'Chhat Parva',
    question: translations.questions['Chhat Parva'].en,
    clues: [
      'Devotees stand in water during sunrise and sunset.',
      'Offering prayers to the sun god.',
      'Special traditional foods prepared.',
    ],
    fact: 'Chhat Parva is a unique solar worship festival!',
    image: '/images/chhat_parva.jpg',
  }
];