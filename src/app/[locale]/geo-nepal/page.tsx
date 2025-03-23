'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { haversineDistance } from '../../components/geo-distance';
import { Location, NEPAL_LOCATIONS, NEPAL_BOUNDS } from '../../data/geo-nepal/geo-data';
import Link from 'next/link';
import Image from 'next/image';

const Map = dynamic(() => import('../../components/GeoMap').then(mod => mod.default), { ssr: false });

type GuessLocation = {
  lat: number;
  lng: number;
};

type GameState = 'playing' | 'result' | 'ended';

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [guessedLocation, setGuessedLocation] = useState<GuessLocation | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<GuessLocation | null>(null);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(5);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [usedLocations, setUsedLocations] = useState<(number | string)[]>(() => []);
  const [remainingTime, setRemainingTime] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [distance, setDistance] = useState(0);
  const [showFunFact, setShowFunFact] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [gameHistory, setGameHistory] = useState<Array<{
    location: Location;
    guess: GuessLocation;
    score: number;
    distance: number;
  }>>([]);

  // Initialize game with a random location
  useEffect(() => {
    if (gameState === 'playing' && !currentLocation) {
      selectRandomLocation();
    }
  }, [gameState, currentLocation]);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (gameState === 'playing' && timerActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && gameState === 'playing') {
      handleTimeUp();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, remainingTime, timerActive]);

  // Start timer when location is loaded
  useEffect(() => {
    if (currentLocation && gameState === 'playing') {
      setTimerActive(true);
      setImageError(false);
    }
  }, [currentLocation, gameState]);

  const handleTimeUp = () => {
    if (!currentLocation || selectedLocation) return;
    
    const randomLat = NEPAL_BOUNDS.southwest.lat + 
      Math.random() * (NEPAL_BOUNDS.northeast.lat - NEPAL_BOUNDS.southwest.lat);
    const randomLng = NEPAL_BOUNDS.southwest.lng + 
      Math.random() * (NEPAL_BOUNDS.northeast.lng - NEPAL_BOUNDS.southwest.lng);
    
    setSelectedLocation({ lat: randomLat, lng: randomLng });
    handleGuess();
  };

  const selectRandomLocation = () => {
    const availableLocations = NEPAL_LOCATIONS.filter(
      loc => !usedLocations.includes(loc.id)
    );
    
    if (availableLocations.length === 0) {
      setGameState('ended');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableLocations.length);
    setCurrentLocation(availableLocations[randomIndex]);
    setRemainingTime(30);
    setShowFunFact(false);
  };

  const handleGuess = () => {
    if (gameState !== 'playing' || !currentLocation || !selectedLocation) return;
    
    setTimerActive(false);
    setGuessedLocation(selectedLocation);
    
    const calculatedDistance = haversineDistance(
      selectedLocation.lat, selectedLocation.lng,
      currentLocation.lat, currentLocation.lng
    );
    
    setDistance(calculatedDistance);
    
    let roundScore = Math.max(0, Math.round(5000 - (calculatedDistance * 10)));
    const timeBonus = Math.max(0, remainingTime) / 30 * 0.2;
    roundScore = Math.round(roundScore * (1 + timeBonus));
    
    setScore(roundScore);
    setTotalScore(prevTotal => prevTotal + roundScore);
    
    setGameHistory(prev => [...prev, {
      location: currentLocation,
      guess: selectedLocation,
      score: roundScore,
      distance: calculatedDistance
    }]);
    
    setGameState('result');
  };

  const toggleFunFact = () => {
    setShowFunFact(prev => !prev);
  };

  const nextRound = () => {
    if (round >= maxRounds) {
      setGameState('ended');
      return;
    }
    
    if (currentLocation) {
      setUsedLocations(prev => [...prev, currentLocation.id]);
    }
    setRound(prev => prev + 1);
    setCurrentLocation(null);
    setGuessedLocation(null);
    setSelectedLocation(null);
    setScore(0);
    setGameState('playing');
  };

  const restartGame = () => {
    setRound(1);
    setTotalScore(0);
    setUsedLocations([]);
    setCurrentLocation(null);
    setGuessedLocation(null);
    setSelectedLocation(null);
    setScore(0);
    setGameState('playing');
    setTimerActive(false);
    setRemainingTime(30);
    setShowFunFact(false);
    setGameHistory([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  const getAccuracyPercentage = () => {
    if (gameHistory.length === 0) return 0;
    
    const maxPossibleDistance = 500;
    const avgDistance = gameHistory.reduce((sum, round) => sum + round.distance, 0) / gameHistory.length;
    
    const accuracyPercentage = Math.max(0, 100 - (avgDistance / maxPossibleDistance * 100));
    return Math.round(accuracyPercentage);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Nepal GeoGuesser</title>
        <meta name="description" content="Test your knowledge of Nepal's geography" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Nepal GeoGuesser</h1>
          <Link 
            href="/submit-location" 
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Submit a Location
          </Link>
        </div>
      </header>

      <main className="container mx-auto pt-4 max-w-8xl relative">
        {/* Full-width map */}
        <div className="h-[calc(100vh-12rem)] w-full">
          <Map 
            guessMode={gameState === 'playing'}
            onSelect={setSelectedLocation}
            actualLocation={currentLocation}
            guessedLocation={guessedLocation}
            bounds={NEPAL_BOUNDS}
            selectedLocation={selectedLocation}
          />
        </div>
        
        {/* Improved overlay panel with enhanced design */}
        <div className="absolute top-6 left-4 w-full max-w-sm z-10">
          <div className="ml-4 mt-4 bg-gray-100  rounded-lg overflow-hidden shadow-xl bg-opacity-0 backdrop-blur-sm ">
            <div className="px-5 py-5">
              {/* Header with score and round info */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 mb-5 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-lg">Round: {round}/{maxRounds}</div>
                  <div className="font-semibold text-lg">Score: {totalScore}</div>
                </div>
                
                {gameState === 'playing' && (
                  <div className="mt-3 w-full bg-blue-300 bg-opacity-50 rounded-full h-3">
                    <div 
                      className="bg-blue-100 h-3 rounded-full transition-all duration-1000 ease-linear"
                      style={{ width: `${(remainingTime / 30) * 100}%` }} 
                    ></div>
                  </div>
                )}
                
                {gameState === 'playing' && (
                  <div className="mt-1 text-center font-mono text-lg">
                    {formatTime(remainingTime)}
                  </div>
                )}
              </div>

              {gameState === 'playing' && currentLocation && (
                <div className="space-y-5">
                  <div className="text-center text-xl font-semibold text-gray-800">
                    Where in Nepal is this location?
                  </div>
                  <div className="relative h-60 overflow-hidden rounded-lg shadow-md border border-gray-300">
                    {!imageError ? (
                      <Image
                        src={currentLocation.imageUrl}
                        alt="Mystery location in Nepal"
                        fill
                        className="object-cover"
                        onError={handleImageError}
                        priority={round === 1}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <p className="text-gray-500">Image could not be loaded</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="text-center mb-1 text-gray-600">
                      Click on the map to select a location, then press Guess!
                    </div>
                    <button
                      onClick={handleGuess}
                      disabled={!selectedLocation}
                      className={`py-3 px-4 rounded-md transition font-medium ${
                        selectedLocation 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      Make Your Guess
                    </button>
                  </div>
                </div>
              )}

              {gameState === 'result' && currentLocation && guessedLocation && (
                <div className="space-y-5">
                  <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-center text-blue-800 mb-2">Score: {score}</div>
                    <div className="text-lg text-center text-blue-600">Total: {totalScore}</div>
                    <div className="text-md text-center mt-2 text-gray-700 font-medium">
                      Distance: {distance.toFixed(1)} km
                    </div>
                  </div>
                  
                  {/* Location information panel */}
                  {currentLocation && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-bold mb-2 text-gray-800">{currentLocation.name}</h3>
                      <p className="text-sm text-gray-700 mb-3">{currentLocation.funFact}</p>
                      
                      <div className="flex gap-2 pt-2 border-t border-gray-200 justify-center">
                        <Link
                          href={`https://en.wikipedia.org/wiki/${encodeURIComponent(currentLocation.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                          title="Wikipedia"
                        >
                          <Image 
                            src="/wiki-icon.png" 
                            alt="Wikipedia" 
                            width={20} 
                            height={20} 
                            className="w-5 h-5 object-contain" 
                          />
                        </Link>
                        <Link
                          href={`https://www.google.com/maps/search/${encodeURIComponent(currentLocation.name)}+nepal/@${currentLocation.lat},${currentLocation.lng},12z`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                          title="Google Maps"
                        >
                          <Image 
                            src="/google-maps-icon.png" 
                            alt="Google Maps" 
                            width={20} 
                            height={20} 
                            className="w-5 h-5 object-contain" 
                          />
                        </Link>
                        <Link
                          href={`https://www.tripadvisor.com/Search?q=${encodeURIComponent(currentLocation.name)}%20nepal`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                          title="TripAdvisor"
                        >
                          <Image 
                            src="/trip-logo.png" 
                            alt="Trip Advisor" 
                            width={20} 
                            height={20} 
                            className="w-5 h-5 object-contain" 
                          />
                        </Link>
                        <Link
                          href={`https://www.google.com/search?q=${encodeURIComponent(currentLocation.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                          title="Travel Guide"
                        >
                          <Image 
                            src="/google-icon.webp" 
                            alt="Google Icon" 
                            width={20} 
                            height={20} 
                            className="w-5 h-5 object-contain" 
                          />
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={nextRound}
                    className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md font-medium"
                  >
                    {round < maxRounds ? "Next Round" : "See Final Results"}
                  </button>
                </div>
              )}

              {gameState === 'ended' && (
                <div className="space-y-6 py-4">
                  <h2 className="text-3xl font-bold text-center text-blue-800">Game Over!</h2>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-lg shadow-md">
                    <div className="text-2xl font-bold text-center text-blue-800 mb-2">
                      Final Score: {totalScore}
                    </div>
                    <div className="text-md text-center text-gray-700">
                      Max possible: {maxRounds * 5000}
                    </div>
                    <div className="mt-3 text-center">
                      <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                        Accuracy: {getAccuracyPercentage()}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg text-center shadow-sm">
                    {totalScore >= maxRounds * 4000 && "Amazing! You're a Nepal geography expert! 🏆"}
                    {totalScore >= maxRounds * 3000 && totalScore < maxRounds * 4000 && "Great job! You know Nepal very well! 🥇"}
                    {totalScore >= maxRounds * 2000 && totalScore < maxRounds * 3000 && "Good work! You have a decent knowledge of Nepal. 🥈"}
                    {totalScore < maxRounds * 2000 && "Not bad! Play again to improve your Nepal geography skills. 🥉"}
                  </div>
                  
                  <div className="border rounded-md overflow-hidden shadow-sm">
                    <div className="bg-gray-100 px-4 py-3 font-semibold text-gray-700">Game Summary</div>
                    <div className="p-3 max-h-64 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-2 px-2 text-left">Location</th>
                            <th className="py-2 px-2 text-right">Distance</th>
                            <th className="py-2 px-2 text-right">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gameHistory.map((round, index) => (
                            <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                              <td className="py-2 px-2">{round.location.name}</td>
                              <td className="py-2 px-2 text-right">{round.distance.toFixed(1)} km</td>
                              <td className="py-2 px-2 text-right font-medium">{round.score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={restartGame}
                      className="flex-1 py-3 px-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md font-medium"
                    >
                      Play Again
                    </button>
                    
                    <Link 
                      href="/location-submission" 
                      className="flex-1 flex items-center justify-center py-3 px-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-md font-medium"
                    >
                      Add Your Location 
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}