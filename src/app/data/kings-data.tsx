// kings-data.tsx
export interface King {
  id: number;
  name: string;
  name_ne?: string; // Nepali name
  reignStart: number;
  reignEnd: number;
  notable: string;
  notable_ne?: string; // Nepali notable
  facts: string[];
  facts_ne?: string[]; // Nepali facts
  dynasty: string;
  dynasty_ne?: string; // Nepali dynasty
  acceptableAnswers: string[];
  imgSrc?: string;
}

export const kingsOfNepal: King[] = [
  {
    id: 1,
    name: "Prithvi Narayan Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "पृथ्वी नारायण शाह",
    reignStart: 1743,
    reignEnd: 1775,
    notable: "Unified various principalities to establish the Kingdom of Nepal",
    notable_ne: "नेपाल राज्यको स्थापना गर्न विभिन्न राज्यहरूलाई एकीकरण गरे",
    facts: [
      "Founded the Shah dynasty that ruled Nepal until 2008",
      "Conquered Kathmandu Valley in 1768",
      "Known for his saying 'Nepal is a yam between two boulders'",
      "Established Gorkha Kingdom as the foundation of modern Nepal"
    ],
    facts_ne: [
      "२००८ सम्म नेपाल शासन गरेको शाह वंशको स्थापना गरे",
      "१७६८ मा काठमाडौं उपत्यका विजय गरे",
      "'नेपाल दुई ढुंगाबीचको तरुल हो' भन्ने वाक्य उनको प्रसिद्ध छ",
      "आधुनिक नेपालको आधारको रूपमा गोरखा राज्यको स्थापना गरे"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Prithvi Narayan Shah", "Prithvi Narayan", "Prithvinarayan Shah"]
  },
  {
    id: 2,
    name: "Pratap Singh Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "प्रताप सिंह शाह",
    reignStart: 1775,
    reignEnd: 1777,
    notable: "Second king of unified Nepal and eldest son of Prithvi Narayan Shah",
    notable_ne: "एकीकृत नेपालका दोस्रो राजा र पृथ्वी नारायण शाहका जेष्ठ पुत्र",
    facts: [
      "Had a short reign of only 2 years",
      "Continued his father's unification campaign",
      "Died of smallpox at a young age",
      "Father of King Rana Bahadur Shah"
    ],
    facts_ne: [
      "केवल २ वर्षको छोटो शासनकाल",
      "आफ्ना पिताको एकीकरण अभियान जारी राखे",
      "कम उमेरमै ठेउला (विस्फोटक) रोगबाट मृत्यु भयो",
      "राजा रण बहादुर शाहका पिता"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Pratap Singh Shah", "Pratap Singh", "Pratapsingh Shah"]
  },
  {
    id: 3,
    name: "Rana Bahadur Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "रण बहादुर शाह",
    reignStart: 1777,
    reignEnd: 1799,
    notable: "Became king as a child and later abdicated to become an ascetic",
    notable_ne: "बालक अवस्थामा राजा बने र पछि संन्यासी बन्न राजगद्दी त्याग गरे",
    facts: [
      "Was only 2 years old when crowned, with regents ruling until 1794",
      "Abdicated in favor of his son Girvan Yuddha in 1799",
      "Returned to power as regent after his self-imposed exile in Varanasi",
      "Murdered in 1806 by his half-brother Sher Bahadur Shah"
    ],
    facts_ne: [
      "राजा हुँदा केवल २ वर्षका थिए, १७९४ सम्म संरक्षकहरूले शासन गरे",
      "१७९९ मा आफ्ना छोरा गिर्वाण युद्धका लागि राजगद्दी त्याग गरे",
      "वाराणसीमा स्वयं-निर्वासित भएपछि संरक्षकको रूपमा सत्तामा फर्के",
      "१८०६ मा उनका सौतेनी भाइ शेर बहादुर शाहद्वारा हत्या गरिए"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Rana Bahadur Shah", "Rana Bahadur", "Ranabahadur Shah"]
  },
  {
    id: 4,
    name: "Girvan Yuddha Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "गिर्वाण युद्ध विक्रम शाह",
    reignStart: 1799,
    reignEnd: 1816,
    notable: "Ruled during the Anglo-Nepalese War and territorial expansion",
    notable_ne: "आंग्ल-नेपाली युद्ध र क्षेत्रीय विस्तारको समयमा शासन गरे",
    facts: [
      "Became king at the age of 2 when his father abdicated",
      "His reign saw the height of Nepal's territorial expansion",
      "The Anglo-Nepalese War (1814-1816) was fought during his reign",
      "Died of smallpox at age 19, just as the war with British ended"
    ],
    facts_ne: [
      "उनका पिताले राजगद्दी त्यागेपछि २ वर्षकै उमेरमा राजा भए",
      "उनको शासनकालमा नेपालको क्षेत्रीय विस्तार चरम सीमामा पुग्यो",
      "उनको शासनकालमा आंग्ल-नेपाली युद्ध (१८१४-१८१६) भयो",
      "ब्रिटिशसँगको युद्ध समाप्त हुने बेलामा १९ वर्षकै उमेरमा ठेउलाबाट मृत्यु भयो"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Girvan Yuddha Bikram Shah", "Girvan Yuddha", "Girvanyuddha Shah"]
  },
  {
    id: 5,
    name: "Rajendra Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "राजेन्द्र विक्रम शाह",
    reignStart: 1816,
    reignEnd: 1847,
    notable: "Witnessed rise of the powerful Rana regime that reduced the monarchy to figurehead status",
    notable_ne: "शक्तिशाली राणा शासनको उदय देखे जसले राजतन्त्रलाई नाममात्रको बनायो",
    facts: [
      "Crowned at age 3 after his father's death",
      "Was king during the Kot Massacre of 1846 that led to rise of Rana regime",
      "Jung Bahadur Rana became the first Rana Prime Minister during his reign",
      "Was exiled to Varanasi by Jung Bahadur Rana"
    ],
    facts_ne: [
      "पिताको मृत्युपछि ३ वर्षको उमेरमा राजा बने",
      "१८४६ को कोत हत्याकाण्डको समयमा राजा थिए, जसले राणा शासनलाई उदय गरायो",
      "उनकै शासनकालमा जंगबहादुर राणा पहिलो राणा प्रधानमन्त्री बने",
      "जंगबहादुर राणाले उनलाई वाराणसीमा निर्वासित गरे"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Rajendra Bikram Shah", "Rajendra Shah", "Rajendra Bikram"]
  },
  {
    id: 6,
    name: "Surendra Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "सुरेन्द्र विक्रम शाह",
    reignStart: 1847,
    reignEnd: 1881,
    notable: "First king to rule under the total control of the Rana Prime Ministers",
    notable_ne: "राणा प्रधानमन्त्रीहरूको पूर्ण नियन्त्रणमा शासन गर्ने पहिलो राजा",
    facts: [
      "Son of Rajendra Bikram Shah",
      "Had no real political power due to the control of the Rana Prime Ministers",
      "Witnessed the beginning of the hereditary Rana Prime Ministership",
      "Known for his eccentric behavior and difficult relationship with Jung Bahadur Rana"
    ],
    facts_ne: [
      "राजेन्द्र विक्रम शाहका छोरा",
      "राणा प्रधानमन्त्रीहरूको नियन्त्रणका कारण कुनै वास्तविक राजनीतिक शक्ति थिएन",
      "वंशानुगत राणा प्रधानमन्त्री पदको सुरुवात देखे",
      "उनको विचित्र व्यवहार र जंगबहादुर राणासँगको कठिन सम्बन्धका लागि चिनिन्छन्"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Surendra Bikram Shah", "Surendra Shah", "Surendra Bikram"]
  },
  {
    id: 7,
    name: "Prithvi Bir Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "पृथ्वी वीर विक्रम शाह",
    reignStart: 1881,
    reignEnd: 1911,
    notable: "Modernizer who established the first college and hospital in Nepal",
    notable_ne: "नेपालमा पहिलो कलेज र अस्पताल स्थापना गर्ने आधुनिकीकरणकर्ता",
    facts: [
      "Son of Surendra Bikram Shah and Trailokya Rajya Lakshmi Devi",
      "Became king at age 6 upon his father's death",
      "Established Durbar High School and Tri-Chandra College",
      "Helped establish Bir Hospital, Nepal's first modern hospital"
    ],
    facts_ne: [
      "सुरेन्द्र विक्रम शाह र त्रैलोक्य राज्य लक्ष्मी देवीका छोरा",
      "पिताको मृत्युपछि ६ वर्षको उमेरमा राजा बने",
      "दरबार हाई स्कूल र त्रि-चन्द्र कलेज स्थापना गरे",
      "नेपालको पहिलो आधुनिक अस्पताल, वीर अस्पताल स्थापना गर्न सहयोग गरे"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Prithvi Bir Bikram Shah", "Prithvi Bir Shah", "Prithvibir Shah"]
  },
  {
    id: 8,
    name: "Tribhuvan Bir Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "त्रिभुवन वीर विक्रम शाह",
    reignStart: 1911,
    reignEnd: 1955,
    notable: "Key figure in overthrowing the Rana regime and establishing democracy in Nepal",
    notable_ne: "राणा शासन उल्टाउन र नेपालमा प्रजातन्त्र स्थापना गर्न महत्त्वपूर्ण भूमिका निभाए",
    facts: [
      "Became king at age 5 after his father's death",
      "Sought asylum in Indian Embassy in 1950 to support revolution against the Ranas",
      "Known as the 'Father of the Nation' for his role in establishing democracy",
      "First modern Nepalese monarch to travel abroad"
    ],
    facts_ne: [
      "पिताको मृत्युपछि ५ वर्षको उमेरमा राजा बने",
      "१९५० मा राणाहरू विरुद्धको क्रान्तिलाई समर्थन गर्न भारतीय दूतावासमा शरण लिए",
      "प्रजातन्त्र स्थापना गर्न खेलेको भूमिकाका लागि 'राष्ट्रपिता' का रूपमा चिनिन्छन्",
      "विदेश भ्रमण गर्ने पहिलो आधुनिक नेपाली राजा"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Tribhuvan Bir Bikram Shah", "Tribhuvan Shah", "King Tribhuvan"]
  },
  {
    id: 9,
    name: "Mahendra Bir Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "महेन्द्र वीर विक्रम शाह",
    reignStart: 1955,
    reignEnd: 1972,
    notable: "Introduced the Panchayat system and built major infrastructure projects",
    notable_ne: "पञ्चायत प्रणाली सुरु गरे र प्रमुख पूर्वाधार परियोजनाहरू निर्माण गरे",
    facts: [
      "Son of King Tribhuvan",
      "Suspended Nepal's first experiment with democracy in 1960",
      "Established the Panchayat system of government",
      "Created the East-West Highway and established diplomatic relations with many countries"
    ],
    facts_ne: [
      "राजा त्रिभुवनका छोरा",
      "१९६० मा नेपालको प्रथम प्रजातन्त्रिक प्रयोग निलम्बित गरे",
      "पञ्चायत शासन प्रणाली स्थापना गरे",
      "पूर्व-पश्चिम राजमार्ग निर्माण गरे र धेरै देशहरूसँग कूटनीतिक सम्बन्ध स्थापना गरे"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Mahendra Bir Bikram Shah", "Mahendra Shah", "King Mahendra"]
  },
  {
    id: 10,
    name: "Birendra Bir Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "वीरेन्द्र वीर विक्रम शाह",
    reignStart: 1972,
    reignEnd: 2001,
    notable: "Oversaw Nepal's transition from absolute monarchy to constitutional monarchy",
    notable_ne: "निरंकुश राजतन्त्रबाट संवैधानिक राजतन्त्रमा नेपालको संक्रमण देखे",
    facts: [
      "Son of King Mahendra",
      "Declared Nepal as a 'Zone of Peace'",
      "Agreed to constitutional monarchy after the People's Movement of 1990",
      "Killed along with most of the royal family in the 2001 Royal Massacre"
    ],
    facts_ne: [
      "राजा महेन्द्रका छोरा",
      "नेपाललाई 'शान्ति क्षेत्र' घोषणा गरे",
      "१९९० को जनआन्दोलन पछि संवैधानिक राजतन्त्रमा सहमत भए",
      "२००१ को दरबार हत्याकाण्डमा धेरैजसो राजपरिवारका सदस्यहरूसँगै मारिए"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Birendra Bir Bikram Shah", "Birendra Shah", "King Birendra"]
  },
  {
    id: 11,
    name: "Dipendra Bir Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "दीपेन्द्र वीर विक्रम शाह",
    reignStart: 2001,
    reignEnd: 2001,
    notable: "Had the shortest reign of just 3 days while in a coma",
    notable_ne: "कोमामा रहँदा केवल ३ दिनको सबैभन्दा छोटो शासनकाल भयो",
    facts: [
      "Son of King Birendra",
      "Allegedly responsible for the Royal Massacre that killed his parents and siblings",
      "Declared king while in coma after shooting himself",
      "Technically ruled for only 3 days while unconscious"
    ],
    facts_ne: [
      "राजा वीरेन्द्रका छोरा",
      "आफ्नै माता-पिता र भाइबहिनीहरूको हत्या गरेको दरबार हत्याकाण्डका लागि कथित रूपमा जिम्मेवार",
      "आफैंलाई गोली हानेपछि कोमामा रहँदा राजा घोषित गरिए",
      "प्राविधिक रूपमा बेहोस अवस्थामा केवल ३ दिन शासन गरे"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Dipendra Bir Bikram Shah", "Dipendra Shah", "King Dipendra"]
  },
  {
    id: 12,
    name: "Gyanendra Bir Bikram Shah",
    imgSrc: "/images/kings/prithvi-narayan-shah.jpg",
    name_ne: "ज्ञानेन्द्र वीर विक्रम शाह",
    reignStart: 2001,
    reignEnd: 2008,
    notable: "Last king of Nepal whose actions accelerated the abolition of the monarchy",
    notable_ne: "नेपालका अन्तिम राजा जसका कार्यहरूले राजतन्त्र उन्मूलनलाई तीव्र बनाए",
    facts: [
      "Brother of King Birendra",
      "Previously served as king briefly in 1950-51 as a child when royal family fled to India",
      "Took direct control of the government in 2005, suspending democracy",
      "Monarchy was abolished in 2008 by the newly elected Constituent Assembly"
    ],
    facts_ne: [
      "राजा वीरेन्द्रका भाइ",
      "१९५०-५१ मा राजपरिवार भारत भाग्दा बालक अवस्थामा छोटो समयका लागि राजा भए",
      "२००५ मा प्रजातन्त्र निलम्बन गरी सरकारको प्रत्यक्ष नियन्त्रण लिए",
      "२००८ मा नवनिर्वाचित संविधानसभाद्वारा राजतन्त्र उन्मूलन गरियो"
    ],
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Gyanendra Bir Bikram Shah", "Gyanendra Shah", "King Gyanendra"]
  }
];

export function getKingsInChronologicalOrder(): King[] {
  return [...kingsOfNepal].sort((a, b) => a.reignStart - b.reignStart);
}

export function isAnswerCorrect(input: string, king: King): boolean {
  if (!input.trim()) return false;
  
  const normalizedInput = input.toLowerCase().trim();
  const acceptableAnswers = king.acceptableAnswers.map(answer => answer.toLowerCase().trim());
  
  return acceptableAnswers.some(answer => 
    normalizedInput === answer || 
    normalizedInput.includes(answer) || 
    answer.includes(normalizedInput)
  );
}