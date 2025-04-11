// src/app/data/logo-quiz/getLogos.js

// Sample logo database
const logoData = {
    en: [
      {
        id: 'ncell',
        name: 'Ncell',
        imagePath: '/logos/ncell.png',
        difficulty: 'easy',
        category: 'telecom',
        acceptableAnswers: ['Ncell', 'N-Cell']
      },
      {
        id: 'nabil_bank',
        name: 'Nabil Bank',
        imagePath: '/logos/nabil.png',
        difficulty: 'medium',
        category: 'banking',
        acceptableAnswers: ['Nabil Bank', 'Nabil', 'NABIL']
      },
      {
        id: 'buddha_air',
        name: 'Buddha Air',
        imagePath: '/yo-chineu/buddha_air.png',
        difficulty: 'medium',
        category: 'airline',
        acceptableAnswers: ['Buddha Air', 'Buddha Airlines']
      },
      {
        id: 'tata',
        name: 'Tata',
        imagePath: '/logos/tata.png',
        difficulty: 'easy',
        category: 'automotive',
        acceptableAnswers: ['Tata', 'Tata Motors', 'TATA']
      },
      {
        id: 'wai_wai',
        name: 'Wai Wai',
        imagePath: '/logos/wai_wai.png',
        difficulty: 'easy',
        category: 'food',
        acceptableAnswers: ['Wai Wai', 'WaiWai', 'Wai-Wai']
      },
      {
        id: 'cg',
        name: 'CG',
        imagePath: '/logos/cg.png',
        difficulty: 'medium',
        category: 'conglomerate',
        acceptableAnswers: ['CG', 'Chaudhary Group', 'CG Group']
      },
      {
        id: 'dish_home',
        name: 'Dish Home',
        imagePath: '/logos/dish_home.png',
        difficulty: 'medium',
        category: 'cable',
        acceptableAnswers: ['Dish Home', 'DishHome']
      },
      {
        id: 'ntc',
        name: 'Nepal Telecom',
        imagePath: '/logos/ntc.png',
        difficulty: 'easy',
        category: 'telecom',
        acceptableAnswers: ['Nepal Telecom', 'NTC', 'Nepal Doorsanchar']
      },
      {
        id: 'himalayan_bank',
        name: 'Himalayan Bank',
        imagePath: '/logos/himalayan_bank.png',
        difficulty: 'medium',
        category: 'banking',
        acceptableAnswers: ['Himalayan Bank', 'HBL', 'Himalayan Bank Limited']
      },
      {
        id: 'yeti_airlines',
        name: 'Yeti Airlines',
        imagePath: '/logos/yeti_airlines.png',
        difficulty: 'medium',
        category: 'airline',
        acceptableAnswers: ['Yeti Airlines', 'Yeti']
      },
      {
        id: 'kumari_bank',
        name: 'Kumari Bank',
        imagePath: '/logos/kumari_bank.png',
        difficulty: 'hard',
        category: 'banking',
        acceptableAnswers: ['Kumari Bank', 'Kumari', 'Kumari Bank Limited']
      },
      {
        id: 'laxmi_bank',
        name: 'Laxmi Bank',
        imagePath: '/logos/laxmi_bank.png',
        difficulty: 'hard',
        category: 'banking',
        acceptableAnswers: ['Laxmi Bank', 'Laxmi', 'Lakshmi Bank']
      },
      {
        id: 'nic_asia',
        name: 'NIC Asia Bank',
        imagePath: '/logos/nic_asia.png',
        difficulty: 'hard',
        category: 'banking',
        acceptableAnswers: ['NIC Asia', 'NIC Asia Bank', 'NIC']
      },
      {
        id: 'nepal_investment_bank',
        name: 'Nepal Investment Bank',
        imagePath: '/logos/nepal_investment_bank.png',
        difficulty: 'hard',
        category: 'banking',
        acceptableAnswers: ['Nepal Investment Bank', 'NIBL', 'Nepal Investment']
      },
      {
        id: 'gorkha_brewery',
        name: 'Gorkha Brewery',
        imagePath: '/logos/gorkha_brewery.png',
        difficulty: 'medium',
        category: 'beverage',
        acceptableAnswers: ['Gorkha Brewery', 'Gorkha', 'Gorkha Beer']
      },
      {
        id: 'nepal_airlines',
        name: 'Nepal Airlines',
        imagePath: '/logos/nepal_airlines.png',
        difficulty: 'easy',
        category: 'airline',
        acceptableAnswers: ['Nepal Airlines', 'NAC', 'Nepal Airlines Corporation', 'Royal Nepal Airlines']
      },
      {
        id: 'esewa',
        name: 'eSewa',
        imagePath: '/logos/esewa.png',
        difficulty: 'easy',
        category: 'fintech',
        acceptableAnswers: ['eSewa', 'e-Sewa', 'E Sewa']
      },
      {
        id: 'khalti',
        name: 'Khalti',
        imagePath: '/logos/khalti.png',
        difficulty: 'medium',
        category: 'fintech',
        acceptableAnswers: ['Khalti', 'Khalti Digital Wallet']
      },
      {
        id: 'worldlink',
        name: 'WorldLink',
        imagePath: '/logos/worldlink.png',
        difficulty: 'easy',
        category: 'internet',
        acceptableAnswers: ['WorldLink', 'World Link', 'Worldlink Communications']
      },
      {
        id: 'siddhartha_bank',
        name: 'Siddhartha Bank',
        imagePath: '/logos/siddhartha_bank.png',
        difficulty: 'hard',
        category: 'banking',
        acceptableAnswers: ['Siddhartha Bank', 'Siddhartha', 'Siddhartha Bank Limited']
      }
    ],
    np: [
      {
        id: 'ncell',
        name: 'एनसेल',
        imagePath: '/logos/ncell.png',
        difficulty: 'easy',
        category: 'दूरसञ्चार',
        acceptableAnswers: ['एनसेल', 'Ncell', 'N-Cell']
      },
      {
        id: 'nabil_bank',
        name: 'नबिल बैंक',
        imagePath: '/logos/nabil.png',
        difficulty: 'medium',
        category: 'बैंकिङ',
        acceptableAnswers: ['नबिल बैंक', 'नबिल', 'Nabil Bank', 'NABIL']
      },
      {
        id: 'buddha_air',
        name: 'बुद्ध एयर',
        imagePath: '/logos/buddha_air.png',
        difficulty: 'medium',
        category: 'हवाई सेवा',
        acceptableAnswers: ['बुद्ध एयर', 'Buddha Air', 'बुद्ध एयरलाइन्स']
      },
      {
        id: 'tata',
        name: 'टाटा',
        imagePath: '/logos/tata.png',
        difficulty: 'easy',
        category: 'सवारी साधन',
        acceptableAnswers: ['टाटा', 'Tata', 'टाटा मोटर्स', 'TATA']
      },
      {
        id: 'wai_wai',
        name: 'वाइ वाइ',
        imagePath: '/logos/wai_wai.png',
        difficulty: 'easy',
        category: 'खाद्य',
        acceptableAnswers: ['वाइ वाइ', 'Wai Wai', 'वाइवाइ', 'Wai-Wai']
      },
      {
        id: 'cg',
        name: 'सीजी',
        imagePath: '/logos/cg.png',
        difficulty: 'medium',
        category: 'समूह',
        acceptableAnswers: ['सीजी', 'चौधरी समूह', 'CG', 'Chaudhary Group']
      },
      {
        id: 'dish_home',
        name: 'डिश होम',
        imagePath: '/logos/dish_home.png',
        difficulty: 'medium',
        category: 'केबल',
        acceptableAnswers: ['डिश होम', 'Dish Home', 'डिशहोम']
      },
      {
        id: 'ntc',
        name: 'नेपाल टेलिकम',
        imagePath: '/logos/ntc.png',
        difficulty: 'easy',
        category: 'दूरसञ्चार',
        acceptableAnswers: ['नेपाल टेलिकम', 'NTC', 'नेपाल दूरसञ्चार']
      },
      {
        id: 'himalayan_bank',
        name: 'हिमालयन बैंक',
        imagePath: '/logos/himalayan_bank.png',
        difficulty: 'medium',
        category: 'बैंकिङ',
        acceptableAnswers: ['हिमालयन बैंक', 'HBL', 'हिमालयन बैंक लिमिटेड', 'Himalayan Bank']
      },
      {
        id: 'yeti_airlines',
        name: 'यति एयरलाइन्स',
        imagePath: '/logos/yeti_airlines.png',
        difficulty: 'medium',
        category: 'हवाई सेवा',
        acceptableAnswers: ['यति एयरलाइन्स', 'Yeti Airlines', 'यति']
      },
      {
        id: 'kumari_bank',
        name: 'कुमारी बैंक',
        imagePath: '/logos/kumari_bank.png',
        difficulty: 'hard',
        category: 'बैंकिङ',
        acceptableAnswers: ['कुमारी बैंक', 'कुमारी', 'Kumari Bank', 'कुमारी बैंक लिमिटेड']
      },
      {
        id: 'laxmi_bank',
        name: 'लक्ष्मी बैंक',
        imagePath: '/logos/laxmi_bank.png',
        difficulty: 'hard',
        category: 'बैंकिङ',
        acceptableAnswers: ['लक्ष्मी बैंक', 'लक्ष्मी', 'Laxmi Bank']
      },
      {
        id: 'nic_asia',
        name: 'एनआईसी एशिया बैंक',
        imagePath: '/logos/nic_asia.png',
        difficulty: 'hard',
        category: 'बैंकिङ',
        acceptableAnswers: ['एनआईसी एशिया', 'एनआईसी एशिया बैंक', 'NIC Asia', 'NIC']
      },
      {
        id: 'nepal_investment_bank',
        name: 'नेपाल इन्भेस्टमेन्ट बैंक',
        imagePath: '/logos/nepal_investment_bank.png',
        difficulty: 'hard',
        category: 'बैंकिङ',
        acceptableAnswers: ['नेपाल इन्भेस्टमेन्ट बैंक', 'NIBL', 'नेपाल इन्भेस्टमेन्ट', 'Nepal Investment Bank']
      },
      {
        id: 'gorkha_brewery',
        name: 'गोरखा ब्रुअरी',
        imagePath: '/logos/gorkha_brewery.png',
        difficulty: 'medium',
        category: 'पेय पदार्थ',
        acceptableAnswers: ['गोरखा ब्रुअरी', 'गोरखा', 'Gorkha Brewery', 'गोरखा बियर']
      },
      {
        id: 'nepal_airlines',
        name: 'नेपाल एयरलाइन्स',
        imagePath: '/logos/nepal_airlines.png',
        difficulty: 'easy',
        category: 'हवाई सेवा',
        acceptableAnswers: ['नेपाल एयरलाइन्स', 'NAC', 'नेपाल एयरलाइन्स कर्पोरेसन', 'Nepal Airlines', 'रोयल नेपाल एयरलाइन्स']
      },
      {
        id: 'esewa',
        name: 'ई-सेवा',
        imagePath: '/logos/esewa.png',
        difficulty: 'easy',
        category: 'फिन्टेक',
        acceptableAnswers: ['ई-सेवा', 'eSewa', 'ई सेवा', 'e-Sewa']
      },
      {
        id: 'khalti',
        name: 'खल्ती',
        imagePath: '/logos/khalti.png',
        difficulty: 'medium',
        category: 'फिन्टेक',
        acceptableAnswers: ['खल्ती', 'Khalti', 'खल्ती डिजिटल वालेट']
      },
      {
        id: 'worldlink',
        name: 'वर्ल्डलिङ्क',
        imagePath: '/logos/worldlink.png',
        difficulty: 'easy',
        category: 'इन्टरनेट',
        acceptableAnswers: ['वर्ल्डलिङ्क', 'WorldLink', 'वर्ल्ड लिङ्क', 'वर्ल्डलिङ्क कम्युनिकेसन्स']
      },
      {
        id: 'siddhartha_bank',
        name: 'सिद्धार्थ बैंक',
        imagePath: '/logos/siddhartha_bank.png',
        difficulty: 'hard',
        category: 'बैंकिङ',
        acceptableAnswers: ['सिद्धार्थ बैंक', 'सिद्धार्थ', 'Siddhartha Bank', 'सिद्धार्थ बैंक लिमिटेड']
      }
    ]
  };
  
  // Get logos based on locale
  export function getLogosByLocale(locale = 'en') {
    return logoData[locale] || logoData.en;
  }
  
  // Get logo by ID and locale
  export function getLogoById(id, locale = 'en') {
    const logos = getLogosByLocale(locale);
    return logos.find(logo => logo.id === id) || null;
  }
  
  // Export a specific difficulty level
  export function getLogosByDifficulty(difficulty, locale = 'en') {
    const logos = getLogosByLocale(locale);
    return logos.filter(logo => logo.difficulty === difficulty);
  }
  
  // Export logos by category
  export function getLogosByCategory(category, locale = 'en') {
    const logos = getLogosByLocale(locale);
    return logos.filter(logo => logo.category === category);
  }