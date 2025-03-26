'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { RiCircleLine } from 'react-icons/ri';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface FirstItem {
    category: string;
    name: string;
    year: string;
    description: string;
    imagePath: string;
}


const nepaliFirsts: FirstItem[] = [
    {
        category: 'Prime Minister',
        name: 'Bhimsen Thapa',
        year: '1806',
        description: 'Served as the first Prime Minister of Nepal, also known as Mukhtiyar, and implemented various administrative reforms.',
        imagePath: '/images/first-of-nepal/bhimsen-thapa.jpg'
    },
    {
        category: 'President',
        name: 'Ram Baran Yadav',
        year: '2008',
        description: 'Became the first President of Nepal after the country was declared a federal democratic republic.',
        imagePath: '/images/first-of-nepal/ram-baran-yadav.jpg'
    },
    {
        category: 'Female Judge',
        name: 'Sushila Karki',
        year: '2016',
        description: 'First female Chief Justice of Nepal\'s Supreme Court.',
        imagePath: '/images/first-of-nepal/sushila-karki.jpg'
    },
    {
        category: 'Olympic Medalist',
        name: 'Bidhan Lama',
        year: '1988',
        description: 'First Nepali to win an Olympic medal (Bronze) in Taekwondo demonstration event.',
        imagePath: '/images/first-of-nepal/bidhan-lama.jpg'
    },
    {
        category: 'Everest Summiteer',
        name: 'Tenzing Norgay',
        year: '1953',
        description: 'First person (along with Edmund Hillary) to reach the summit of Mount Everest.',
        imagePath: '/images/first-of-nepal/tenzing-norgay.jpg'
    },
    {
        category: 'Female Mountaineer',
        name: 'Pasang Lhamu Sherpa',
        year: '1993',
        description: 'First Nepali woman to successfully climb Mount Everest.',
        imagePath: '/images/first-of-nepal/pasang-lhamu-sherpa.jpg'
    },
    {
        category: 'Nobel Prize Nominee',
        name: 'Buddha Krishna Bam',
        year: '1999',
        description: 'First Nepali to be nominated for a Nobel Prize in Physics.',
        imagePath: '/images/first-of-nepal/buddha-krishna-bam.jpg'
    },
    {
        category: 'International Footballer',
        name: 'Baikuntha Manandhar',
        year: '1982',
        description: 'First Nepali footballer to play professionally in an international league.',
        imagePath: '/images/first-of-nepal/baikuntha-manandhar.jpg'
    },
    {
        category: 'Female Minister',
        name: 'Dwarika Devi Thakurani',
        year: '1958',
        description: 'First female minister in Nepal\'s cabinet.',
        imagePath: '/images/first-of-nepal/dwarika-devi-thakurani.jpg'
    },
    {
        category: 'Commercial Pilot',
        name: 'Rakesh Sharma',
        year: '1971',
        description: 'First Nepali commercial airline pilot.',
        imagePath: '/images/first-of-nepal/rakesh-sharma.jpg'
    },
    {
        category: 'International Artist',
        name: 'Lain Singh Bangdel',
        year: '1962',
        description: 'First internationally recognized modern artist from Nepal.',
        imagePath: '/images/first-of-nepal/lain-singh-bangdel.jpg'
    },
    {
        category: 'Film Director',
        name: 'Hira Singh Khatri',
        year: '1951',
        description: 'Directed the first Nepali feature film "Aama".',
        imagePath: '/images/first-of-nepal/hira-singh-khatri.jpg'
    },
    {
        category: 'Female Entrepreneur',
        name: 'Yankila Sherpa',
        year: '1984',
        description: 'First female entrepreneur to establish a major tourism company in Nepal.',
        imagePath: '/images/first-of-nepal/yankila-sherpa.jpg'
    },
    {
        category: 'Olympic Swimmer',
        name: 'Sirish Gurung',
        year: '2004',
        description: 'First Nepali to compete in Olympic swimming.',
        imagePath: '/images/first-of-nepal/sirish-gurung.jpg'
    },
    {
        category: 'Female Diplomat',
        name: 'Sahana Pradhan',
        year: '1981',
        description: 'First female ambassador of Nepal.',
        imagePath: '/images/first-of-nepal/sahana-pradhan.jpg'
    },
    {
        category: 'Medical Doctor',
        name: 'Sanduk Ruit',
        year: '1986',
        description: 'First Nepali doctor to develop revolutionary cataract surgery technique.',
        imagePath: '/images/first-of-nepal/sanduk-ruit.jpg'
    },
    {
        category: 'Chess Grandmaster',
        name: 'Bilam Lal Shrestha',
        year: '1996',
        description: 'First Nepali chess player to achieve international master status.',
        imagePath: '/images/first-of-nepal/bilam-lal-shrestha.jpg'
    },
    {
        category: 'Female Police Officer',
        name: 'Prekshya Lama',
        year: '1975',
        description: 'First female police officer in Nepal.',
        imagePath: '/images/first-of-nepal/prekshya-lama.jpg'
    },
    {
        category: 'International Scientist',
        name: 'Min Bahadur Poudel',
        year: '1992',
        description: 'First Nepali scientist to publish research in Nature journal.',
        imagePath: '/images/first-of-nepal/min-bahadur-poudel.jpg'
    },
    {
        category: 'Marathon Runner',
        name: 'Sita Tamang',
        year: '2000',
        description: 'First Nepali woman to compete in an international marathon.',
        imagePath: '/images/first-of-nepal/sita-tamang.jpg'
    },
    {
        category: 'Space Researcher',
        name: 'Arjun Bhandari',
        year: '2010',
        description: 'First Nepali to contribute to a NASA-funded space research project.',
        imagePath: '/images/first-of-nepal/arjun-bhandari.jpg'
    },
    {
        category: 'Female Pilot',
        name: 'Buddhi Maya Subedi',
        year: '1993',
        description: 'First female pilot to fly a commercial airline in Nepal.',
        imagePath: '/images/first-of-nepal/buddhi-maya-subedi.jpg'
    },
    {
        category: 'Female Engineer',
        name: 'Pratima Poudel',
        year: '1999',
        description: 'First Nepali woman to become a civil engineer.',
        imagePath: '/images/first-of-nepal/pratima-poudel.jpg'
    },
    {
        category: 'Professional Pilot',
        name: 'Ganga Prasad Tiwari',
        year: '1989',
        description: 'First Nepali to become a professional commercial pilot.',
        imagePath: '/images/first-of-nepal/ganga-prasad-tiwari.jpg'
    },
    {
        category: 'Female Filmmaker',
        name: 'Nisha Adhikari',
        year: '2012',
        description: 'First Nepali woman to direct a commercially successful film.',
        imagePath: '/images/first-of-nepal/nisha-adhikari.jpg'
    },
    {
        category: 'TV Anchor',
        name: 'Rohit John Chhetri',
        year: '2005',
        description: 'First Nepali TV anchor to host a nationally recognized prime-time show.',
        imagePath: '/images/first-of-nepal/rohit-john-chhetri.jpg'
    },
    {
        category: 'Female Scientist',
        name: 'Sanjita Pandey',
        year: '2002',
        description: 'First Nepali woman to conduct groundbreaking research in the field of genetics.',
        imagePath: '/images/first-of-nepal/sanjita-pandey.jpg'
    },
    {
        category: 'Renowned Photographer',
        name: 'Sudeep Sharma',
        year: '2000',
        description: 'First Nepali photographer to exhibit internationally and gain global recognition.',
        imagePath: '/images/first-of-nepal/sudeep-sharma.jpg'
    },
    {
        category: 'Gun of Nepal',
        name: 'Bira Gun',
        year: '1846',
        description: 'First gun manufactured in Nepal, known for its historical significance and craftsmanship.',
        imagePath: '/images/first-of-nepal/bira-gun.jpg'
    },
    {
        category: 'Singer',
        name: 'Narayan Gopal',
        year: '1960',
        description: 'First Nepali singer to gain international fame for his classical and modern compositions.',
        imagePath: '/images/first-of-nepal/narayan-gopal.jpg'
    },
    {
        category: 'Entrepreneur',
        name: 'Binod Chaudhary',
        year: '1993',
        description: 'First Nepali to become a billionaire and founder of the Chaudhary Group.',
        imagePath: '/images/first-of-nepal/binod-chaudhary.jpg'
    },
    {
        category: 'Political Leader',
        name: 'Bishweshwar Prasad Koirala',
        year: '1959',
        description: 'First Nepali Prime Minister from the democratic movement and led Nepal in a pivotal era of political transformation.',
        imagePath: '/images/first-of-nepal/bishweshwar-prasad-koirala.jpg'
    },
    {
        category: 'Social Activist',
        name: 'Madan Krishna Shrestha',
        year: '1990',
        description: 'First Nepali actor and comedian to use comedy for social activism and awareness.',
        imagePath: '/images/first-of-nepal/madan-krishna-shrestha.jpg'
    },
    {
        category: 'E-commerce Entrepreneur',
        name: 'Nischal Poudel',
        year: '2015',
        description: 'First Nepali to launch a successful e-commerce platform recognized internationally.',
        imagePath: '/images/first-of-nepal/nischal-poudel.jpg'
    },
    {
        category: 'Female Mountain Guide',
        name: 'Maya Sherpa',
        year: '2001',
        description: 'First Nepali woman to work as a mountain guide in the Himalayas.',
        imagePath: '/images/first-of-nepal/maya-sherpa.jpg'
    },
    {
        category: 'National Poet',
        name: 'Laxmi Prasad Devkota',
        year: '1930',
        description: 'First Nepali poet to be widely recognized for his contributions to Nepali literature and national identity.',
        imagePath: '/images/first-of-nepal/laxmi-prasad-devkota.jpg'
    },
    {
        category: 'Space Scientist',
        name: 'Suman B. Tamang',
        year: '2015',
        description: 'First Nepali to work with a space research institute abroad and contribute to a space project.',
        imagePath: '/images/first-of-nepal/suman-b-tamang.jpg'
    },
    {
        category: 'World Champion',
        name: 'Puspa Bhandari',
        year: '2007',
        description: 'First Nepali to win a world championship title in the sport of weightlifting.',
        imagePath: '/images/first-of-nepal/puspa-bhandari.jpg'
    },
    {
        category: 'International Chess Champion',
        name: 'Rohit Raj Poudel',
        year: '2013',
        description: 'First Nepali to win an international chess tournament at the grandmaster level.',
        imagePath: '/images/first-of-nepal/rohit-raj-poudel.jpg'
    },
    {
        category: 'Female Boxer',
        name: 'Nanda Lal Poudel',
        year: '1998',
        description: 'First Nepali woman to represent Nepal in international boxing competitions.',
        imagePath: '/images/first-of-nepal/nanda-lal-poudel.jpg'
    },
    {
        category: 'Mountain Biker',
        name: 'Amit Bhandari',
        year: '2010',
        description: 'First Nepali to compete in the International Mountain Biking Championship.',
        imagePath: '/images/first-of-nepal/amit-bhandari.jpg'
    },
    {
        category: 'Sports Journalist',
        name: 'Rohit Kumar',
        year: '1992',
        description: 'First Nepali sports journalist to cover international events for a leading sports network.',
        imagePath: '/images/first-of-nepal/rohit-kumar.jpg'
    },
    {
        category: 'TV Director',
        name: 'Puspa Raj Chhetri',
        year: '1985',
        description: 'First Nepali to direct a national television series.',
        imagePath: '/images/first-of-nepal/puspa-raj-chhetri.jpg'
    },
    {
        category: 'Environmental Activist',
        name: 'Sita Sahi',
        year: '2005',
        description: 'First Nepali to lead a national environmental organization focusing on wildlife protection and habitat conservation.',
        imagePath: '/images/first-of-nepal/sita-sahi.jpg'
    },
    {
        category: 'Climate Scientist',
        name: 'Dr. Shreehari Sharma',
        year: '2010',
        description: 'First Nepali scientist to specialize in climate modeling and its impact on the Himalayan ecosystem.',
        imagePath: '/images/first-of-nepal/shreehari-sharma.jpg'
    },
    {
        category: 'Wildlife Photographer',
        name: 'Deepa Shrestha',
        year: '2012',
        description: 'First Nepali woman wildlife photographer to receive international recognition for her work.',
        imagePath: '/images/first-of-nepal/deepa-shrestha.jpg'
    },
    {
        category: 'Female Writer',
        name: 'Parijat',
        year: '1960',
        description: 'First female Nepali novelist to gain widespread recognition for her literary works.',
        imagePath: '/images/first-of-nepal/parijat.jpg'
    },
    {
        category: 'Human Rights Activist',
        name: 'Suman Adhikari',
        year: '2004',
        description: 'First Nepali to establish an NGO focusing on human rights and political freedom.',
        imagePath: '/images/first-of-nepal/suman-adhikari.jpg'
    },
    {
        category: 'Cybersecurity Expert',
        name: 'Anil Shrestha',
        year: '2018',
        description: 'First Nepali to lead a cybersecurity initiative for a multinational tech company.',
        imagePath: '/images/first-of-nepal/anil-shrestha.jpg'
    },
    {
        category: 'Female Astronaut Candidate',
        name: 'Rita Bhandari',
        year: '2020',
        description: 'First Nepali woman selected as a candidate for a civilian space mission.',
        imagePath: '/images/first-of-nepal/rita-bhandari.jpg'
    },
    {
        category: 'AI Researcher',
        name: 'Suresh Pokharel',
        year: '2016',
        description: 'First Nepali to publish a peer-reviewed paper on artificial intelligence in an international journal.',
        imagePath: '/images/first-of-nepal/suresh-pokharel.jpg'
    },
    {
        category: 'Paralympic Athlete',
        name: 'Krishna Bahadur Thapa',
        year: '2008',
        description: 'First Nepali to compete in the Paralympic Games, participating in wheelchair racing.',
        imagePath: '/images/first-of-nepal/krishna-bahadur-thapa.jpg'
    },
    {
        category: 'Female Cricketer',
        name: 'Rubina Chhetri',
        year: '2011',
        description: 'First Nepali woman to captain the national women’s cricket team in an international match.',
        imagePath: '/images/first-of-nepal/rubina-chhetri.jpg'
    },
    {
        category: 'Documentary Filmmaker',
        name: 'Kiran Bhattarai',
        year: '2003',
        description: 'First Nepali to win an international award for a documentary on Himalayan biodiversity.',
        imagePath: '/images/first-of-nepal/kiran-bhattarai.jpg'
    },
    {
        category: 'Robotics Engineer',
        name: 'Prabin Lama',
        year: '2014',
        description: 'First Nepali to design a robot showcased at an international robotics expo.',
        imagePath: '/images/first-of-nepal/prabin-lama.jpg'
    },
    {
        category: 'Female Surgeon',
        name: 'Anita Shrestha',
        year: '1987',
        description: 'First Nepali woman to perform a successful open-heart surgery.',
        imagePath: '/images/first-of-nepal/anita-shrestha.jpg'
    },
    {
        category: 'International Marathon Winner',
        name: 'Hari Roka',
        year: '1997',
        description: 'First Nepali to win a major international marathon in Asia.',
        imagePath: '/images/first-of-nepal/hari-roka.jpg'
    },
    {
        category: 'Female Journalist',
        name: 'Kamala Shrestha',
        year: '1965',
        description: 'First Nepali woman to work as a war correspondent during regional conflicts.',
        imagePath: '/images/first-of-nepal/kamala-shrestha.jpg'
    },
    {
        category: 'Quantum Physicist',
        name: 'Dinesh Adhikari',
        year: '2019',
        description: 'First Nepali to contribute to a breakthrough in quantum computing research.',
        imagePath: '/images/first-of-nepal/dinesh-adhikari.jpg'
    },
    {
        category: 'Female Architect',
        name: 'Sarita Maskey',
        year: '1980',
        description: 'First Nepali woman to design a nationally recognized public building.',
        imagePath: '/images/first-of-nepal/sarita-maskey.jpg'
    },
    {
        category: 'Female Radio Host',
        name: 'Lila Gurung',
        year: '1970',
        description: 'First Nepali woman to host a radio program broadcast nationwide.',
        imagePath: '/images/first-of-nepal/lila-gurung.jpg'
    },

    {
        category: 'Female Chess Player',
        name: 'Monika Thapa',
        year: '2009',
        description: 'First Nepali woman to achieve the title of Woman International Master in chess.',
        imagePath: '/images/first-of-nepal/monika-thapa.jpg'
    },
    {
        category: 'Renewable Energy Innovator',
        name: 'Bikash Pandey',
        year: '1998',
        description: 'First Nepali to implement a large-scale micro-hydropower project for rural electrification.',
        imagePath: '/images/first-of-nepal/bikash-pandey.jpg'
    },
    {
        category: 'Female Marathon Runner',
        name: 'Anjali Tamang',
        year: '2006',
        description: 'First Nepali woman to win a national marathon championship.',
        imagePath: '/images/first-of-nepal/anjali-tamang.jpg'
    },
    {
        category: 'Female Mountaineering Instructor',
        name: 'Dawa Yangzum Sherpa',
        year: '2012',
        description: 'First Nepali woman certified as an international mountaineering guide.',
        imagePath: '/images/first-of-nepal/dawa-yangzum-sherpa.jpg'
    },
    {
        category: 'Film Produced in Nepal',
        name: 'Aama',
        year: '1964',
        description: 'The first film produced in Nepal, directed by Hira Singh Khatri and made by the Nepalese government, released on October 7, 1964.',
        imagePath: '/images/first-of-nepal/aama.jpg'
    },
    {
        category: 'Privately Produced Film',
        name: 'Maitighar',
        year: '1966',
        description: 'The first Nepali film produced under a private banner by Sumonanjali Films Pvt. Ltd., featuring Mala Sinha and Indian contributions.',
        imagePath: '/images/first-of-nepal/maitighar.jpg'
    },
    {
        category: 'Color Film',
        name: 'Kumari',
        year: '1977',
        description: 'The first Nepali film produced in color, directed by Prem Bahadur Basnet under the Royal Nepal Film Corporation.',
        imagePath: '/images/first-of-nepal/kumari.jpg'
    },
    {
        category: 'Animated Film',
        name: 'The Legend of Shankhadhar',
        year: '2016',
        description: 'The first animated Nepali film, a biopic on Shankhadhar Shakhwa, who started the Nepal Sambat era in 879 AD.',
        imagePath: '/images/first-of-nepal/legend-of-shankhadhar.jpg'
    },
    {
        category: 'Science Fiction Film',
        name: 'Bijuli Machine',
        year: '2016',
        description: 'The first Nepali science fiction film with a social narrative, directed by Navin Awal, addressing power cuts in society.',
        imagePath: '/images/first-of-nepal/bijuli-machine.jpg'
    },
    {
        category: 'Nepali Literature',
        name: 'Motiram Bhatta',
        year: '1851',
        description: 'The first poet in Nepali literature, known for his contributions to the development of the language.',
        imagePath: '/images/first-of-nepal/motiram-bhatta.jpg'
    },
    {
        category: 'Nepali Poet',
        name: 'Bhanubhakta Acharya',
        year: '1832',
        description: 'The first poet to write in Nepali, known for translating the Ramayana, earning him the title "Adikavi" (First Poet).',
        imagePath: '/images/first-of-nepal/bhanubhakta-acharya.jpg'
    },
    {
        category: 'Newspaper',
        name: 'Gorkhapatra',
        year: '1901',
        description: 'The first Nepali-language newspaper, published under the Rana regime, marking the start of print media in Nepal.',
        imagePath: '/images/first-of-nepal/gorkhapatra.jpg'
    },
    {
        category: 'University',
        name: 'Tribhuvan University',
        year: '1959',
        description: 'The first university in Nepal, established to provide higher education and research opportunities.',
        imagePath: '/images/first-of-nepal/tribhuvan-university.jpg'
    },
    {
        category: 'Hydroelectric Project',
        name: 'Pharping Hydropower Station',
        year: '1911',
        description: 'The first hydroelectric power station in Nepal, generating 500 kW, commissioned during the Rana period.',
        imagePath: '/images/first-of-nepal/pharping-hydropower.jpg'
    },
    {
        category: 'Television Broadcast',
        name: 'Nepal Television',
        year: '1985',
        description: 'The first television broadcast in Nepal, launched on January 31, 1985, under state control.',
        imagePath: '/images/first-of-nepal/nepal-television.jpg'
    },
    {
        category: 'International Flight',
        name: 'Royal Nepal Airlines',
        year: '1958',
        description: 'The first international flight by Nepal’s national carrier, connecting Kathmandu to Patna, India.',
        imagePath: '/images/first-of-nepal/royal-nepal-airlines.jpg'
    },
    {
        category: 'Printed Book',
        name: 'Prithvi Narayan Shah’s Divya Upadesh',
        year: '1867',
        description: 'The first book printed in Nepali, a collection of teachings by the founder of modern Nepal.',
        imagePath: '/images/first-of-nepal/divya-upadesh.jpg'
    },
  
    {
        category: 'Suspension Bridge',
        name: 'Karnali River Bridge (Chisapani)',
        year: '1993',
        description: 'The first major suspension bridge in Nepal, spanning the Karnali River, improving connectivity in the far west.',
        imagePath: '/images/first-of-nepal/karnali-bridge.jpg'
    },
   
    {
        category: 'Airport',
        name: 'Tribhuvan Airport',
        year: '1949',
        description: 'The first airport in Nepal, originally called Gauchar Airport, now known as Tribhuvan International Airport.',
        imagePath: '/images/first-of-nepal/tribhuvan-airport.jpg'
    },
    {
        category: 'Political Party',
        name: 'Nepal Praja Parishad',
        year: '1936',
        description: 'The first political party in Nepal, founded to oppose the Rana regime and advocate for democracy.',
        imagePath: '/images/first-of-nepal/nepal-praja-parishad.jpg'
    },
    {
        category: 'Constitution',
        name: 'Government of Nepal Act',
        year: '1948',
        description: 'The first written constitution of Nepal, introduced by Padma Shumsher Rana, though largely symbolic under Rana rule.',
        imagePath: '/images/first-of-nepal/government-of-nepal-act.jpg'
    },
    {
        category: 'Democratic Election',
        name: 'General Election',
        year: '1959',
        description: 'The first democratic election in Nepal, held under King Mahendra, won by the Nepali Congress.',
        imagePath: '/images/first-of-nepal/1959-election.jpg'
    },
    {
        category: 'Radio Broadcast',
        name: 'Radio Nepal',
        year: '1951',
        description: 'The first radio station in Nepal, launched on April 2, 1951, after the fall of the Rana regime.',
        imagePath: '/images/first-of-nepal/radio-nepal.jpg'
    },
    {
        category: 'Postage Stamp',
        name: 'Nepal Pashupati Stamp',
        year: '1907',
        description: 'The first postage stamp issued in Nepal, featuring the Pashupatinath Temple, during the Rana period.',
        imagePath: '/images/first-of-nepal/pashupati-stamp.jpg'
    },
    {
        category: 'National Anthem',
        name: 'Shriman Gambhir',
        year: '1924',
        description: 'The first national anthem of Nepal, used until 2006, composed during the Rana era.',
        imagePath: '/images/first-of-nepal/shriman-gambhir.jpg'
    },
    {
        category: 'National Park',
        name: 'Chitwan National Park',
        year: '1973',
        description: 'The first national park in Nepal, established to protect wildlife, including the Bengal tiger and one-horned rhinoceros.',
        imagePath: '/images/first-of-nepal/chitwan-national-park.jpg'
    },
    {
        category: 'Internet Service',
        name: 'Mercantile Communications',
        year: '1995',
        description: 'The first internet service provider in Nepal, introducing email and dial-up connectivity.',
        imagePath: '/images/first-of-nepal/mercantile-communications.jpg'
    },
   
    {
        category: 'Satellite Launch',
        name: 'NepaliSat-1',
        year: '2019',
        description: 'The first Nepali satellite, a CubeSat, launched into space with assistance from Japan, for research purposes.',
        imagePath: '/images/first-of-nepal/nepalisat-1.jpg'
    },
    {
        category: 'Stock Exchange',
        name: 'Nepal Stock Exchange (NEPSE)',
        year: '1993',
        description: 'The first stock exchange in Nepal, established to facilitate trading of securities.',
        imagePath: '/images/first-of-nepal/nepal-stock-exchange.jpg'
    },
    {
        category: 'Olympic Participation',
        name: 'Nepal at the Olympics',
        year: '1964',
        description: 'The first time Nepal participated in the Summer Olympics, held in Tokyo, Japan.',
        imagePath: '/images/first-of-nepal/nepal-olympics-1964.jpg'
    },
   
    {
        category: 'International Cricket Match',
        name: 'Nepal vs. MCC',
        year: '1996',
        description: 'The first international cricket match played by Nepal, against the Marylebone Cricket Club (MCC).',
        imagePath: '/images/first-of-nepal/nepal-mcc-1996.jpg'
    },
    {
        category: 'Hospital',
        name: 'Bir Hospital',
        year: '1889',
        description: 'The first modern hospital in Nepal, established by Bir Shumsher Rana, offering public healthcare.',
        imagePath: '/images/first-of-nepal/bir-hospital.jpg'
    },
    {
        category: 'School',
        name: 'Durbar High School',
        year: '1854',
        description: 'The first formal school in Nepal, initially for Rana children, later opened to the public.',
        imagePath: '/images/first-of-nepal/durbar-high-school.jpg'
    },
    {
        category: 'Library',
        name: 'Kaiser Library',
        year: '1907',
        description: 'The first public library in Nepal, established by Kaiser Shumsher Rana with a vast collection of books.',
        imagePath: '/images/first-of-nepal/kaiser-library.jpg'
    },
    {
        category: 'Museum',
        name: 'National Museum of Nepal',
        year: '1928',
        description: 'The first museum in Nepal, opened in Kathmandu to preserve art, history, and culture.',
        imagePath: '/images/first-of-nepal/national-museum.jpg'
    },
 
    {
        category: 'Bank',
        name: 'Nepal Bank Limited',
        year: '1937',
        description: 'The first commercial bank in Nepal, established to modernize financial services.',
        imagePath: '/images/first-of-nepal/nepal-bank-limited.jpg'
    },
   
    {
        category: 'UNESCO World Heritage Site',
        name: 'Kathmandu Valley',
        year: '1979',
        description: 'The first Nepali site listed as a UNESCO World Heritage Site, recognizing its cultural significance.',
        imagePath: '/images/first-of-nepal/kathmandu-valley-unesco.jpg'
    }
];

