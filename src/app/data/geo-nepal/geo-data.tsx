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
    },
    {
      id: 'user-3',
      name: 'Chitwan National Park',
      lat: 27.5291,
      lng: 84.4531,
      imageUrl: '/images/user-submissions/chitwan.jpg',
      funFact: 'Chitwan is home to over 700 species of wildlife, including the endangered Bengal tiger and one-horned rhinoceros.',
      submittedBy: 'wildlife_wanderer'
    },
    {
      id: 'user-4',
      name: 'Annapurna Base Camp',
      lat: 28.3950,
      lng: 83.8200,
      imageUrl: '/images/user-submissions/annapurna-base.jpg',
      funFact: 'At 4,130 meters, this base camp offers trekkers a stunning 360-degree view of the Annapurna range.',
      submittedBy: 'peak_chaser'
    },
    {
      id: 'user-5',
      name: 'Gosaikunda Lake',
      lat: 28.0824,
      lng: 85.4135,
      imageUrl: '/images/user-submissions/gosaikunda.jpg',
      funFact: 'This alpine lake freezes in winter and is a sacred pilgrimage site during the Janai Purnima festival.',
      submittedBy: 'holy_hiker'
    },
    {
      id: 'user-6',
      name: 'Patan Durbar Square',
      lat: 27.6727,
      lng: 85.3250,
      imageUrl: '/images/user-submissions/patan.jpg',
      funFact: 'Patan is known as the "City of Fine Arts" due to its intricate metal and stone carvings.',
      submittedBy: 'culture_seeker'
    },
    {
      id: 'user-7',
      name: 'Tansen',
      lat: 27.8619,
      lng: 83.5443,
      imageUrl: '/images/user-submissions/tansen.jpg',
      funFact: 'Tansen’s Rani Mahal, a palace on the Kali Gandaki River, is dubbed the "Taj Mahal of Nepal."',
      submittedBy: 'history_buff'
    },
    {
      id: 'user-8',
      name: 'Ilam Tea Gardens',
      lat: 26.9080,
      lng: 87.9237,
      imageUrl: '/images/user-submissions/ilam.jpg',
      funFact: 'Ilam produces some of Nepal’s finest teas, often compared to Darjeeling blends.',
      submittedBy: 'tea_lover'
    },
    {
      id: 'user-9',
      name: 'Everest Base Camp',
      lat: 28.0021,
      lng: 86.8520,
      imageUrl: '/images/user-submissions/everest-base.jpg',
      funFact: 'At 5,364 meters, it’s a bucket-list stop for mountaineers aiming for Everest’s summit.',
      submittedBy: 'summit_dreamer'
    },
    {
      id: 'user-10',
      name: 'Boudhanath Stupa',
      lat: 27.7215,
      lng: 85.3620,
      imageUrl: '/images/user-submissions/boudhanath.jpg',
      funFact: 'One of the largest stupas in the world, its eyes symbolize wisdom and compassion.',
      submittedBy: 'spiritual_traveler'
    },
    {
      id: 'user-11',
      name: 'Langtang Valley',
      lat: 28.2147,
      lng: 85.5660,
      imageUrl: '/images/user-submissions/langtang.jpg',
      funFact: 'Known as the "Valley of Glaciers," it’s a trekker’s paradise with Tamang heritage villages.',
      submittedBy: 'trail_blazer'
    },
    {
      id: 'user-12',
      name: 'Poon Hill',
      lat: 28.4000,
      lng: 83.6910,
      imageUrl: '/images/user-submissions/poon-hill.jpg',
      funFact: 'A sunrise from Poon Hill reveals panoramic views of Dhaulagiri and Annapurna peaks.',
      submittedBy: 'dawn_watcher'
    },
    {
      id: 'user-13',
      name: 'Swayambhunath',
      lat: 27.7149,
      lng: 85.2881,
      imageUrl: '/images/user-submissions/swayambhunath.jpg',
      funFact: 'Nicknamed the "Monkey Temple," it’s perched on a hilltop overlooking Kathmandu Valley.',
      submittedBy: 'urban_explorer'
    },
    {
      id: 'user-14',
      name: 'Manang Village',
      lat: 28.6660,
      lng: 84.0210,
      imageUrl: '/images/user-submissions/manang.jpg',
      funFact: 'At 3,519 meters, Manang is a key acclimatization stop on the Annapurna Circuit.',
      submittedBy: 'high_altitude'
    },
    {
      id: 'user-15',
      name: 'Dhulikhel',
      lat: 27.6200,
      lng: 85.5400,
      imageUrl: '/images/user-submissions/dhulikhel.jpg',
      funFact: 'Dhulikhel offers serene views of the Himalayas and is a gateway to nearby hiking trails.',
      submittedBy: 'peaceful_path'
    },
    {
      id: 'user-16',
      name: 'Kalinchowk',
      lat: 27.6950,
      lng: 86.0130,
      imageUrl: '/images/user-submissions/kalinchowk.jpg',
      funFact: 'Famous for its snowy winters, it’s home to the Kalinchowk Bhagwati Temple at 3,842 meters.',
      submittedBy: 'snow_seeker'
    },
    {
      id: 'user-17',
      name: 'Bandipur',
      lat: 27.9350,
      lng: 84.4080,
      imageUrl: '/images/user-submissions/bandipur.jpg',
      funFact: 'This hilltop town preserves Newari architecture and offers sweeping valley views.',
      submittedBy: 'village_vibes'
    },
    {
      id: 'user-18',
      name: 'Tilicho Lake',
      lat: 28.6900,
      lng: 83.8100,
      imageUrl: '/images/user-submissions/tilicho.jpg',
      funFact: 'At 4,919 meters, it’s one of the highest lakes in the world and a tough trek to reach.',
      submittedBy: 'extreme_traveler'
    },
    {
      id: 'user-19',
      name: 'Janakpur',
      lat: 26.7288,
      lng: 85.9248,
      imageUrl: '/images/user-submissions/janakpur.jpg',
      funFact: 'Known for the Janaki Temple, it’s believed to be the birthplace of Sita from the Ramayana.',
      submittedBy: 'mythology_fan'
    },
    {
      id: 'user-20',
      name: 'Muktinath',
      lat: 28.8167,
      lng: 83.8710,
      imageUrl: '/images/user-submissions/muktinath.jpg',
      funFact: 'A sacred site for both Hindus and Buddhists, it features 108 water spouts and an eternal flame.',
      submittedBy: 'pilgrim_soul'
    },
    {
      id: 'user-21',
      name: 'Khaptad National Park',
      lat: 29.4167,
      lng: 81.1667,
      imageUrl: '/images/user-submissions/khaptad.jpg',
      funFact: 'This remote park features rolling meadows, dense forests, and 22 sacred ponds.',
      submittedBy: 'nature_nomad'
    },
    {
      id: 'user-22',
      name: 'Phoksundo Lake',
      lat: 29.1980,
      lng: 82.9570,
      imageUrl: '/images/user-submissions/phoksundo.jpg',
      funFact: 'Nepal’s deepest lake at 145 meters, its turquoise waters are a highlight of Dolpo.',
      submittedBy: 'lake_lover'
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