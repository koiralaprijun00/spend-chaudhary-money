// data/locations.ts

// Define the Location type
export type Location = {
    id: number | string;
    name: string;
    lat: number;
    lng: number;
    imageUrl: string;
    funFact: string;
    submittedBy?: string; // Optional field to track user submissions
  };

  export type NepalLocation = {
    id: string | number;
    name: string;
    lat: number;
    lng: number;
    imageUrl: string;
    funFact: string;
  };
  
  // Define the Nepal bounds
  export const NEPAL_BOUNDS = {
    southwest: { lat: 26.3478, lng: 80.0884 },
    northeast: { lat: 30.4469, lng: 88.2037 }
  };
  
  // Define the official locations data
  export const OFFICIAL_LOCATIONS: Location[] = [
    {
      id: 1,
      name: 'Kathmandu Durbar Square',
      lat: 27.7042,
      lng: 85.3076,
      imageUrl: '/images/geo-nepal/kathmandu.jpg',
      funFact: 'Kathmandu Durbar Square was constructed in the 3rd century by the Licchavi dynasty.\nIt features temples and palaces dating back to the 12th century, showcasing ancient architecture.'
    },
    {
      id: 2,
      name: 'Pokhara Lakeside',
      lat: 28.2090,
      lng: 83.9550,
      imageUrl: '/images/geo-nepal/pokhara.jpg',
      funFact: 'Phewa Lake is the second largest lake in Nepal, stretching over 4 square kilometers.\nIt has a small island with the Tal Barahi Temple, a popular spot for boaters.'
    },
    {
      id: 3,
      name: 'Bhaktapur',
      lat: 27.6722,
      lng: 85.4280,
      imageUrl: '/images/geo-nepal/bhaktapur.jpg',
      funFact: 'Bhaktapur is renowned for its unique Juju Dhau, a creamy yogurt made from buffalo milk.\nThe city’s pottery and woodcarving traditions also draw visitors to its historic squares.'
    },
    {
      id: 4,
      name: 'Nagarkot',
      lat: 27.7155,
      lng: 85.5205,
      imageUrl: '/images/geo-nepal/nagarkot.jpg',
      funFact: 'Nagarkot sits at 2,175 meters, offering stunning Himalayan vistas on clear days.\nYou can catch a glimpse of Mount Everest, 140 kilometers away, from its viewpoints.'
    },
    {
      id: 5,
      name: 'Lumbini',
      lat: 27.4699,
      lng: 83.2756,
      imageUrl: '/images/geo-nepal/lumbini.jpg',
      funFact: 'Lumbini is the birthplace of Siddhartha Gautama, marked by a stone in the Maya Devi Temple.\nThe sacred garden also features an Ashokan Pillar from 249 BCE, a UNESCO site.'
    }
];



  // In a production app, you would fetch this from your database
  // This would hold the approved user submissions
  export const USER_SUBMITTED_LOCATIONS: Location[] = [
    // Example of what a user-submitted location might look like after approval
    {
      id: 'user-1',
      name: 'Rara Lake',
      lat: 29.5275,
      lng: 82.0891,
      imageUrl: '/images/user-submissions/rara-lake.jpg',
      funFact: 'Rara Lake is the largest and deepest freshwater lake in Nepal, located at an altitude of 2,990 m (9,810 ft).',
      submittedBy: 'nepal_traveler'
    },
    {
      id: 'user-2',
      name: 'Upper Mustang',
      lat: 29.1892,
      lng: 83.9586,
      imageUrl: '/images/user-submissions/upper-mustang.jpg',
      funFact: 'Upper Mustang was a restricted demilitarized area until 1992, which helped preserve its Tibetan Buddhist culture.',
      submittedBy: 'mountain_explorer'
    }
  ];
  
  // Combine official and user-submitted locations for the game
  export const NEPAL_LOCATIONS: Location[] = [...OFFICIAL_LOCATIONS, ...USER_SUBMITTED_LOCATIONS];
  
  // Function to get location by ID
  export function getLocationById(id: number | string): Location | undefined {
    return NEPAL_LOCATIONS.find(location => location.id === id);
  }
  
  // Function to filter locations by various criteria
  export function filterLocations(options: {
    isUserSubmitted?: boolean;
    limit?: number;
    excludeIds?: (number | string)[];
  }): Location[] {
    let filtered = NEPAL_LOCATIONS;
    
    if (options.isUserSubmitted !== undefined) {
      filtered = options.isUserSubmitted 
        ? USER_SUBMITTED_LOCATIONS 
        : OFFICIAL_LOCATIONS;
    }
    
    if (options.excludeIds && options.excludeIds.length > 0) {
      filtered = filtered.filter(loc => !options.excludeIds?.includes(loc.id));
    }
    
    if (options.limit) {
      filtered = filtered.slice(0, options.limit);
    }
    
    return filtered;
  }