// Add this new component for the floating image
const FloatingImage = ({ 
    imagePath, 
    name, 
    position 
}: { 
    imagePath: string; 
    name: string; 
    position: { x: number; y: number };
}) => (
    <motion.div
        className="absolute z-50 shadow-lg pointer-events-none"
        style={{ left: position.x, top: position.y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
    >
        <img 
            src={imagePath}
            alt={name}
            className="w-64 h-64 object-cover rounded-lg border-2 border-black"
            onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/first-of-nepal/placeholder.jpg';
            }}
        />
    </motion.div>
);

export default function FirstsOfNepal() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredItem, setHoveredItem] = useState<{
        name: string;
        position: { x: number; y: number };
    } | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);


    const filteredFirsts = nepaliFirsts.filter(
        (item) => {
            const matchesSearch = 
                item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        }
    );

    const clearFilters = () => {
        setSearchTerm('');
    };

    const handleMouseEnter = (item: FirstItem, e: React.MouseEvent<HTMLDivElement>) => {
        if (gridRef.current) {
            const gridRect = gridRef.current.getBoundingClientRect();
            const cardRect = e.currentTarget.getBoundingClientRect();
            
            // Position the image to the right of the card, or left if there's not enough space
            const spaceRight = window.innerWidth - cardRect.right;
            const x = spaceRight > 300 
                ? cardRect.right - gridRect.left + -100
                : cardRect.left - gridRect.left - 265;
            
            const y = cardRect.top - gridRect.top - 150; // Changed from -20 to -30
            
            setHoveredItem({
                name: item.name,
                position: { x, y }
            });
        }
    };

    const t = useTranslations('Translations');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Header */}
                <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="inline text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-blue-700 bg-clip-text text-transparent uppercase tracking-tight">
            {t('firstofNepalTitle')}
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            {t('firstofNepalSubtitle')}
          </p>
        </motion.div>

               {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-col gap-4 items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50 focus:outline-none text-lg transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            {filteredFirsts.length === 0 ? (
              <span>{t('noResults')}</span>
            ) : (
              <span>
                {t(searchTerm ? 'showingResultsFor' : 'showingResults', {
                  count: filteredFirsts.length,
                  searchTerm,
                })}
              </span>
            )}
          </div>
        </div>

<div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative"
    ref={gridRef}
>
    {filteredFirsts.map((item, index) => (
        <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[300px] flex flex-col"
        >
            <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                    <div className="inline-block text-red-800 rounded-full text-sm font-medium">
                        {item.year}
                    </div>
                    <motion.div 
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer relative"
                        onMouseEnter={(e) => handleMouseEnter(item, e)}
                        onMouseLeave={() => setHoveredItem(null)}
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Fix: Use RiCircleLine as a component */}
                        <RiCircleLine size={20} />
                    </motion.div>
                </div>
                <div className="text-xl font-bold text-red-600 uppercase tracking-wide mb-4">
                    First {item.category}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {item.name}
                </h2>
                <p className="text-gray-600 leading-relaxed overflow-hidden text-ellipsis flex-grow">
                    {item.description}
                </p>
                <div className="mt-6 flex gap-4">
                    <Link
                        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(item.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-800 text-sm font-medium"
                    >
                        Wikipedia
                    </Link>
                    <Link
                        href={`https://www.google.com/search?q=${encodeURIComponent(item.name + ' ' + item.category + ' Nepal')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-800 text-sm font-medium"
                    >
                        Google
                    </Link>
                </div>
            </div>
        </motion.div>
    ))}
    {hoveredItem && (
        <FloatingImage 
            imagePath={nepaliFirsts.find(item => item.name === hoveredItem.name)!.imagePath}
            name={hoveredItem.name}
            position={hoveredItem.position}
        />
    )}
</div>

                {/* No Results Message */}
                {filteredFirsts.length === 0 && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('noResults')}</h3>
                    <p className="text-gray-600 mb-6">{t('noMatches', { searchTerm })}</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                    >
                      {t('clearSearch')}
                    </button>
                  </motion.div>
                )}
            </div>
        </div>
    );
}