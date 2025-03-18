// src/app/data/checklist-data.ts
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface ChecklistData {
  items: {
    [key: string]: ChecklistItem;
  };
}

export const checklistData: ChecklistData = {
  items: {
    ebc_trek: {
      id: "ebc_trek",
      title: "Trek to Everest Base Camp",
      description: "Stand at the foot of the world's tallest mountain",
      image: "/images/checklist/ebc.jpg"
    },
    annapurna_circuit: {
      id: "annapurna_circuit",
      title: "Complete the Annapurna Circuit",
      description: "Trek through diverse landscapes and cross Thorong La pass",
      image: "/images/checklist/annapurna.jpg"
    },
    dashain_celebration: {
      id: "dashain_celebration",
      title: "Celebrate Dashain with a Nepali Family",
      description: "Receive tika and jamara during Nepal's biggest festival",
      image: "/images/checklist/dashain.jpg"
    },
    momo_feast: {
      id: "momo_feast",
      title: "Eat Momos Until You Can't Move",
      description: "Try at least 5 varieties of Nepal's beloved dumplings in one sitting",
      image: "/images/checklist/momos.jpg"
    },
    dal_bhat: {
      id: "dal_bhat",
      title: "Master the Art of Dal Bhat Power 24 Hour",
      description: "Experience the energy-giving staple diet of Nepal",
      image: "/images/checklist/dalbhat.jpg"
    },
    rhino_spotting: {
      id: "rhino_spotting",
      title: "Spot a One-Horned Rhino in Chitwan",
      description: "Witness these magnificent creatures in their natural habitat",
      image: "/images/checklist/rhino.jpg"
    },
    butter_tea: {
      id: "butter_tea",
      title: "Drink Butter Tea with a Sherpa",
      description: "Acquire a taste for this high-altitude energy drink",
      image: "/images/checklist/buttertea.jpg"
    },
    temple_run: {
      id: "temple_run",
      title: "Visit All Seven UNESCO World Heritage Sites in Kathmandu Valley",
      description: "A cultural marathon through temples, squares, and stupas",
      image: "/images/checklist/heritage.jpg"
    },
    bargain_thamel: {
      id: "bargain_thamel",
      title: "Successfully Bargain in Thamel",
      description: "Get at least 50% off the initial asking price",
      image: "/images/checklist/thamel.jpg"
    },
    mountain_flight: {
      id: "mountain_flight",
      title: "Take a Mountain Flight",
      description: "See Everest from a plane window without the trek",
      image: "/images/checklist/flight.jpg"
    },
    tihar_lights: {
      id: "tihar_lights",
      title: "Experience Tihar Festival of Lights",
      description: "Witness homes illuminated with oil lamps and candles",
      image: "/images/checklist/tihar.jpg"
    },
    raksi_local: {
      id: "raksi_local",
      title: "Try Homemade Raksi with Locals",
      description: "Sample Nepal's traditional distilled alcohol (and survive)",
      image: "/images/checklist/raksi.jpg"
    },
    monkey_temple: {
      id: "monkey_temple",
      title: "Defend Your Snacks at Swayambhunath",
      description: "Visit the 'Monkey Temple' without losing food to the locals",
      image: "/images/checklist/monkeytemple.jpg"
    },
    paragliding_pokhara: {
      id: "paragliding_pokhara",
      title: "Paraglide in Pokhara",
      description: "Soar with eagles above Phewa Lake",
      image: "/images/checklist/paraglide.jpg"
    },
    language_basics: {
      id: "language_basics",
      title: "Learn Basic Nepali Phrases",
      description: "Move beyond 'Namaste' to at least 10 useful expressions",
      image: "/images/checklist/nepali.jpg"
    },
    phewa_boat: {
      id: "phewa_boat",
      title: "Row a Boat on Phewa Lake",
      description: "Navigate to Tal Barahi Temple in the middle of the lake",
      image: "/images/checklist/phewa.jpg"
    },
    marigold_garland: {
      id: "marigold_garland",
      title: "Wear a Marigold Garland",
      description: "Be adorned with Nepal's ceremonial flower",
      image: "/images/checklist/marigold.jpg"
    },
    meditation_monastery: {
      id: "meditation_monastery",
      title: "Meditate in a Buddhist Monastery",
      description: "Find inner peace with monks as your guides",
      image: "/images/checklist/meditation.jpg"
    },
    langtang_trek: {
      id: "langtang_trek",
      title: "Trek the Langtang Valley",
      description: "Experience the 'valley of glaciers' on a less crowded trail",
      image: "/images/checklist/langtang.jpg"
    },
    tharu_dance: {
      id: "tharu_dance",
      title: "Join a Traditional Tharu Dance",
      description: "Participate in the stick dance of the Terai region",
      image: "/images/checklist/tharu.jpg"
    },
    yak_cheese: {
      id: "yak_cheese",
      title: "Eat Himalayan Yak Cheese",
      description: "Savor the distinctive flavor of high-altitude dairy",
      image: "/images/checklist/yakcheese.jpg"
    },
    blackout_kathmandu: {
      id: "blackout_kathmandu",
      title: "Experience a Kathmandu Power Outage",
      description: "Embrace the impromptu candlelit evening",
      image: "/images/checklist/powerout.jpg"
    },
    holi_colors: {
      id: "holi_colors",
      title: "Get Completely Covered in Holi Colors",
      description: "Become a walking rainbow during the festival of colors",
      image: "/images/checklist/holi.jpg"
    },
    yeti_search: {
      id: "yeti_search",
      title: "Go on a Yeti Hunt",
      description: "Search for the elusive abominable snowman (results not guaranteed)",
      image: "/images/checklist/yeti.jpg"
    },
    himalayan_sunrise: {
      id: "himalayan_sunrise",
      title: "Watch Sunrise from Sarangkot",
      description: "See the Annapurna range glow golden at dawn",
      image: "/images/checklist/sunrise.jpg"
    },
    eat_gundruk: {
      id: "eat_gundruk",
      title: "Develop a Taste for Gundruk",
      description: "Try Nepal's fermented leafy green specialty",
      image: "/images/checklist/gundruk.jpg"
    },
    white_water_rafting: {
      id: "white_water_rafting",
      title: "White Water Raft the Trishuli River",
      description: "Navigate thrilling rapids through gorgeous gorges",
      image: "/images/checklist/rafting.jpg"
    },
    mustang_valley: {
      id: "mustang_valley",
      title: "Visit Upper Mustang",
      description: "Explore the 'forbidden kingdom' and its Tibetan culture",
      image: "/images/checklist/mustang.jpg"
    },
    homestay_village: {
      id: "homestay_village",
      title: "Stay in a Traditional Village Homestay",
      description: "Experience authentic rural Nepali life",
      image: "/images/checklist/homestay.jpg"
    },
    tea_house_lodging: {
      id: "tea_house_lodging",
      title: "Sleep in a Mountain Tea House",
      description: "Experience the trekking accommodation staple",
      image: "/images/checklist/teahouse.jpg"
    },
    boudha_prayer: {
      id: "boudha_prayer",
      title: "Spin Prayer Wheels at Boudhanath",
      description: "Circle the giant stupa among Tibetan pilgrims",
      image: "/images/checklist/boudha.jpg"
    },
    pashupatinath_ceremony: {
      id: "pashupatinath_ceremony",
      title: "Witness an Aarti Ceremony at Pashupatinath",
      description: "Experience the evening fire ritual at Nepal's holiest Hindu site",
      image: "/images/checklist/pashupatinath.jpg"
    },
    trekking_permit: {
      id: "trekking_permit",
      title: "Collect Your First Trekking Permit",
      description: "The official beginning of your Himalayan adventure",
      image: "/images/checklist/permit.jpg"
    },
    rickshaw_ride: {
      id: "rickshaw_ride",
      title: "Take a Rickshaw Ride Through Old Kathmandu",
      description: "Navigate narrow streets the traditional way",
      image: "/images/checklist/rickshaw.jpg"
    },
    altitude_sickness: {
      id: "altitude_sickness",
      title: "Experience Mild Altitude Sickness",
      description: "A Himalayan badge of honor (but take it seriously!)",
      image: "/images/checklist/altitude.jpg"
    },
    porter_gratitude: {
      id: "porter_gratitude",
      title: "Thank Your Porter Properly",
      description: "Show genuine appreciation for these mountain heroes",
      image: "/images/checklist/porter.jpg"
    },
    newar_feast: {
      id: "newar_feast",
      title: "Enjoy a Traditional Newari Feast",
      description: "Sample all 84 dishes if you're brave enough",
      image: "/images/checklist/newari.jpg"
    },
    earthquake_story: {
      id: "earthquake_story",
      title: "Hear a Local's 2015 Earthquake Story",
      description: "Connect with Nepal's recent challenging history",
      image: "/images/checklist/earthquake.jpg"
    },
    bhaktapur_pottery: {
      id: "bhaktapur_pottery",
      title: "Make Pottery in Bhaktapur",
      description: "Try your hand at this ancient Newari craft",
      image: "/images/checklist/pottery.jpg"
    },
    mountain_leeches: {
      id: "mountain_leeches",
      title: "Remove a Leech After a Monsoon Trek",
      description: "A rite of passage for rainy season trekkers",
      image: "/images/checklist/leech.jpg"
    },
    singing_bowl: {
      id: "singing_bowl",
      title: "Meditate with a Singing Bowl",
      description: "Feel the vibrations of this traditional instrument",
      image: "/images/checklist/singingbowl.jpg"
    },
    gorkha_palace: {
      id: "gorkha_palace",
      title: "Climb to Gorkha Palace",
      description: "Visit the birthplace of unified Nepal",
      image: "/images/checklist/gorkha.jpg"
    },
    himalayan_bath: {
      id: "himalayan_bath",
      title: "Take an Ice-Cold Himalayan Shower",
      description: "The most refreshing (and quickest) bath of your life",
      image: "/images/checklist/coldbath.jpg"
    },
    sherpa_blessing: {
      id: "sherpa_blessing",
      title: "Receive a Blessing from a Sherpa Elder",
      description: "A spiritual protection for your mountain journey",
      image: "/images/checklist/blessing.jpg"
    },
    tiger_tops: {
      id: "tiger_tops",
      title: "Stay at Tiger Tops in Chitwan",
      description: "Experience luxury jungle living",
      image: "/images/checklist/tigertops.jpg"
    },
    everest_beer: {
      id: "everest_beer",
      title: "Drink an Everest Beer at 5000m",
      description: "Possibly the highest beer you'll ever enjoy",
      image: "/images/checklist/everestbeer.jpg"
    },
    durbar_sunset: {
      id: "durbar_sunset",
      title: "Watch Sunset from Patan Durbar Square",
      description: "See golden hour illuminate ancient architecture",
      image: "/images/checklist/durbar.jpg"
    },
    jungle_safari: {
      id: "jungle_safari",
      title: "Go on a Jeep Safari in Bardia National Park",
      description: "Search for wild tigers in Nepal's remote wilderness",
      image: "/images/checklist/bardia.jpg"
    },
    terraced_fields: {
      id: "terraced_fields",
      title: "Walk Through Terraced Rice Fields",
      description: "Marvel at centuries-old agricultural engineering",
      image: "/images/checklist/ricefield.jpg"
    },
    suspension_bridge: {
      id: "suspension_bridge",
      title: "Cross a Himalayan Suspension Bridge",
      description: "Test your fear of heights while admiring the view",
      image: "/images/checklist/bridge.jpg"
    },
    namobuddha_monastery: {
      id: "namobuddha_monastery",
      title: "Overnight at Namobuddha Monastery",
      description: "Experience the daily routine of Buddhist monks",
      image: "/images/checklist/namobuddha.jpg"
    },
    buy_khukuri: {
      id: "buy_khukuri",
      title: "Buy an Authentic Khukuri Knife",
      description: "Own the traditional blade of the Gurkhas",
      image: "/images/checklist/khukuri.jpg"
    },
    tij_festival: {
      id: "tij_festival",
      title: "Witness Women Celebrating Teej Festival",
      description: "See the vibrant red celebrations of female power",
      image: "/images/checklist/teej.jpg"
    },
    learn_tabla: {
      id: "learn_tabla",
      title: "Take a Tabla Drum Lesson",
      description: "Learn the basics of this classical instrument",
      image: "/images/checklist/tabla.jpg"
    },
    cook_nepali: {
      id: "cook_nepali",
      title: "Take a Nepali Cooking Class",
      description: "Master the art of momos and more",
      image: "/images/checklist/cooking.jpg"
    },
    tangka_painting: {
      id: "tangka_painting",
      title: "Watch Thangka Painting in Process",
      description: "Observe the creation of intricate Buddhist art",
      image: "/images/checklist/thangka.jpg"
    },
    lakeside_yoga: {
      id: "lakeside_yoga",
      title: "Do Yoga by Phewa Lake at Dawn",
      description: "Salute the sun as it rises over the Himalayas",
      image: "/images/checklist/yoga.jpg"
    },
    mountain_biking: {
      id: "mountain_biking",
      title: "Mountain Bike the Kathmandu Valley Rim",
      description: "Cycle through villages with panoramic views",
      image: "/images/checklist/biking.jpg"
    },
    thankas_shopping: {
      id: "thankas_shopping",
      title: "Buy a Handmade Thangka",
      description: "Support traditional Buddhist artists",
      image: "/images/checklist/thangka_buy.jpg"
    },
    bungee_jump: {
      id: "bungee_jump",
      title: "Bungee Jump from the Last Resort",
      description: "Leap into the Bhote Kosi gorge from 160m high",
      image: "/images/checklist/bungee.jpg"
    },
    kushma_swing: {
      id: "kushma_swing",
      title: "Swing on Nepal's Tallest Cliff Swing in Kushma",
      description: "Experience the ultimate adrenaline rush on a 228m swing",
      image: "/images/checklist/swing.jpg"
    },
    juju_dhau: {
      id: "juju_dhau",
      title: "Eat Juju Dhau in Bhaktapur",
      description: "Taste the 'King of Yogurts' in its home city",
      image: "/images/checklist/jujudhau.jpg"
    },
    poon_hill: {
      id: "poon_hill",
      title: "Sunrise at Poon Hill",
      description: "Watch the first light hit the Annapurna range",
      image: "/images/checklist/poonhill.jpg"
    },
    kora_circuit: {
      id: "kora_circuit",
      title: "Complete a Kora Around Boudhanath",
      description: "Join pilgrims in the sacred clockwise circuit",
      image: "/images/checklist/kora.jpg"
    },
    goat_festival: {
      id: "goat_festival",
      title: "Witness Dashain Goat Festival",
      description: "Experience the ancient sacrificial traditions",
      image: "/images/checklist/goatfestival.jpg"
    },
    tibetan_bread: {
      id: "tibetan_bread",
      title: "Breakfast on Tibetan Bread with Honey",
      description: "The classic trekker's morning meal",
      image: "/images/checklist/tibetanbread.jpg"
    },
    trekker_tan: {
      id: "trekker_tan",
      title: "Get the Himalayan Trekker's Tan",
      description: "Return with the distinctive sunburned face, spared nose",
      image: "/images/checklist/trekkingtan.jpg"
    },
    kumari_sighting: {
      id: "kumari_sighting",
      title: "Spot the Living Goddess Kumari",
      description: "Glimpse Nepal's living deity at her window",
      image: "/images/checklist/kumari.jpg"
    },
    sacred_cow: {
      id: "sacred_cow",
      title: "Navigate Around a Sacred Cow",
      description: "Respect Nepal's national animal blocking traffic",
      image: "/images/checklist/cow.jpg"
    },
    monsoon_downpour: {
      id: "monsoon_downpour",
      title: "Get Caught in a Monsoon Downpour",
      description: "Experience nature's most dramatic shower",
      image: "/images/checklist/monsoon.jpg"
    },
    gompas_visit: {
      id: "gompas_visit",
      title: "Visit Three Different Gompas",
      description: "Compare the unique styles of Buddhist temples",
      image: "/images/checklist/gompa.jpg"
    },
    microbus_ride: {
      id: "microbus_ride",
      title: "Survive a Microbus Ride",
      description: "Experience Kathmandu's most thrilling public transport",
      image: "/images/checklist/microbus.jpg"
    },
    sel_roti: {
      id: "sel_roti",
      title: "Eat Fresh Sel Roti from a Street Vendor",
      description: "Enjoy Nepal's traditional ring-shaped rice bread",
      image: "/images/checklist/selroti.jpg"
    },
    nepal_coffee: {
      id: "nepal_coffee",
      title: "Drink Himalayan Grown Coffee",
      description: "Taste Nepal's emerging specialty coffee scene",
      image: "/images/checklist/coffee.jpg"
    },
    chatpatay_street: {
      id: "chatpatay_street",
      title: "Eat Spicy Chatpatay from a Street Cart",
      description: "Test your spice tolerance with this tangy snack",
      image: "/images/checklist/chatpatay.jpg"
    },
    himalayan_dogs: {
      id: "himalayan_dogs",
      title: "Befriend a Himalayan Trail Dog",
      description: "Make a furry friend who might join you for days",
      image: "/images/checklist/dog.jpg"
    },
    tengboche_monastery: {
      id: "tengboche_monastery",
      title: "Attend Prayers at Tengboche Monastery",
      description: "Experience Buddhist ceremonies with Everest as backdrop",
      image: "/images/checklist/tengboche.jpg"
    },
    cricket_match: {
      id: "cricket_match",
      title: "Join an Impromptu Cricket Match",
      description: "Play Nepal's favorite sport with locals",
      image: "/images/checklist/cricket.jpg"
    },
    sunset_nagarkot: {
      id: "sunset_nagarkot",
      title: "Sunset from Nagarkot",
      description: "Watch the sun drop behind the world's highest mountains",
      image: "/images/checklist/nagarkot.jpg"
    },
    chhang_drink: {
      id: "chhang_drink",
      title: "Drink Chhang from a Traditional Wooden Cup",
      description: "Sip the millet beer from a tongba",
      image: "/images/checklist/chhang.jpg"
    },
    drive_pokhara: {
      id: "drive_pokhara",
      title: "Road Trip from Kathmandu to Pokhara",
      description: "Experience the winding highway journey",
      image: "/images/checklist/roadtrip.jpg"
    },
    prayer_flags: {
      id: "prayer_flags",
      title: "Hang Prayer Flags at a Mountain Pass",
      description: "Add your blessings to those blowing in the wind",
      image: "/images/checklist/prayerflags.jpg"
    },
    sukuti_snack: {
      id: "sukuti_snack",
      title: "Snack on Sukuti with Raksi",
      description: "Pair dried meat with local spirits",
      image: "/images/checklist/sukuti.jpg"
    },
    mountain_toilet: {
      id: "mountain_toilet",
      title: "Use a Himalayan Mountain Toilet",
      description: "Experience the world's most scenic bathroom",
      image: "/images/checklist/toilet.jpg"
    },
    mountain_flight_from_lukla: {
      id: "mountain_flight_from_lukla",
      title: "Take Off from Lukla's Mountain Runway",
      description: "Fly from the world's most thrilling airport",
      image: "/images/checklist/lukla.jpg"
    },
    yak_encounter: {
      id: "yak_encounter",
      title: "Share a Trail with a Yak Train",
      description: "Step aside for these hairy mountain freight carriers",
      image: "/images/checklist/yaktrail.jpg"
    },
    janai_purnima: {
      id: "janai_purnima",
      title: "Get a Raksha Bandhan Thread for Janai Purnima",
      description: "Receive the sacred protection thread on your wrist",
      image: "/images/checklist/janai.jpg"
    },
    tika_red: {
      id: "tika_red",
      title: "Receive a Red Tika Blessing",
      description: "Get the traditional red dot on your forehead",
      image: "/images/checklist/tika.jpg"
    },
    night_bus: {
      id: "night_bus",
      title: "Survive an Overnight Bus Journey",
      description: "Travel long distance the local way",
      image: "/images/checklist/nightbus.jpg"
    },
    hill_station: {
      id: "hill_station",
      title: "Relax at a Hill Station",
      description: "Unwind at Dhulikhel, Bandipur, or another mountain retreat",
      image: "/images/checklist/hillstation.jpg"
    },
    hot_springs: {
      id: "hot_springs",
      title: "Soak in Natural Hot Springs",
      description: "Rest your trekking muscles in nature's hot tub",
      image: "/images/checklist/hotsprings.jpg"
    },
    himalayan_vulture: {
      id: "himalayan_vulture",
      title: "Spot a Himalayan Griffon Vulture",
      description: "Watch these massive birds soar on mountain thermals",
      image: "/images/checklist/vulture.jpg"
    },
    wedding_crasher: {
      id: "wedding_crasher",
      title: "Get Invited to a Nepali Wedding",
      description: "Experience the color and joy of a multi-day celebration",
      image: "/images/checklist/wedding.jpg"
    },
    mt_fish_tail: {
      id: "mt_fish_tail",
      title: "Photograph Machapuchare (Fish Tail Mountain)",
      description: "Capture Nepal's most perfectly formed peak",
      image: "/images/checklist/fishtail.jpg"
    },
    lumbini_pilgrimage: {
      id: "lumbini_pilgrimage",
      title: "Visit Buddha's Birthplace in Lumbini",
      description: "Make a pilgrimage to where Buddhism began",
      image: "/images/checklist/lumbini.jpg"
    },
    indra_jatra: {
      id: "indra_jatra",
      title: "Witness Indra Jatra in Kathmandu",
      description: "See the Kumari's chariot procession and Lakhe dancers during this major Newari festival",
      image: "/images/checklist/indrajatra.jpg"
    },
    chyaang_drink: {
      id: "chyaang_drink",
      title: "Share Chyaang with Village Elders",
      description: "Participate in the social ritual of drinking homemade rice beer from traditional vessels",
      image: "/images/checklist/chyaang.jpg"
    },
    gai_jatra: {
      id: "gai_jatra",
      title: "Experience Gai Jatra Festival",
      description: "Witness the 'cow festival' with satirical performances honoring those who passed away",
      image: "/images/checklist/gaijatra.jpg"
    },
    bhimsen_tower: {
      id: "bhimsen_tower",
      title: "Climb the Rebuilt Bhimsen Tower (Dharahara)",
      description: "Ascend Kathmandu's iconic landmark that was rebuilt after the 2015 earthquake",
      image: "/images/checklist/dharahara.jpg"
    },
    sherpa_museum: {
      id: "sherpa_museum",
      title: "Visit the Sherpa Museum in Namche Bazaar",
      description: "Learn about the culture and mountaineering history of Nepal's famous climbing ethnic group",
      image: "/images/checklist/sherpamuseum.jpg"
    },
    mardi_himal: {
      id: "mardi_himal",
      title: "Trek the Less-Crowded Mardi Himal Route",
      description: "Experience breathtaking Annapurna views on this newer, quieter trekking route",
      image: "/images/checklist/mardihimal.jpg"
    },
    janakpur_visit: {
      id: "janakpur_visit",
      title: "Visit Janakpur's Janaki Temple",
      description: "Explore the birthplace of Sita at this important Terai religious site",
      image: "/images/checklist/janakpur.jpg"
    },
    gosaikunda_lake: {
      id: "gosaikunda_lake",
      title: "Reach Sacred Gosaikunda Lake",
      description: "Trek to this high-altitude sacred lake revered by both Hindus and Buddhists",
      image: "/images/checklist/gosaikunda.jpg"
    },
    jwala_mai: {
      id: "jwala_mai",
      title: "See the Eternal Flame at Jwala Mai Temple",
      description: "Witness the natural gas flame that has been burning for centuries in Muktinath",
      image: "/images/checklist/jwalamai.jpg"
    },
    dolpa_visit: {
      id: "dolpa_visit",
      title: "Explore Remote Dolpa Region",
      description: "Venture into one of Nepal's most isolated and culturally preserved areas",
      image: "/images/checklist/dolpa.jpg"
    },
    sarangi_music: {
      id: "sarangi_music",
      title: "Listen to Traditional Sarangi Music",
      description: "Hear the hauntingly beautiful sounds of this Nepali string instrument",
      image: "/images/checklist/sarangi.jpg"
    },
    chautari_rest: {
      id: "chautari_rest",
      title: "Rest at a Village Chautari",
      description: "Take a break at a traditional resting place built around a Pipal tree",
      image: "/images/checklist/chautari.jpg"
    },
    syanga_zipline: {
      id: "syanga_zipline",
      title: "Ride Asia's Longest Zipline in Syangja",
      description: "Fly through the air at 120km/hour over stunning valleys near Pokhara",
      image: "/images/checklist/zipline.jpg"
    },
    losar_celebration: {
      id: "losar_celebration",
      title: "Celebrate Losar (Tibetan New Year)",
      description: "Join in the vibrant celebrations with Nepal's high mountain communities",
      image: "/images/checklist/losar.jpg"
    },
    ropain_festival: {
      id: "ropain_festival",
      title: "Join the Ropain (Rice Planting) Festival",
      description: "Get muddy planting rice with locals during this agricultural celebration",
      image: "/images/checklist/ropain.jpg"
    },
    chepang_village: {
      id: "chepang_village",
      title: "Visit a Chepang Community",
      description: "Learn about one of Nepal's most marginalized indigenous groups",
      image: "/images/checklist/chepang.jpg"
    },
    nepal_bandh: {
      id: "nepal_bandh",
      title: "Experience a Nepal Bandh (Strike)",
      description: "Find creative ways to navigate when everything mysteriously shuts down",
      image: "/images/checklist/bandh.jpg"
    },
    kumari_puja: {
      id: "kumari_puja",
      title: "Receive Blessings from a Kumari",
      description: "Get a tika from one of Nepal's living goddesses during special ceremonies",
      image: "/images/checklist/kumaripuja.jpg"
    },
    pangolin_conservation: {
      id: "pangolin_conservation",
      title: "Support Pangolin Conservation",
      description: "Learn about efforts to save Nepal's endangered scaly mammal",
      image: "/images/checklist/pangolin.jpg"
    },
    tansen_dhaka: {
      id: "tansen_dhaka",
      title: "Buy Authentic Dhaka Fabric in Tansen",
      description: "Purchase the colorful traditional textile from its original production center",
      image: "/images/checklist/dhaka.jpg"
    },
    baglung_footbridge: {
      id: "baglung_footbridge",
      title: "Cross Baglung's 567m Suspension Bridge",
      description: "Walk across one of the longest and highest suspension bridges in Nepal",
      image: "/images/checklist/baglungbridge.jpg"
    },
    koshi_birding: {
      id: "koshi_birding",
      title: "Go Birdwatching in Koshi Tappu",
      description: "Spot some of Nepal's 900+ bird species in this eastern wetland reserve",
      image: "/images/checklist/koshi.jpg"
    },
    last_royal_palace: {
      id: "last_royal_palace",
      title: "Tour the Narayanhiti Palace Museum",
      description: "Walk through the site of Nepal's dramatic 2001 royal massacre",
      image: "/images/checklist/narayanhiti.jpg"
    },
    mahakali_rafting: {
      id: "mahakali_rafting",
      title: "Raft the Wild Mahakali River",
      description: "Navigate class IV-V rapids on Nepal's western border river",
      image: "/images/checklist/mahakali.jpg"
    },
    khaptad_national_park: {
      id: "khaptad_national_park",
      title: "Explore Khaptad National Park",
      description: "Discover the 'Switzerland of Nepal' with its unique plateau ecosystem in Far-Western Nepal",
      image: "/images/checklist/khaptad.jpg"
    },
    rara_lake: {
      id: "rara_lake",
      title: "Stand at the Shores of Rara Lake",
      description: "Visit Nepal's largest lake in remote Mugu district",
      image: "/images/checklist/rara.jpg"
    },
    newar_jyapu: {
      id: "newar_jyapu",
      title: "Farm with Jyapu Farmers",
      description: "Learn traditional agriculture from Kathmandu Valley's indigenous farmers",
      image: "/images/checklist/jyapu.jpg"
    },
    bhojpur_knife: {
      id: "bhojpur_knife",
      title: "Watch Khukuri Making in Bhojpur",
      description: "See master craftsmen forge Nepal's national knife",
      image: "/images/checklist/bhojpurkhukuri.jpg"
    },
    barah_temple: {
      id: "barah_temple",
      title: "Visit Baraha Temple in Sunsari",
      description: "Explore this important Vishnu temple that emerges from the Koshi River",
      image: "/images/checklist/baraha.jpg"
    }
  }
};