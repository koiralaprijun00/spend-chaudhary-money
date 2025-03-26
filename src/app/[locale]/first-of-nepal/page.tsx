'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { RiCircleLine } from 'react-icons/ri';
import Link from 'next/link';

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
        category: 'Constitutional Expert',
        name: 'Ganesh Raj Sharma',
        year: '1948',
        description: 'First constitutional law expert of Nepal.',
        imagePath: '/images/first-of-nepal/ganesh-raj-sharma.jpg'
    },
    {
        category: 'Astronomer',
        name: 'Hari Prasad Shrestha',
        year: '1975',
        description: 'First Nepali astronomer to map the night sky from the Himalayas.',
        imagePath: '/images/first-of-nepal/hari-prasad-shrestha.jpg'
    },
    {
        category: 'Environmentalist',
        name: 'Maya Gurung',
        year: '1989',
        description: 'First Nepali woman to lead a national conservation initiative.',
        imagePath: '/images/first-of-nepal/maya-gurung.jpg'
    },
    {
        category: 'Software Engineer',
        name: 'Rajan Karki',
        year: '1995',
        description: 'First Nepali to develop an internationally recognized software application.',
        imagePath: '/images/first-of-nepal/rajan-karki.jpg'
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
        category: 'Wildlife Conservationist',
        name: 'Rameshwor Bohara',
        year: '1994',
        description: 'First Nepali to establish a sanctuary for endangered Himalayan species.',
        imagePath: '/images/first-of-nepal/rameshwor-bohara.jpg'
    },
    {
        category: 'Female Radio Host',
        name: 'Lila Gurung',
        year: '1970',
        description: 'First Nepali woman to host a radio program broadcast nationwide.',
        imagePath: '/images/first-of-nepal/lila-gurung.jpg'
    },
    {
        category: 'Video Game Developer',
        name: 'Santosh Karki',
        year: '2017',
        description: 'First Nepali to develop a video game released on an international platform.',
        imagePath: '/images/first-of-nepal/santosh-karki.jpg'
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
        category: 'Digital Artist',
        name: 'Pradeep Rai',
        year: '2013',
        description: 'First Nepali digital artist to have work featured in an international animation festival.',
        imagePath: '/images/first-of-nepal/pradeep-rai.jpg'
    },
    {
        category: 'Female Mountaineering Instructor',
        name: 'Dawa Yangzum Sherpa',
        year: '2012',
        description: 'First Nepali woman certified as an international mountaineering guide.',
        imagePath: '/images/first-of-nepal/dawa-yangzum-sherpa.jpg'
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 uppercase tracking-tight">
                        <span className="text-red-600">Firsts</span> of Nepal
                    </h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                        Exploring the pioneering individuals who shaped Nepal's history with their 
                        groundbreaking achievements and remarkable firsts.
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
                                placeholder="Search by name, category, or description..."
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
                            <span>No results found</span>
                        ) : (
                            <span>Showing {filteredFirsts.length} results {searchTerm && `for "${searchTerm}"`}</span>
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
                <div className="text-xl font-bold text-red-600 uppercase tracking-wide mb-2">
                    First {item.category}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
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
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                        <p className="text-gray-600 mb-6">
                            We couldn't find any matches for "{searchTerm}".
                        </p>
                        <button 
                            onClick={clearFilters}
                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                        >
                            Clear search
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}