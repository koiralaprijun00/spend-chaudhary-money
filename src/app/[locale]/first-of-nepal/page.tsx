'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { RiCircleLine } from 'react-icons/ri';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import AdSenseGoogle from '../../components/AdSenseGoogle'; // Import AdSense component

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

interface FirstItem {
    id: string;
    category: string;
    name: string;
    year: string;
    description: string;
    imagePath: string;
}

export default function FirstsOfNepal() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredItem, setHoveredItem] = useState<{
        name: string;
        position: { x: number; y: number };
    } | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // For UI translations
    const mainT = useTranslations('Translations');
    // For First of Nepal data
    const t = useTranslations('firstsOfNepal');
    
    // Get items from translations
    const itemKeys = Object.keys(t.raw('items'));
    
    const firstItems = itemKeys.map(key => ({
        id: key,
        category: t(`items.${key}.category`),
        name: t(`items.${key}.name`),
        year: t(`items.${key}.year`),
        description: t(`items.${key}.description`),
        imagePath: t(`items.${key}.imagePath`)
    }));

    // Filter using the translated items
    const filteredFirsts = firstItems.filter(
        (item) => {
            const matchesSearch = 
                item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        }
    );

    const handleMouseEnter = (item: FirstItem, e: React.MouseEvent<HTMLDivElement>) => {
        if (gridRef.current) {
            const gridRect = gridRef.current.getBoundingClientRect();
            const cardRect = e.currentTarget.getBoundingClientRect();
            
            // Position the image to the right of the card, or left if there's not enough space
            const spaceRight = window.innerWidth - cardRect.right;
            const x = spaceRight > 300 
                ? cardRect.right - gridRect.left + -100
                : cardRect.left - gridRect.left - 265;
            
            const y = cardRect.top - gridRect.top - 150;
            
            setHoveredItem({
                name: item.name,
                position: { x, y }
            });
        }
    };

    return (
        <div className="min-h-screen w-full">
            {/* Main layout with sidebars */}
            <div className="flex justify-center">
                {/* Left sidebar ad - hidden on mobile */}
                <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] ml-4">
                    <div className="w-[160px] h-[600px]">
                        <AdSenseGoogle
                            adSlot="6865219846" // Use your actual left sidebar ad slot ID
                            adFormat="vertical"
                            style={{ width: '160px', height: '400px' }}
                        />
                    </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 bg-gray-50">
                    <div className="container mx-auto px-4 py-16">
                        {/* Hero Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16 text-center"
                        >
                            <h1 className="inline text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-600 to-blue-700 bg-clip-text text-transparent uppercase tracking-tight">
                                {mainT('firstofNepalTitle')}
                            </h1>
                            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                                {mainT('firstofNepalSubtitle')}
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
                                        placeholder={mainT('searchPlaceholder')}
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
                                    <span>{mainT('noResults')}</span>
                                ) : (
                                    <span>
                                        {mainT(searchTerm ? 'showingResultsFor' : 'showingResults', {
                                        count: filteredFirsts.length,
                                        searchTerm,
                                        })}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
                            ref={gridRef}
                        >
                            {filteredFirsts.map((item, index) => (
                                <motion.div
                                    key={item.id}
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
                                                <RiCircleLine size={20} />
                                            </motion.div>
                                        </div>
                                        <div className="text-xl font-bold text-red-600 uppercase tracking-wide mb-4">
                                        {mainT('First')} {item.category}
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
                                    imagePath={firstItems.find(item => item.name === hoveredItem.name)?.imagePath || ''}
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
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{mainT('noResults')}</h3>
                                <p className="text-gray-600 mb-6">{mainT('noMatches', { searchTerm })}</p>
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                                >
                                    {mainT('clearSearch')}
                                </button>
                            </motion.div>
                        )}
                        
                    </div>
                </div>
                
                {/* Right sidebar ad - hidden on mobile */}
                <div className="hidden lg:block w-[160px] sticky top-24 self-start h-[600px] mr-4">
                    <div className="w-[160px] h-[600px]">
                        <AdSenseGoogle 
                            adSlot="9978468343" // Use your actual right sidebar ad slot ID
                            adFormat="vertical"
                            style={{ width: '160px', height: '400px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}