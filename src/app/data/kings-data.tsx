// kings-data.tsx
export interface King {
  id: number;
  name: string;
  name_ne?: string; // Nepali name
  reignStart: number;
  reignEnd: number;
  notable: string;
  notable_ne?: string; // Nepali notable
  facts?: string[]; // Made optional to avoid errors (or remove if not needed)
  facts_ne?: string[]; // Made optional to avoid errors (or remove if not needed)
  dynasty: string;
  dynasty_ne?: string; // Nepali dynasty
  acceptableAnswers: string[];
  imgSrc?: string;
  paragraph: string; // Required as per your new data
  paragraph_ne?: string; // Optional as per your new data
}

export const kingsOfNepal: King[] = [
  {
    id: 1,
    name: "Prithvi Narayan Shah",
    imgSrc: "/kings-of-nepal/01-king-pns.jpg",
    name_ne: "पृथ्वी नारायण शाह",
    reignStart: 1743,
    reignEnd: 1775,
    notable: "Unified various principalities to establish the Kingdom of Nepal",
    notable_ne: "नेपाल राज्यको स्थापना गर्न विभिन्न राज्यहरूलाई एकीकरण गरे",
    paragraph: "Prithvi Narayan Shah, the visionary founder of modern Nepal, ascended to the throne of Gorkha in 1743 and embarked on an ambitious campaign to unify the fragmented principalities of the region. His strategic brilliance and determination culminated in the conquest of the Kathmandu Valley in 1768, a pivotal moment that solidified his legacy. Known for his famous saying, 'Nepal is a yam between two boulders,' he emphasized Nepal’s delicate geopolitical position between India and China. Establishing the Shah dynasty, which ruled until 2008, he laid the foundation for a centralized Nepalese state. His reign transformed the Gorkha Kingdom into a formidable power, integrating diverse cultures and territories into a unified identity. Prithvi Narayan’s leadership was marked by military prowess and diplomatic acumen, ensuring the survival and growth of his nascent kingdom amidst external pressures.",
    paragraph_ne: "पृथ्वी नारायण शाह, आधुनिक नेपालका दूरदर्शी संस्थापक, सन् १७४३ मा गोरखाको सिंहासनमा बसे र क्षेत्रका विखण्डित राज्यहरूलाई एकीकरण गर्ने महत्वाकांक्षी अभियान सुरु गरे। उनको रणनीतिक चातुर्य र दृढ संकल्पले सन् १७६८ मा काठमाडौं उपत्यकाको विजयमा परिणत भयो, जुन उनको विरासतलाई सुदृढ गर्ने निर्णायक क्षण थियो। 'नेपाल दुई ढुंगाबीचको तरुल हो' भन्ने उनको प्रसिद्ध भनाइले भारत र चीनबीच नेपालको नाजुक भूराजनीतिक अवस्थालाई जोड दियो। सन् २००८ सम्म शासन गरेको शाह वंशको स्थापना गर्दै उनले केन्द्रीकृत नेपाली राज्यको आधार खडा गरे। उनको शासनले गोरखा राज्यलाई शक्तिशाली शक्तिमा रूपान्तरण गर्‍यो, विविध संस्कृति र क्षेत्रहरूलाई एकीकृत पहिचानमा समाहित गर्‍यो। पृथ्वी नारायणको नेतृत्व सैन्य कौशल र कूटनीतिक बुद्धिमत्ताले चिन्हित थियो, जसले बाह्य दबाबहरूबीच उनको नवजात राज्यको生存 र वृद्धि सुनिश्चित गर्‍यो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Prithvi Narayan Shah", "Prithvi Narayan", "Prithvinarayan Shah"]
  },
  {
    id: 2,
    name: "Pratap Singh Shah",
    imgSrc: "/kings-of-nepal/02-king-pss.jpg",
    name_ne: "प्रताप सिंह शाह",
    reignStart: 1775,
    reignEnd: 1777,
    notable: "Second king of unified Nepal and eldest son of Prithvi Narayan Shah",
    notable_ne: "एकीकृत नेपालका दोस्रो राजा र पृथ्वी नारायण शाहका जेष्ठ पुत्र",
    paragraph: "Pratap Singh Shah, the eldest son of Prithvi Narayan Shah, ascended to the throne in 1775 following his father’s death, becoming the second king of unified Nepal. His reign, though brief, lasting only two years, continued the unification efforts initiated by his father. A young ruler, he faced the daunting task of consolidating the newly formed kingdom amidst internal challenges and external threats. Unfortunately, his promising reign was cut short when he succumbed to smallpox at a young age in 1777. Despite its brevity, his rule maintained the momentum of territorial integration and laid the groundwork for his son, Rana Bahadur Shah, to succeed him. Pratap Singh’s short tenure is often overshadowed by his father’s achievements, yet his role as a transitional figure ensured the stability of the Shah dynasty during its early years, preserving the vision of a unified Nepal.",
    paragraph_ne: "प्रताप सिंह शाह, पृथ्वी नारायण शाहका जेष्ठ पुत्र, आफ्ना पिताको मृत्युपछि सन् १७७५ मा सिंहासनमा बसे र एकीकृत नेपालका दोस्रो राजा बने। उनको शासनकाल, जम्मा दुई वर्ष मात्र रहे पनि, आफ्ना पिताले सुरु गरेको एकीकरण प्रयासलाई निरन्तरता दियो। एक युवा शासकको रूपमा, उनले आन्तरिक चुनौती र बाह्य खतराहरूबीच नवगठित राज्यलाई सुदृढ गर्ने कठिन कार्यको सामना गरे। दुर्भाग्यवश, सन् १७७७ मा कम उमेरमै ठेउला रोगले उनको आशाजनक शासनकाल समाप्त भयो। छोटो समय भए पनि, उनको शासनले क्षेत्रीय एकीकरणको गति कायम राख्यो र उनका छोरा रण बहादुर शाहलाई उत्तराधिकारी बन्न आधार तयार गर्‍यो। प्रताप सिंहको छोटो कार्यकाल प्रायः उनको पिताको उपलब्धिहरूले ओझेलमा परे पनि, प्रारम्भिक वर्षहरूमा शाह वंशको स्थिरता सुनिश्चित गर्दै एकीकृत नेपालको सपना संरक्षण गर्ने संक्रमणकालीन व्यक्तिको रूपमा उनको भूमिका महत्त्वपूर्ण थियो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Pratap Singh Shah", "Pratap Singh", "Pratapsingh Shah"]
  },
  {
    id: 3,
    name: "Rana Bahadur Shah",
    imgSrc: "/kings-of-nepal/03-king-rbs.jpg",
    name_ne: "रण बहादुर शाह",
    reignStart: 1777,
    reignEnd: 1799,
    notable: "Became king as a child and later abdicated to become an ascetic",
    notable_ne: "बालक अवस्थामा राजा बने र पछि संन्यासी बन्न राजगद्दी त्याग गरे",
    paragraph: "Rana Bahadur Shah ascended to the throne in 1777 at the tender age of two, following the untimely death of his father, Pratap Singh Shah. Due to his infancy, regents governed Nepal until 1794, when he assumed full control. His reign was marked by political instability and personal eccentricity. In 1799, he abdicated in favor of his infant son, Girvan Yuddha, and retreated to Varanasi to live as an ascetic, a rare move for a monarch. However, his exile was short-lived; he returned to Nepal and wielded power as regent, influencing the kingdom’s direction. His tumultuous life ended tragically in 1806 when he was assassinated by his half-brother, Sher Bahadur Shah. Rana Bahadur’s reign reflects a period of transition and turbulence, yet his decisions shaped the early trajectory of the Shah dynasty.",
    paragraph_ne: "रण बहादुर शाह आफ्ना पिता प्रताप सिंह शाहको असामयिक मृत्युपछि सन् १७७७ मा दुई वर्षको उमेरमा सिंहासनमा बसे। उनको बाल्यकालका कारण सन् १७९४ सम्म संरक्षकहरूले नेपालको शासन चलाए, त्यसपछि उनले पूर्ण नियन्त्रण लिए। उनको शासनकाल राजनीतिक अस्थिरता र व्यक्तिगत चरित्रले चिन्हित थियो। सन् १७९९ मा उनले आफ्ना शिशु छोरा गिर्वाण युद्धको पक्षमा राजगद्दी त्यागे र संन्यासी जीवन बिताउन वाराणसी गए, जुन एक राजाका लागि दुर्लभ कदम थियो। तर, उनको निर्वासन छोटो समयको लागि मात्र रह्यो; उनी नेपाल फर्के र संरक्षकको रूपमा सत्ता संचालन गरे, राज्यको दिशालाई प्रभावित गरे। उनको अशान्त जीवन सन् १८०६ मा उनको सौतेनी भाइ शेर बहादुर शाहद्वारा हत्या हुँदा दुखद रूपमा समाप्त भयो। रण बहादुरको शासनले संक्रमण र अस्थिरताको अवधिलाई प्रतिबिम्बित गर्छ, तैपनि उनका निर्णयहरूले शाह वंशको प्रारम्भिक मार्गलाई आकार दिए।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Rana Bahadur Shah", "Rana Bahadur", "Ranabahadur Shah"]
  },
  {
    id: 4,
    name: "Girvan Yuddha Bikram Shah",
    imgSrc: "/kings-of-nepal/04-king-gybs.jpg",
    name_ne: "गिर्वाण युद्ध विक्रम शाह",
    reignStart: 1799,
    reignEnd: 1816,
    notable: "Ruled during the Anglo-Nepalese War and territorial expansion",
    notable_ne: "आंग्ल-नेपाली युद्ध र क्षेत्रीय विस्तारको समयमा शासन गरे",
    paragraph: "Girvan Yuddha Bikram Shah became king in 1799 at the age of two after his father, Rana Bahadur Shah, abdicated. His reign coincided with Nepal’s greatest territorial expansion, stretching its borders through military campaigns. However, his rule is most remembered for the Anglo-Nepalese War (1814-1816), a conflict with the British East India Company that tested Nepal’s strength. Though a minor during much of his reign, regents managed the kingdom, navigating complex geopolitics. The war ended with the Treaty of Sugauli, ceding significant territories to the British, marking a shift in Nepal’s ambitions. Tragically, Girvan Yuddha died of smallpox in 1816 at age 19, shortly after the war’s conclusion, ending a reign that saw both the height of Nepal’s power and the beginning of its limitations under foreign pressure.",
    paragraph_ne: "गिर्वाण युद्ध विक्रम शाह सन् १७९९ मा आफ्ना पिता रण बहादुर शाहले राजगद्दी त्यागेपछि दुई वर्षको उमेरमा राजा बने। उनको शासनकालमा नेपालको क्षेत्रीय विस्तार सबैभन्दा ठूलो बन्यो, सैन्य अभियानहरू मार्फत यसको सिमाना फैलियो। तर, उनको शासन खासगरी आंग्ल-नेपाली युद्ध (१८१४-१८१६) का लागि सम्झिन्छ, जुन ब्रिटिश ईस्ट इण्डिया कम्पनीसँगको द्वन्द्वले नेपालको शक्तिको परीक्षा लियो। उनको शासनको अधिकांश समय नाबालक भएकाले संरक्षकहरूले राज्य सञ्चालन गरे, जटिल भूराजनीतिलाई व्यवस्थापन गरे। युद्ध सुगौली सन्धिले समाप्त भयो, जसले ठूलो क्षेत्र ब्रिटिशलाई सुम्पियो, नेपालको महत्वाकांक्षामा परिवर्तन ल्यायो। दुखद रूपमा, गिर्वाण युद्धको मृत्यु सन् १८१६ मा युद्ध समाप्त भएको केही समयपछि १९ वर्षको उमेरमा ठेउलाबाट भयो, जसले नेपालको शक्तिको चरम र बाह्य दबाबमा सीमाहरूको सुरुवात दुवै देखेको शासनको अन्त्य गर्‍यो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Girvan Yuddha Bikram Shah", "Girvan Yuddha", "Girvanyuddha Shah"]
  },
  {
    id: 5,
    name: "Rajendra Bikram Shah",
    imgSrc: "/kings-of-nepal/05-king-rbs.jpg",
    name_ne: "राजेन्द्र विक्रम शाह",
    reignStart: 1816,
    reignEnd: 1847,
    notable: "Witnessed rise of the powerful Rana regime that reduced the monarchy to figurehead status",
    notable_ne: "शक्तिशाली राणा शासनको उदय देखे जसले राजतन्त्रलाई नाममात्रको बनायो",
    paragraph: "Rajendra Bikram Shah ascended the throne in 1816 at age three following the death of his father, Girvan Yuddha Bikram Shah. His long reign witnessed a dramatic shift in Nepal’s power structure. Initially under regents, he assumed direct rule as an adult, but his authority was undermined by the rise of the Rana family. The Kot Massacre of 1846, orchestrated by Jung Bahadur Rana, marked the beginning of the Rana regime, reducing the Shah monarchy to a ceremonial role. Jung Bahadur became the first Rana Prime Minister, consolidating power and later exiling Rajendra to Varanasi in 1847. Rajendra’s reign reflects the erosion of royal influence and the emergence of a new political order, leaving him a king in name only as the Ranas dominated Nepal for over a century.",
    paragraph_ne: "राजेन्द्र विक्रम शाह आफ्ना पिता गिर्वाण युद्ध विक्रम शाहको मृत्युपछि सन् १८१६ मा तीन वर्षको उमेरमा सिंहासनमा बसे। उनको लामो शासनकालले नेपालको शक्ति संरचनामा नाटकीय परिवर्तन देख्यो। सुरुमा संरक्षकहरूको अधीनमा रहे पनि, वयस्क भएपछि उनले प्रत्यक्ष शासन लिए, तर राणा परिवारको उदयले उनको अधिकारलाई कमजोर बनायो। जंगबहादुर राणाले सन् १८४६ मा आयोजित कोत हत्याकाण्डले राणा शासनको सुरुवात गर्‍यो, जसले शाह राजतन्त्रलाई औपचारिक भूमिकामा सीमित गर्‍यो। जंगबहादुर पहिलो राणा प्रधानमन्त्री बने, सत्तालाई सुदृढ गरे र पछि सन् १८४७ मा राजेन्द्रलाई वाराणसीमा निर्वासित गरे। राजेन्द्रको शासनले राजकीय प्रभावको ह्रास र नयाँ राजनीतिक व्यवस्थाको उदयलाई प्रतिबिम्बित गर्छ, जसले उनलाई नाममात्रको राजाको रूपमा छोड्यो किनभने राणाहरूले एक शताब्दीभन्दा बढी नेपालमा प्रभुत्व जमाए।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Rajendra Bikram Shah", "Rajendra Shah", "Rajendra Bikram"]
  },
  {
    id: 6,
    name: "Surendra Bikram Shah",
    imgSrc: "/kings-of-nepal/06-king-sbs.jpg",
    name_ne: "सुरेन्द्र विक्रम शाह",
    reignStart: 1847,
    reignEnd: 1881,
    notable: "First king to rule under the total control of the Rana Prime Ministers",
    notable_ne: "राणा प्रधानमन्त्रीहरूको पूर्ण नियन्त्रणमा शासन गर्ने पहिलो राजा",
    paragraph: "Surendra Bikram Shah, son of Rajendra Bikram Shah, became king in 1847 at age 18, inheriting a monarchy stripped of real power by the Rana regime. His reign marked the beginning of the Shah kings’ complete subordination to the Rana Prime Ministers, who held hereditary control over Nepal’s government. Surendra had no political authority, serving merely as a figurehead while Jung Bahadur Rana and his successors dictated state affairs. Known for his eccentric behavior and strained relationship with Jung Bahadur, Surendra’s 34-year reign was a period of royal irrelevance amidst Rana dominance. His time on the throne saw the entrenchment of Rana rule, which would persist until 1951, shaping Nepal’s political landscape and relegating the monarchy to a symbolic role.",
    paragraph_ne: "सुरेन्द्र विक्रम शाह, राजेन्द्र विक्रम शाहका छोरा, सन् १८४७ मा १८ वर्षको उमेरमा राजा बने, राणा शासनले वास्तविक शक्तिबाट वञ्चित एक राजतन्त्रको उत्तराधिकार पाए। उनको शासनले शाह राजाहरूको राणा प्रधानमन्त्रीहरूको पूर्ण अधीनस्थताको सुरुवातलाई चिन्हित गर्‍यो, जसले नेपाल सरकारमाथि वंशानुगत नियन्त्रण राखे। सुरेन्द्रसँग कुनै राजनीतिक अधिकार थिएन, उनी केवल एक नाममात्रको शासकको रूपमा रहे जबकि जंगबहादुर राणा र उनका उत्तराधिकारीहरूले राज्यका मामिलाहरू चलाए। आफ्नो विचित्र व्यवहार र जंगबहादुरसँगको तनावपूर्ण सम्बन्धका लागि परिचित, सुरेन्द्रको ३४ वर्षे शासन राणा प्रभुत्वको बीचमा राजकीय अप्रासंगिकताको अवधि थियो। उनको सिंहासनको समयमा राणा शासनको जरा गाडियो, जुन सन् १९५१ सम्म कायम रह्यो, नेपालको राजनीतिक परिदृश्यलाई आकार दियो र राजतन्त्रलाई प्रतीकात्मक भूमिकामा सीमित गर्‍यो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Surendra Bikram Shah", "Surendra Shah", "Surendra Bikram"]
  },
  {
    id: 7,
    name: "Prithvi Bir Bikram Shah",
    imgSrc: "/kings-of-nepal/07-king-pbbs.png",
    name_ne: "पृथ्वी वीर विक्रम शाह",
    reignStart: 1881,
    reignEnd: 1911,
    notable: "Modernizer who established the first college and hospital in Nepal",
    notable_ne: "नेपालमा पहिलो कलेज र अस्पताल स्थापना गर्ने आधुनिकीकरणकर्ता",
    paragraph: "Prithvi Bir Bikram Shah, son of Surendra Bikram Shah, ascended the throne in 1881 at age six after his father’s death. His reign, under the shadow of Rana rule, marked a period of modernization despite his limited political power. A progressive ruler, he established Nepal’s first modern educational institutions, including Durbar High School and Tri-Chandra College, laying the groundwork for intellectual advancement. He also facilitated the creation of Bir Hospital, the country’s first modern medical facility, improving public health. Though the Ranas controlled governance, Prithvi Bir’s initiatives reflected a vision for a more developed Nepal. His 30-year reign bridged traditional monarchy with emerging modern needs, though his authority remained ceremonial. His efforts earned him recognition as a modernizer, subtly shaping Nepal’s future within the constraints of Rana dominance.",
    paragraph_ne: "पृथ्वी वीर विक्रम शाह, सुरेन्द्र विक्रम शाहका छोरा, आफ्ना पिताको मृत्युपछि सन् १८८१ मा छ वर्षको उमेरमा सिंहासनमा बसे। राणा शासनको छायाँमा रहेको उनको शासनकालले सीमित राजनीतिक शक्ति भए पनि आधुनिकीकरणको अवधिलाई चिन्हित गर्‍यो। एक प्रगतिशील शासकको रूपमा, उनले नेपालका पहिलो आधुनिक शैक्षिक संस्थाहरू, दरबार हाई स्कूल र त्रि-चन्द्र कलेज स्थापना गरे, बौद्धिक उन्नतिको आधार तयार गरे। उनले वीर अस्पताल, देशको पहिलो आधुनिक चिकित्सा सुविधा, निर्माणमा पनि सहयोग गरे, जसले सार्वजनिक स्वास्थ्य सुधार गर्‍यो। यद्यपि राणाहरूले शासन नियन्त्रण गरे, पृथ्वी वीरका पहलहरूले थप विकसित नेपालको सपना झल्काए। उनको ३० वर्षे शासनले परम्परागत राजतन्त्रलाई उभरिरहेका आधुनिक आवश्यकताहरूसँग जोड्यो, यद्यपि उनको अधिकार औपचारिक मात्र रह्यो। उनको प्रयासले उनलाई आधुनिकीकरणकर्ताको रूपमा मान्यता दिलायो, राणा प्रभुत्वको बन्देजभित्रै नेपालको भविष्यलाई सूक्ष्म रूपमा आकार दियो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Prithvi Bir Bikram Shah", "Prithvi Bir Shah", "Prithvibir Shah"]
  },
  {
    id: 8,
    name: "Tribhuvan Bir Bikram Shah",
    imgSrc: "/kings-of-nepal/08-king-tbbs.png",
    name_ne: "त्रिभुवन वीर विक्रम शाह",
    reignStart: 1911,
    reignEnd: 1955,
    notable: "Key figure in overthrowing the Rana regime and establishing democracy in Nepal",
    notable_ne: "राणा शासन उल्टाउन र नेपालमा प्रजातन्त्र स्थापना गर्न महत्त्वपूर्ण भूमिका निभाए",
    paragraph: "Tribhuvan Bir Bikram Shah became king in 1911 at age five following his father Prithvi Bir Bikram Shah’s death. His reign was transformative, ending over a century of Rana dominance. Initially a figurehead under Rana control, he emerged as a revolutionary leader by 1950, seeking asylum in the Indian Embassy to support the anti-Rana movement. His bold actions galvanized the 1950-51 revolution, leading to the Rana regime’s collapse and the establishment of democracy in Nepal. Known as the 'Father of the Nation,' Tribhuvan’s efforts restored the monarchy’s relevance and opened Nepal to the world, including becoming the first modern Nepalese king to travel abroad. His 44-year reign transitioned Nepal from autocracy to a fledgling democracy, leaving a lasting legacy of liberation.",
    paragraph_ne: "त्रिभुवन वीर विक्रम शाह आफ्ना पिता पृथ्वी वीर विक्रम शाहको मृत्युपछि सन् १९११ मा पाँच वर्षको उमेरमा राजा बने। उनको शासनकाल परिवर्तनकारी थियो, जसले एक शताब्दीभन्दा बढीको राणा प्रभुत्वलाई समाप्त गर्‍यो। सुरुमा राणा नियन्त्रणमा एक नाममात्रको शासक रहे पनि, सन् १९५० सम्म उनी क्रान्तिकारी नेताको रूपमा उदाए, राणा-विरोधी आन्दोलनलाई समर्थन गर्न भारतीय दूतावासमा शरण लिए। उनको साहसी कदमले सन् १९५०-५१ को क्रान्तिलाई उत्प्रेरित गर्‍यो, जसले राणा शासनको पतन र नेपालमा प्रजातन्त्रको स्थापना गर्‍यो। 'राष्ट्रपिता' का रूपमा चिनिएका त्रिभुवनको प्रयासले राजतन्त्रको सान्दर्भिकता पुनर्स्थापित गर्‍यो र नेपाललाई विश्वसामु खोल्यो, उनी विदेश भ्रमण गर्ने पहिलो आधुनिक नेपाली राजा बने। उनको ४४ वर्षे शासनले नेपाललाई निरंकुशताबाट नवजात प्रजातन्त्रतर्फ रूपान्तरण गर्‍यो, मुक्तिको स्थायी विरासत छोड्यो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Tribhuvan Bir Bikram Shah", "Tribhuvan Shah", "King Tribhuvan"]
  },
  {
    id: 9,
    name: "Mahendra Bir Bikram Shah",
    imgSrc: "/kings-of-nepal/10-king-mbbs.jpg",
    name_ne: "महेन्द्र वीर विक्रम शाह",
    reignStart: 1955,
    reignEnd: 1972,
    notable: "Introduced the Panchayat system and built major infrastructure projects",
    notable_ne: "पञ्चायत प्रणाली सुरु गरे र प्रमुख पूर्वाधार परियोजनाहरू निर्माण गरे",
    paragraph: "Mahendra Bir Bikram Shah, son of Tribhuvan, ascended the throne in 1955 and shaped Nepal’s modern trajectory. Initially inheriting a democratic framework, he suspended it in 1960, introducing the autocratic Panchayat system, which centralized power under the monarchy and banned political parties. A visionary in infrastructure, he spearheaded the East-West Highway, connecting Nepal’s remote regions, and expanded diplomatic ties globally. His reign balanced modernization with control, promoting education and development while suppressing dissent. Mahendra’s policies aimed at national unity and self-reliance, though they stifled political freedoms. His 17-year rule left Nepal more connected and internationally engaged, yet politically restricted, setting the stage for future unrest under his successors.",
    paragraph_ne: "महेन्द्र वीर विक्रम शाह, त्रिभुवनका छोरा, सन् १९५५ मा सिंहासनमा बसे र नेपालको आधुनिक मार्गलाई आकार दिए। सुरुमा प्रजातान्त्रिक संरचना प्राप्त गरे पनि, उनले सन् १९६० मा यसलाई निलम्बन गरे, निरंकुश पञ्चायत प्रणाली लागू गरे, जसले राजतन्त्रमा सत्ता केन्द्रीकृत गर्‍यो र राजनीतिक दलहरूमाथि प्रतिबन्ध लगायो। पूर्वाधारमा दूरदर्शी, उनले पूर्व-पश्चिम राजमार्गको नेतृत्व गरे, नेपालका दुर्गम क्षेत्रहरूलाई जोड्यो, र विश्वव्यापी रूपमा कूटनीतिक सम्बन्ध विस्तार गरे। उनको शासनले आधुनिकीकरण र नियन्त्रणबीच सन्तुलन राख्यो, शिक्षा र विकासलाई प्रोत्साहन दियो तर असहमतिलाई दबायो। महेन्द्रको नीतिले राष्ट्रिय एकता र आत्मनिर्भरतालाई लक्ष्य राख्यो, यद्यपि यसले राजनीतिक स्वतन्त्रतालाई कुण्ठित गर्‍यो। उनको १७ वर्षे शासनले नेपाललाई बढी जोडिएको र अन्तर्राष्ट्रिय रूपमा संलग्न बनायो, तर राजनीतिक रूपमा सीमित राख्यो, जसले उनका उत्तराधिकारीहरूको समयमा भविष्यको अशान्तिको आधार तयार गर्‍यो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Mahendra Bir Bikram Shah", "Mahendra Shah", "King Mahendra"]
  },
  {
    id: 10,
    name: "Birendra Bir Bikram Shah",
    imgSrc: "/kings-of-nepal/11-king-bbs.jpg",
    name_ne: "वीरेन्द्र वीर विक्रम शाह",
    reignStart: 1972,
    reignEnd: 2001,
    notable: "Oversaw Nepal's transition from absolute monarchy to constitutional monarchy",
    notable_ne: "निरंकुश राजतन्त्रबाट संवैधानिक राजतन्त्रमा नेपालको संक्रमण देखे",
    paragraph: "Birendra Bir Bikram Shah, son of Mahendra, became king in 1972 and guided Nepal through a pivotal transition. Inheriting the Panchayat system, he declared Nepal a 'Zone of Peace,' promoting neutrality amid Cold War tensions. Facing growing unrest, he conceded to the 1990 People’s Movement, ending absolute monarchy and establishing a constitutional framework with a multiparty democracy. Educated abroad, Birendra was seen as a gentle, progressive ruler, fostering education and tourism. His 29-year reign modernized Nepal while preserving its cultural identity. Tragically, his life ended in the 2001 Royal Massacre, killed alongside most of his family, allegedly by his son Dipendra, leaving a nation in shock and marking a dark chapter in Nepal’s history.",
    paragraph_ne: "वीरेन्द्र वीर विक्रम शाह, महेन्द्रका छोरा, सन् १९७२ मा राजा बने र नेपाललाई एक निर्णायक संक्रमणबाट डोर्‍याए। पञ्चायत प्रणालीको उत्तराधिकार पाएका उनले नेपाललाई 'शान्ति क्षेत्र' घोषणा गरे, शीतयुद्धको तनावबीच तटस्थता प्रवर्द्धन गरे। बढ्दो अशान्तिको सामना गर्दै, उनले सन् १९९० को जनआन्दोलनमा झुके, निरंकुश राजतन्त्रको अन्त्य गरे र बहुदलीय प्रजातन्त्रसहितको संवैधानिक ढाँचा स्थापना गरे। विदेशमा शिक्षित, वीरेन्द्रलाई कोमल र प्रगतिशील शासकको रूपमा हेरिन्थ्यो, जसले शिक्षा र पर्यटनलाई बढावा दिए। उनको २९ वर्षे शासनले नेपालको आधुनिकीकरण गर्‍यो, सांस्कृतिक पहिचान जोगाउँदै। दुखद रूपमा, उनको जीवन सन् २००१ को दरबार हत्याकाण्डमा समाप्त भयो, उनका अधिकांश परिवारसँगै उनको हत्या भयो, कथित रूपमा उनका छोरा दीपेन्द्रद्वारा, जसले राष्ट्रलाई स्तब्ध बनायो र नेपालको इतिहासमा एक कालो अध्याय चिन्हित गर्‍यो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Birendra Bir Bikram Shah", "Birendra Shah", "King Birendra"]
  },
  {
    id: 11,
    name: "Dipendra Bir Bikram Shah",
    imgSrc: "/kings-of-nepal/12-king-dbbs.jpg",
    name_ne: "दीपेन्द्र वीर विक्रम शाह",
    reignStart: 2001,
    reignEnd: 2001,
    notable: "Had the shortest reign of just 3 days while in a coma",
    notable_ne: "कोमामा रहँदा केवल ३ दिनको सबैभन्दा छोटो शासनकाल भयो",
    paragraph: "Dipendra Bir Bikram Shah, son of Birendra, holds the tragic distinction of Nepal’s shortest-reigning monarch, ruling for three days in 2001 while in a coma. On June 1, 2001, he allegedly perpetrated the Royal Massacre, killing his parents, siblings, and other royals before shooting himself, reportedly over a dispute about his marriage. Declared king while unconscious, he succumbed to his injuries on June 4, ending a reign that was nominal and chaotic. Educated at Eton and in Nepal, Dipendra was once seen as a promising heir, but his actions—whether driven by personal turmoil or conspiracy—shattered the monarchy’s stability. His brief, dark tenure accelerated Nepal’s move toward abolishing the monarchy, leaving a legacy of mystery and sorrow.",
    paragraph_ne: "दीपेन्द्र वीर विक्रम शाह, वीरेन्द्रका छोरा, नेपालका सबैभन्दा छोटो शासन गर्ने राजाको दुखद पहिचान बोकेका छन्, सन् २००१ मा कोमामा रहँदा तीन दिन शासन गरे। जुन १, २००१ मा उनले कथित रूपमा दरबार हत्याकाण्ड गरे, आफ्ना माता-पिता, भाइबहिनी र अन्य शाहीहरूलाई मारेर आफैंलाई गोली हाने, विवाहको विवादका कारण। बेहोस अवस्थामा राजा घोषित गरिएका उनी जुन ४ मा घाइते अवस्थामा मरे, जसले नाममात्रको र अराजक शासनको अन्त्य गर्‍यो। इटन र नेपालमा शिक्षित, दीपेन्द्रलाई एक समय आशाजनक उत्तराधिकारी मानिन्थ्यो, तर उनको कार्य—चाहे व्यक्तिगत अशान्ति वा षड्यन्त्रले प्रेरित—ले राजतन्त्रको स्थिरतालाई ध्वस्त गर्‍यो। उनको छोटो, अँध्यारो कार्यकालले नेपालको राजतन्त्र उन्मूलनतर्फको गतिलाई तीव्र बनायो, रहस्य र शोकको विरासत छोड्यो।",
    dynasty: "Shah",
    dynasty_ne: "शाह",
    acceptableAnswers: ["Dipendra Bir Bikram Shah", "Dipendra Shah", "King Dipendra"]
  },
  {
    id: 12,
    name: "Gyanendra Bir Bikram Shah",
    imgSrc: "/kings-of-nepal/13-king-gbbs.jpg",
    name_ne: "ज्ञानेन्द्र वीर विक्रम शाह",
    reignStart: 2001,
    reignEnd: 2008,
    notable: "Last king of Nepal whose actions accelerated the abolition of the monarchy",
    notable_ne: "नेपालका अन्तिम राजा जसका कार्यहरूले राजतन्त्र उन्मूलनलाई तीव्र बनाए",
    paragraph: "Gyanendra Bir Bikram Shah, brother of Birendra, became Nepal’s last king in 2001 after the Royal Massacre. Having briefly reigned as a child in 1950-51 during a family exile, he returned to the throne amid national trauma. In 2005, he seized direct control, suspending democracy and citing instability, a move that alienated the public and fueled anti-monarchy sentiment. His autocratic rule backfired, sparking the 2006 People’s Movement, which forced him to restore parliament. In 2008, the newly elected Constituent Assembly abolished the monarchy, ending the Shah dynasty’s 240-year reign. Gyanendra’s actions, intended to preserve royal power, instead hastened its demise, closing a historic chapter as Nepal became a republic.",
    paragraph_ne: "ज्ञानेन्द्र वीर विक्रम शाह, वीरेन्द्रका भाइ, सन् २००१ मा दरबार हत्याकाण्डपछि नेपालका अन्तिम राजा बने। सन् १९५०-५१ मा परिवारको निर्वासनका क्रममा बालकको रूपमा छोटो समय शासन गरेका उनी राष्ट्रिय संकटका बीच सिंहासनमा फर्के। सन् २००५ मा उनले अस्थिरताको बहाना बनाउँदै प्रजातन्त्र निलम्बन गरी प्रत्यक्ष नियन्त्रण लिए, जसले जनतालाई टाढ्यायो र राजतन्त्र-विरोधी भावनालाई बढायो। उनको निरंकुश शासन उल्टियो, सन् २००६ को जनआन्दोलन निम्त्यायो, जसले उनलाई संसद् पुनर्स्थापना गर्न बाध्य बनायो। सन् २००८ मा नवनिर्वाचित संविधानसभाले राजतन्त्र उन्मूलन गर्‍यो, २४० वर्षे शाह वंशको शासन समाप्त गर्‍यो। ज्ञानेन्द्रका कार्यहरू, जुन शाही सत्तालाई जोगाउने उद्देश्यले थिए, बरु यसको पतनलाई तीव्र बनायो, नेपाल गणतन्त्र बन्दै ऐतिहासिक अध्याय बन्द गर्‍यो।",
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