import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-200 dark:bg-pink-700 opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-yellow-200 dark:bg-yellow-700 opacity-20 rounded-full animate-float-delay"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-purple-200 dark:bg-purple-700 opacity-20 rounded-full animate-float-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-orange-200 dark:bg-orange-700 opacity-20 rounded-full animate-float-slower"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Header Section - Enhanced with animation */}
        <div className="py-1 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-red-300 dark:from-orange-600 dark:to-red-600 rounded-full blur-lg opacity-60 scale-100 animate-pulse"></div>
            <Image 
              src="/images/momo-header.png" 
              alt="Piromomo Logo" 
              width={160} 
              height={160} 
              className="relative z-10 drop-shadow-xl hover:scale-105 transition-transform duration-300" 
            />
          </div>
          <h1 className="mt-0 text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            Piromomo!
          </h1>
          <p className="mt-3 text-center text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300">
            <span className="inline-block animate-bounce-light delay-100">🌶️</span> Spicy Momo Fixes Everything <span className="inline-block animate-bounce-light">🌶️</span>
          </p>
        </div>

        {/* Fun Card Section - Improved layout for all screen sizes */}
        <div className="w-full my-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {/* Spend Binod Chaudhary's Money Card - Enhanced */}
          <Link href="/spend" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-3xl">
            <div className="relative px-6 py-8 h-full bg-gradient-to-br from-purple-600 to-pink-500 dark:from-purple-700 dark:to-pink-600 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              {/* Interactive money pattern with animation */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute top-4 left-4 text-4xl group-hover:animate-float">💰</div>
                <div className="absolute top-1/2 left-1/4 text-4xl group-hover:animate-float-delay">💸</div>
                <div className="absolute bottom-8 left-6 text-4xl group-hover:animate-float-slow">💵</div>
                <div className="absolute top-8 right-6 text-4xl group-hover:animate-float">💎</div>
                <div className="absolute bottom-10 right-10 text-4xl group-hover:animate-float-delay">🪙</div>
              </div>
              
              {/* Enhanced Badge */}
              <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-bold text-xs py-1 px-3 rounded-full shadow-md flex items-center gap-1 transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="text-yellow-500 animate-pulse">💰</span>
                <span>BILLIONAIRE</span>
              </div>
              
              {/* Main content */}
              <div className="flex items-center relative z-10">
                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md mr-4 group-hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:from-yellow-300 group-hover:to-yellow-500 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">$</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">Spend Binod Chaudhary's Money</h2>
                  <p className="mt-1 text-white text-opacity-90">How would you spend billions?</p>
                </div>
              </div>
              
              {/* Enlarged and enhanced Binod image with animation */}
              <div className="absolute -bottom-4 -right-2 transform group-hover:translate-y-[-8px] transition-transform duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image 
                    src="/binod-transparent.png" 
                    alt="Binod Chaudhary" 
                    width={160} 
                    height={160} 
                    className="relative z-10" 
                  />
                </div>
              </div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 opacity-20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              <div className="absolute -bottom-12 left-1/4 w-24 h-24 bg-pink-300 opacity-20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
            </div>
          </Link>

          {/* Guess the Festival Card - Enhanced */}
          <Link href="/guess-festival" className="block transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-orange-300 rounded-3xl">
            <div className="relative px-6 py-8 h-full bg-gradient-to-br from-orange-500 to-yellow-400 dark:from-orange-600 dark:to-yellow-500 rounded-3xl shadow-xl transition-transform duration-300 overflow-hidden group">
              {/* Enhanced Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-300 dark:bg-yellow-400 rounded-full opacity-40 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-300 dark:bg-orange-500 rounded-full opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500"></div>

              
              {/* Enhanced Badge */}
              <div className="absolute top-3 left-3 bg-white dark:bg-yellow-100 text-orange-600 font-bold text-xs py-1 px-3 rounded-full shadow-md transform rotate-3 hover:rotate-0 transition-transform flex items-center gap-1">
                <span className="text-sm animate-pulse">✨</span>
                <span>QUIZ</span>
              </div>
              
              {/* Content with improved spacing */}
              <div className="flex flex-col items-center text-center relative z-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">Guess the Festival</h2>
                <p className="mt-2 text-white text-opacity-90 font-medium">Test your Nepali festival knowledge!</p>
                
                {/* Enhanced Image with Prominent Frame and animations */}
                <div className="mt-6 relative">
                  {/* Improved outer glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-xl opacity-70 scale-125 animate-pulse group-hover:opacity-90 group-hover:scale-130 transition-all duration-500"></div>
                  
                  {/* Enhanced rotating ring animation */}
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-white opacity-60 scale-110 animate-spin-slow group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* ENLARGED image with enhanced border and hover effect */}
                  <Image
                    src="/festival-header.jpg"
                    alt="Festival Celebration"
                    width={180}
                    height={180}
                    className="rounded-full border-4 border-white shadow-lg relative z-10 object-cover group-hover:border-yellow-200 transition-colors duration-300"
                  />
                  
                  {/* Enhanced inner highlight */}
                  <div className="absolute inset-0 rounded-full border-8 border-white opacity-30 scale-105 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
              
              {/* Enhanced Pattern Overlay with interactivity */}
              <div className="absolute inset-0 bg-repeat opacity-10 group-hover:opacity-15 transition-opacity duration-300" style={{ 
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" 
              }}></div>
            </div>
          </Link>
        </div>

        {/* Content Separator with visual element */}
        <div className="w-full flex justify-center my-8">
          <div className="relative w-3/4 max-w-md h-1 bg-gradient-to-r from-transparent via-orange-300 dark:via-orange-500 to-transparent">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
              <span className="text-2xl">🍜</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


