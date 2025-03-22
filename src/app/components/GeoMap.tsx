'use client'

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapPin } from "react-icons/fa";
import { createRoot } from 'react-dom/client';
import { Location } from '../data/geo-nepal/geo-data'; // Import the Location type
import Link from 'next/link';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1Ijoia3ByaWp1biIsImEiOiJjajd4OHVweTYzb2l1MndvMzlvdm90c2ltIn0.J25C2fbC1KpcqIRglAh4sA';
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

type MapProps = {
  guessMode: boolean;
  onSelect: (latlng: { lat: number; lng: number } | null) => void;
  actualLocation?: Location | null; // Use the imported Location type
  guessedLocation?: { lat: number; lng: number } | null;
  selectedLocation?: { lat: number; lng: number } | null;
  bounds: {
    southwest: { lat: number; lng: number };
    northeast: { lat: number; lng: number };
  };
};

const GeoMap = ({ 
  guessMode, 
  onSelect, 
  actualLocation, 
  guessedLocation,
  selectedLocation,
  bounds 
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const infoContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Create marker elements with FaMapPin or PNG based on type
  const createMarkerElement = (type: 'guess' | 'actual' | 'selection') => {
    if (type === 'actual') {
      // Use PNG image for actual location
      const el = document.createElement('div');
      el.className = 'actual-marker-element';
      el.style.backgroundImage = 'url(/correct-answer.png)'; // Adjust path as needed
      el.style.width = '45px'; // Adjust size as needed
      el.style.height = '45px'; // Adjust size as needed
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundPosition = 'center';
      return el;
    }

    // Use FaMapPin for guess and selection
    let color;
    switch (type) {
      case 'guess':
        color = '#0c56b0'; // Blue for user's guess
        break;
      case 'selection':
        color = '#0c56b0'; // Blue for selection
        break;
    }
    
    // Create DOM element for the marker
    const el = document.createElement('div');
    el.className = `${type}-marker-element`;
    el.style.fontSize = '30px'; // Control the size of the icon
    
    // Create a React root and render the FaMapPin component
    const root = createRoot(el);
    root.render(<FaMapPin color={color} />);
    
    return el;
  };
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    if (!map.current) {
      const nepalCenter: [number, number] = [84.1240, 28.3949];
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: nepalCenter,
        zoom: 6.5,
        maxBounds: [
          [bounds.southwest.lng, bounds.southwest.lat],
          [bounds.northeast.lng, bounds.northeast.lat]
        ]
      });
      
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setMapLoaded(true);
        if (!map.current!.getSource('mapbox-dem')) {
          map.current!.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });
          map.current!.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        }
      });
      
      map.current.addControl(new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }), 'bottom-left');
      map.current.addControl(new mapboxgl.FullscreenControl());
    }

    return () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
    };
  }, [bounds]);

  // Handle map clicks in guess mode
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      if (guessMode) {
        const { lng, lat } = e.lngLat;
        
        // Remove any existing selection marker
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Add new marker at clicked location
        const selectionEl = createMarkerElement('selection');
        const selectMarker = new mapboxgl.Marker({ element: selectionEl, anchor: 'bottom' })
          .setLngLat([lng, lat])
          .addTo(map.current!);
        markers.current.push(selectMarker);

        // Update selected location
        onSelect({ lat, lng });
      }
    };

    if (guessMode) {
      map.current.on('click', handleClick);
    }

    return () => {
      if (map.current) {
        map.current.off('click', handleClick);
      }
    };
  }, [mapLoaded, guessMode, onSelect]);

  // Show result markers and line
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Clear any existing line
    if (map.current.getLayer('guess-line')) {
      map.current.removeLayer('guess-line');
    }
    if (map.current.getSource('line-source')) {
      map.current.removeSource('line-source');
    }

    // Show guess and actual markers in result mode
    if (!guessMode && actualLocation && guessedLocation) {
      // Guess marker
      const guessEl = createMarkerElement('guess');
      const guessMarker = new mapboxgl.Marker({ element: guessEl, anchor: 'bottom' })
        .setLngLat([guessedLocation.lng, guessedLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Your guess</p>'))
        .addTo(map.current);
      markers.current.push(guessMarker);

      // Actual location marker
      const actualEl = createMarkerElement('actual');
      const actualMarker = new mapboxgl.Marker({ element: actualEl, anchor: 'bottom' })
        .setLngLat([actualLocation.lng, actualLocation.lat])
        .addTo(map.current);
      markers.current.push(actualMarker);

      // Add a line between the guess and actual location
      map.current.addSource('line-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [guessedLocation.lng, guessedLocation.lat],
              [actualLocation.lng, actualLocation.lat]
            ]
          }
        }
      });

      map.current.addLayer({
        id: 'guess-line',
        type: 'line',
        source: 'line-source',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 2.5,
          'line-dasharray': [2, 1]
        }
      });

      // Fit bounds to show both markers
      const bounds = new mapboxgl.LngLatBounds()
        .extend([guessedLocation.lng, guessedLocation.lat])
        .extend([actualLocation.lng, actualLocation.lat]);
      map.current.fitBounds(bounds, { padding: 70 });
    }
  }, [mapLoaded, guessMode, actualLocation, guessedLocation]);

  // Show selection marker in guess mode
  useEffect(() => {
    if (!map.current || !mapLoaded || !guessMode) return;

    // Clear existing markers to avoid duplicates
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    if (selectedLocation) {
      // Create and add selection marker
      const selectionEl = createMarkerElement('selection');
      const selectMarker = new mapboxgl.Marker({ element: selectionEl, anchor: 'bottom' })
        .setLngLat([selectedLocation.lng, selectedLocation.lat])
        .addTo(map.current);
      markers.current.push(selectMarker);
    }
  }, [mapLoaded, guessMode, selectedLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {!guessMode && actualLocation && (
  <div 
    className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-md shadow-md max-w-xs"
    ref={infoContainerRef}
  >
    <h3 className="text-base font-bold mb-1">{actualLocation.name}</h3>
    <p className="text-sm text-gray-700 mb-2">{actualLocation.funFact}</p>
  

    <div className="flex gap-2 mt-3 pt-2 border-t border-gray-200 justify-start">
  <Link 
    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(actualLocation.name)}`}
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
    title="Wikipedia"
  >
    <img src="/wiki-logo.png" alt="Wikipedia" className="w-4 h-4 object-contain" />
  </Link>
  
  <Link 
    href={`https://www.google.com/maps/search/${encodeURIComponent(actualLocation.name)}+nepal/@${actualLocation.lat},${actualLocation.lng},12z`}
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
    title="Google Maps"
  >
    <img src="/google-maps-logo.png" alt="Google Maps" className="w-4 h-4 object-contain" />
  </Link>
  
  <Link 
    href={`https://www.tripadvisor.com/Search?q=${encodeURIComponent(actualLocation.name)}%20nepal`}
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
    title="TripAdvisor"
  >
    <img src="/trip-logo.svg" alt="TripAdvisor" className="w-4 h-4 object-contain" />
  </Link>
  
  <Link 
    href={`https://www.google.com/search?q=${encodeURIComponent(actualLocation.name)}+nepal+travel+guide`}
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
    title="Travel Guide"
  >
    <img src="/google-logo.png" alt="Google Search" className="w-4 h-4 object-contain" />
  </Link>
</div>
  </div>
)}
    </div>
  );
};

export default GeoMap;