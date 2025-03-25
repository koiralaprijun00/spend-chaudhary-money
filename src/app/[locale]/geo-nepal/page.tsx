'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { haversineDistance } from '../../components/geo-distance';
import { Location, NEPAL_BOUNDS } from '../../data/geo-nepal/geo-data';
import Link from 'next/link';
import Image from 'next/image';

// Dynamically import the Map component
const Map = dynamic(() => import('../../components/GeoMap').then(mod => mod.default), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 flex items-center justify-center">Loading Map...</div>
});

type GuessLocation = {
  lat: number;
  lng: number;
};

type GameState = 'loading' | 'playing' | 'result' | 'ended';

export default function GeoNepalGame() {
  // Game state
  const [gameState, setGameState] = useState<GameState>('loading');
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [guessedLocation, setGuessedLocation] = useState<GuessLocation | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<GuessLocation | null>(null);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [round, setRound] = useState(1);
  const [timeUpMessage, setTimeUpMessage] = useState('');
  const [maxRounds, setMaxRounds] = useState(5);
  const [usedLocations, setUsedLocations] = useState<(number | string)[]>([]);
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
  const [bounds, setBounds] = useState(NEPAL_BOUNDS);
  const [error, setError] = useState<string | null>(null);

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Add a timeout parameter to the fetch request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('/api/geo-nepal/locations', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch locations: ${response.status}`);
        }
        
        const data = await response.json();
        setLocations(data.locations || []);
        setBounds(data.bounds || NEPAL_BOUNDS);
        
        if (data.locations && data.locations.length > 0) {
          setGameState('playing');
          selectRandomLocation(data.locations);
        } else {
          setError('No locations found. Please try again later.');
          setGameState('playing'); // Show placeholder UI
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('Failed to load game data. Please try again later.');
        setGameState('playing'); // Show placeholder UI
      }
    };
    
    fetchLocations();
  }, []);
  
  // Initialize game with a random location
  useEffect(() => {
    if (gameState === 'playing' && !currentLocation && locations.length > 0) {
      selectRandomLocation(locations);
    }
  }, [gameState, currentLocation, locations]);

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
  
  // Helper functions
  const selectRandomLocation = (availableLocations: Location[]) => {
    // Filter out locations that have already been used
    const unusedLocations = availableLocations.filter(
      loc => !usedLocations.includes(loc.id)
    );
    
    if (unusedLocations.length === 0) {
      setGameState('ended');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * unusedLocations.length);
    setCurrentLocation(unusedLocations[randomIndex]);
    setRemainingTime(30);
    setShowFunFact(false);
  };


  const handleTimeUp = () => {
    if (!currentLocation || gameState !== 'playing') return;
  
    setTimerActive(false);
  
    const offsetLat = currentLocation.lat + 0.1;
    const offsetLng = currentLocation.lng + 0.1;
  
    setSelectedLocation({ lat: offsetLat, lng: offsetLng });
    setGuessedLocation({ lat: offsetLat, lng: offsetLng });
  
    const timeoutDistance = haversineDistance(
      offsetLat, offsetLng,
      currentLocation.lat, currentLocation.lng
    );
  
    setDistance(timeoutDistance);
    setScore(0);
    setTimeUpMessage("⏰ Time's up!");
  
    setGameHistory(prev => [...prev, {
      location: currentLocation,
      guess: { lat: offsetLat, lng: offsetLng },
      score: 0,
      distance: timeoutDistance
    }]);
  
    setGameState('result');
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
    setTimeUpMessage('');
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
    setTimeUpMessage('');
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
  
  // Render component - Using fixed height and preventing overflow
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Head>
        <title>Nepal GeoGuesser</title>
        <meta name="description" content="Test your knowledge of Nepal's geography" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed height header */}
      <header className="bg-white shadow-sm h-16 flex items-center border-b border-gray-200 flex-shrink-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-700 bg-clip-text text-transparent">
              Nepal GeoGuesser
            </h1>
          </div>
          <Link 
            href="/submit-location" 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
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

      {/* Main content with flex-grow */}
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Loading state */}
        {gameState === 'loading' && (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading adventure...</p>
            </div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center bg-red-50 p-8 rounded-lg max-w-md shadow-xl border border-red-200">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-semibold text-red-700 mb-3">Something went wrong</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}
        
        {/* Game content */}
        {!error && gameState !== 'loading' && (
          <>
            {/* Fixed-width side panel with internal scrolling */}
            <div className="w-full lg:w-96 h-full flex-shrink-0 bg-white border-r border-gray-200">
              <div className="h-full overflow-y-auto">
                <div className="p-4">
                  {/* Header with score and round info */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 mb-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-lg">Round: {round}/{maxRounds}</div>
                      <div className="font-semibold text-lg">Score: {totalScore}</div>
                    </div>
                    
                    {gameState === 'playing' && (
                      <div className="mt-3 w-full bg-blue-300 bg-opacity-50 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ease-linear ${
                            remainingTime < 10 ? 'bg-red-400' : 'bg-blue-100'
                          }`}
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
                    <div className="space-y-4">
                      <div className="text-center text-xl font-bold text-gray-800">
                        Where in Nepal?
                      </div>
                      <div className="relative h-56 overflow-hidden rounded-lg shadow-lg border border-gray-100">
                        {!imageError ? (
                          <Image
                            src={currentLocation.imageUrl}
                            alt="Mystery location in Nepal"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                            onError={handleImageError}
                            priority={round === 1}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <p className="text-gray-500">Image could not be loaded</p>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm">
                          Click on the map to select a location
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={handleGuess}
                          disabled={!selectedLocation}
                          className={`py-3 px-4 rounded-lg transition font-bold text-lg ${
                            selectedLocation 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-lg' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {selectedLocation ? 'Make Your Guess' : 'Select a Location First'}
                        </button>
                        
                        {selectedLocation && (
                          <div className="text-center text-sm text-blue-700 animate-pulse">
                            Location selected! Click to guess.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {gameState === 'result' && currentLocation && guessedLocation && (
                    <div className="space-y-4">
                      {timeUpMessage && (
                        <div className="bg-yellow-100 text-yellow-800 text-center p-3 rounded-lg font-semibold shadow-md border border-yellow-200 animate-pulse">
                          {timeUpMessage}
                        </div>
                      )}
                    
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg shadow-lg">
                        <div className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                          {score} points
                        </div>
                        <div className="text-lg text-center text-blue-800 font-medium">
                          Total: {totalScore}
                        </div>
                        <div className="text-sm text-center mt-2 text-gray-700 font-medium flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          Distance: {distance.toFixed(1)} km
                        </div>
                      </div>
                      
                      {/* Location information panel with improved design */}
                      {currentLocation && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                          <h3 className="text-lg font-bold mb-2 text-gray-800">{currentLocation.name}</h3>
                          <div className="bg-blue-50 p-3 rounded-md mb-3 border-l-4 border-blue-400 text-sm">
                            <p className="text-gray-700">{currentLocation.funFact}</p>
                          </div>
                          
                          <div className="flex gap-2 pt-2 border-t border-gray-200 justify-center">
                            <Link
                              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(currentLocation.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100 text-sm"
                              title="Wikipedia"
                            >
                              <Image 
                                src="/wiki-icon.png" 
                                alt="Wikipedia" 
                                width={16} 
                                height={16} 
                                className="w-4 h-4 object-contain mr-1" 
                              />
                              <span>Wikipedia</span>
                            </Link>
                            <Link
                              href={`https://www.google.com/maps/search/${encodeURIComponent(currentLocation.name)}+nepal/@${currentLocation.lat},${currentLocation.lng},12z`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100 text-sm"
                              title="Google Maps"
                            >
                              <Image 
                                src="/google-maps-icon.png" 
                                alt="Google Maps" 
                                width={16} 
                                height={16} 
                                className="w-4 h-4 object-contain mr-1" 
                              />
                              <span>Maps</span>
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={nextRound}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition font-bold"
                      >
                        {round < maxRounds ? "Next Location" : "See Final Results"}
                      </button>
                    </div>
                  )}

                  {gameState === 'ended' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Game Complete!
                      </h2>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg shadow-lg">
                        <div className="text-2xl font-bold text-center text-blue-800 mb-2">
                          Final Score: {totalScore}
                        </div>
                        <div className="text-sm text-center text-gray-700">
                          Out of possible {maxRounds * 5000} points
                        </div>
                        <div className="mt-3 text-center">
                          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                            Accuracy: {getAccuracyPercentage()}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg text-center shadow-md">
                        {totalScore >= maxRounds * 4000 && (
                          <div className="flex flex-col items-center">
                            <span className="text-3xl mb-1">🏆</span>
                            <span className="font-bold text-blue-800">Amazing! You're a Nepal geography expert!</span>
                          </div>
                        )}
                        {totalScore >= maxRounds * 3000 && totalScore < maxRounds * 4000 && (
                          <div className="flex flex-col items-center">
                            <span className="text-3xl mb-1">🥇</span>
                            <span className="font-bold text-blue-800">Great job! You know Nepal very well!</span>
                          </div>
                        )}
                        {totalScore >= maxRounds * 2000 && totalScore < maxRounds * 3000 && (
                          <div className="flex flex-col items-center">
                            <span className="text-3xl mb-1">🥈</span>
                            <span className="font-bold text-blue-800">Good work! You have a decent knowledge of Nepal.</span>
                          </div>
                        )}
                        {totalScore < maxRounds * 2000 && (
                          <div className="flex flex-col items-center">
                            <span className="text-3xl mb-1">🥉</span>
                            <span className="font-bold text-blue-800">Not bad! Play again to improve your Nepal geography skills.</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden shadow-md">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-2 font-semibold text-white text-sm">
                          Journey Summary
                        </div>
                        <div className="max-h-48 overflow-y-auto bg-white">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="py-2 px-2 text-left font-semibold">Location</th>
                                <th className="py-2 px-2 text-right font-semibold">Distance</th>
                                <th className="py-2 px-2 text-right font-semibold">Score</th>
                              </tr>
                            </thead>
                            <tbody>
                              {gameHistory.map((round, index) => (
                                <tr key={index} className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors">
                                  <td className="py-2 px-2">{round.location.name}</td>
                                  <td className="py-2 px-2 text-right">{round.distance.toFixed(1)} km</td>
                                  <td className="py-2 px-2 text-right font-medium">{round.score}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        <button
                          onClick={restartGame}
                          className="flex-1 py-3 px-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition font-bold text-sm"
                        >
                          <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Play Again
                          </span>
                        </button>
                        
                        <Link 
                          href="/submit-location" 
                          className="flex-1 flex items-center justify-center py-3 px-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition font-bold text-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Your Location 
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full-width map with flex-grow to fill available space */}
            <div className="flex-grow h-full min-h-[50vh] lg:min-h-0">
              <Map 
                guessMode={gameState === 'playing'}
                onSelect={setSelectedLocation}
                actualLocation={currentLocation}
                guessedLocation={guessedLocation}
                bounds={bounds}
                selectedLocation={selectedLocation}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}