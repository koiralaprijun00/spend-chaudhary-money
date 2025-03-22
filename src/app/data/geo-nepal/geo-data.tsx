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
      imageUrl: '/images/kathmandu-durbar-square.jpg',
      funFact: 'Kathmandu Durbar Square was constructed in the 3rd century by the Licchavi dynasty.\nIt features temples and palaces dating back to the 12th century, showcasing ancient architecture.'
    },
    {
      id: 2,
      name: 'Pokhara Lakeside',
      lat: 28.2090,
      lng: 83.9550,
      imageUrl: '/images/pokhara-lakeside.jpg',
      funFact: 'Phewa Lake is the second largest lake in Nepal, stretching over 4 square kilometers.\nIt has a small island with the Tal Barahi Temple, a popular spot for boaters.'
    },
    {
      id: 3,
      name: 'Bhaktapur',
      lat: 27.6722,
      lng: 85.4280,
      imageUrl: '/images/bhaktapur.jpg',
      funFact: 'Bhaktapur is renowned for its unique Juju Dhau, a creamy yogurt made from buffalo milk.\nThe city’s pottery and woodcarving traditions also draw visitors to its historic squares.'
    },
    {
      id: 4,
      name: 'Nagarkot',
      lat: 27.7155,
      lng: 85.5205,
      imageUrl: '/images/nagarkot.jpg',
      funFact: 'Nagarkot sits at 2,175 meters, offering stunning Himalayan vistas on clear days.\nYou can catch a glimpse of Mount Everest, 140 kilometers away, from its viewpoints.'
    },
    {
      id: 5,
      name: 'Lumbini',
      lat: 27.4699,
      lng: 83.2756,
      imageUrl: '/images/lumbini.jpg',
      funFact: 'Lumbini is the birthplace of Siddhartha Gautama, marked by a stone in the Maya Devi Temple.\nThe sacred garden also features an Ashokan Pillar from 249 BCE, a UNESCO site.'
    },
    {
      id: 6,
      name: 'Annapurna Base Camp',
      lat: 28.5300,
      lng: 83.8870,
      imageUrl: '/images/annapurna-base-camp.jpg',
      funFact: 'The Annapurna Base Camp trek, or "ABC trek," takes 7-12 days through diverse terrain.\nIt rewards hikers with close-up views of Annapurna I, towering at 8,091 meters.'
    },
    {
      id: 7,
      name: 'Chitwan National Park',
      lat: 27.5750,
      lng: 84.4930,
      imageUrl: '/images/chitwan.jpg',
      funFact: 'Chitwan National Park has boosted the one-horned rhino population from under 100 to over 600.\nThis UNESCO site in the Terai is also home to tigers, elephants, and gharial crocodiles.'
    },
    {
      id: 8,
      name: 'Tilicho Lake',
      lat: 28.6840,
      lng: 83.8110,
      imageUrl: '/images/tilicho-lake.jpg',
      funFact: 'Tilicho Lake, at 4,919 meters, is one of the highest lakes in the world.\nIt’s fed by glacial melt from the northern slopes of Annapurna and Thorung Peak.'
    },
    {
      id: 9,
      name: 'Patan Durbar Square',
      lat: 27.6727,
      lng: 85.3250,
      imageUrl: '/images/patan-durbar-square.jpg',
      funFact: 'Patan Durbar Square boasts intricate wood carvings and the Krishna Mandir, built in 1637.\nIt’s a UNESCO site reflecting the artistic legacy of the Malla kings.'
    },
    {
      id: 10,
      name: 'Swayambhunath Stupa',
      lat: 27.7149,
      lng: 85.2906,
      imageUrl: '/images/swayambhunath-stupa.jpg',
      funFact: 'Known as the "Monkey Temple" due to its resident primates, Swayambhunath is over 2,500 years old.\nIt offers a panoramic view of Kathmandu Valley from its hilltop perch.'
    },
    {
      id: 11,
      name: 'Everest Base Camp',
      lat: 28.0050,
      lng: 86.8600,
      imageUrl: '/images/everest-base-camp.jpg',
      funFact: 'Everest Base Camp sits at 5,364 meters, a staging point for climbers of the world’s highest peak.\nThe trek to reach it passes through Sherpa villages and rugged Himalayan terrain.'
    },
    {
      id: 12,
      name: 'Janakpur',
      lat: 26.7290,
      lng: 85.9260,
      imageUrl: '/images/janakpur.jpg',
      funFact: 'Janakpur is believed to be Sita’s birthplace from the Ramayana, a key pilgrimage site.\nThe ornate Janaki Mandir, built in 1910, draws thousands during Vivah Panchami.'
    },
    {
      id: 13,
      name: 'Rara Lake',
      lat: 29.5300,
      lng: 82.0890,
      imageUrl: '/images/rara-lake.jpg',
      funFact: 'Rara Lake, Nepal’s largest, spans 10.8 square kilometers and shimmers in changing colors.\nIt’s nestled within Rara National Park, home to musk deer and Himalayan black bears.'
    },
    {
      id: 14,
      name: 'Pashupatinath Temple',
      lat: 27.7105,
      lng: 85.3487,
      imageUrl: '/images/pashupatinath-temple.jpg',
      funFact: 'Pashupatinath, a UNESCO site, is one of the holiest Hindu temples dedicated to Lord Shiva.\nIt sits on the Bagmati River, where cremation rituals draw pilgrims and visitors.'
    },
    {
      id: 15,
      name: 'Gosaikunda Lake',
      lat: 28.0820,
      lng: 85.4140,
      imageUrl: '/images/gosaikunda-lake.jpg',
      funFact: 'Gosaikunda Lake, at 4,380 meters, is a sacred alpine site for Hindus and Buddhists.\nThousands trek here during Janai Purnima to bathe in its holy waters.'
    },
    {
      id: 16,
      name: 'Ilam Tea Gardens',
      lat: 26.9110,
      lng: 87.9230,
      imageUrl: '/images/ilam-tea-gardens.jpg',
      funFact: 'Ilam’s lush tea gardens produce some of Nepal’s finest tea, rivaling Darjeeling’s quality.\nThe rolling green hills also offer scenic views of the eastern Himalayas.'
    },
    {
      id: 17,
      name: 'Boudhanath Stupa',
      lat: 27.7214,
      lng: 85.3619,
      imageUrl: '/images/boudhanath-stupa.jpg',
      funFact: 'Boudhanath, one of the largest spherical stupas globally, is a hub for Tibetan Buddhism.\nIts massive mandala and prayer wheels attract pilgrims and tourists alike.'
    },
    {
      id: 18,
      name: 'Tansen',
      lat: 27.8620,
      lng: 83.5440,
      imageUrl: '/images/tansen.jpg',
      funFact: 'Tansen, a historic hill town, is famous for its traditional Dhaka fabric weaving.\nThe Rani Mahal, a riverside palace, adds to its charm as a hidden gem.'
    },
    {
      id: 19,
      name: 'Bandipur',
      lat: 27.9350,
      lng: 84.4080,
      imageUrl: '/images/bandipur.jpg',
      funFact: 'Bandipur is a preserved hilltop village with traditional Newari architecture.\nIts car-free streets and Himalayan views make it a peaceful retreat.'
    },
    {
      id: 20,
      name: 'Ghandruk Village',
      lat: 28.3760,
      lng: 83.8050,
      imageUrl: '/images/ghandruk-village.jpg',
      funFact: 'Ghandruk offers stunning views of Annapurna South, Hiunchuli, and Machhapuchhre.\nThis Gurung village is a popular stop on the Annapurna trekking circuit.'
    },
    {
      id: 21,
      name: 'Namche Bazaar',
      lat: 27.8050,
      lng: 86.7100,
      imageUrl: '/images/namche-bazaar.jpg',
      funFact: 'Namche Bazaar, at 3,440 meters, is the gateway to Everest and a Sherpa trading hub.\nIts vibrant market and acclimatization trails are key for trekkers.'
    },
    {
      id: 22,
      name: 'Langtang Valley',
      lat: 28.2100,
      lng: 85.5100,
      imageUrl: '/images/langtang-valley.jpg',
      funFact: 'Langtang Valley, dubbed the "Valley of Glaciers," offers pristine Himalayan scenery.\nIt’s home to the sacred Gosaikunda Lake trek and diverse wildlife.'
    },
    {
      id: 23,
      name: 'Upper Mustang',
      lat: 28.9980,
      lng: 83.8470,
      imageUrl: '/images/upper-mustang.jpg',
      funFact: 'Upper Mustang, a restricted area, preserves ancient Tibetan culture and monasteries.\nIts desert-like landscape contrasts with the lush valleys below.'
    },
    {
      id: 24,
      name: 'Poon Hill',
      lat: 28.4000,
      lng: 83.6900,
      imageUrl: '/images/poon-hill.jpg',
      funFact: 'Poon Hill, at 3,210 meters, is famous for its sunrise views over Annapurna and Dhaulagiri.\nThe short trek from Ghorepani makes it accessible to many hikers.'
    },
    {
      id: 25,
      name: 'Bardiya National Park',
      lat: 28.3950,
      lng: 81.4950,
      imageUrl: '/images/bardiya-national-park.jpg',
      funFact: 'Bardiya National Park is less crowded than Chitwan and spans 968 square kilometers.\nIt’s a prime habitat for the elusive Royal Bengal Tiger and wild elephants.'
    },
    {
      id: 26,
      name: 'Dhulikhel',
      lat: 27.6200,
      lng: 85.5500,
      imageUrl: '/images/dhulikhel.jpg',
      funFact: 'Dhulikhel, just 30 km from Kathmandu, is known for its serene hills and fresh air.\nIt offers panoramic Himalayan views, including peaks like Langtang Lirung.'
    },
    {
      id: 27,
      name: 'Sarangkot',
      lat: 28.2430,
      lng: 83.9470,
      imageUrl: '/images/sarangkot.jpg',
      funFact: 'Sarangkot, at 1,592 meters, is a top spot for paragliding over Pokhara Valley.\nIt provides breathtaking views of the Annapurna range and Phewa Lake.'
    },
    {
      id: 28,
      name: 'Jomsom',
      lat: 28.7740,
      lng: 83.7350,
      imageUrl: '/images/jomsom.jpg',
      funFact: 'Jomsom lies in the Kali Gandaki Gorge, the world’s deepest, at 2,700 meters.\nIt’s a gateway to Mustang and famous for its windy afternoons.'
    },
    {
      id: 29,
      name: 'Koshi Tappu Wildlife Reserve',
      lat: 26.6500,
      lng: 87.0000,
      imageUrl: '/images/koshi-tappu.jpg',
      funFact: 'Koshi Tappu is a birdwatcher’s paradise with over 485 species in its wetlands.\nIt’s home to the rare swamp partridge and the last wild water buffalo in Nepal.'
    },
    {
      id: 30,
      name: 'Manaslu Base Camp',
      lat: 28.5500,
      lng: 84.5600,
      imageUrl: '/images/manaslu-base-camp.jpg',
      funFact: 'Manaslu, the eighth-highest peak at 8,163 meters, offers a quieter trek than Everest.\nThe base camp trail winds through remote villages and birch forests.'
    },
    {
      id: 31,
      name: 'Thamel',
      lat: 27.7150,
      lng: 85.3100,
      imageUrl: '/images/thamel.jpg',
      funFact: 'Thamel is Kathmandu’s bustling tourist district, packed with shops and eateries.\nIts vibrant nightlife and narrow streets make it a backpacker’s haven.'
    },
    {
      id: 32,
      name: 'Dhaulagiri Base Camp',
      lat: 28.7350,
      lng: 83.5100,
      imageUrl: '/images/dhaulagiri-base-camp.jpg',
      funFact: 'Dhaulagiri, the seventh-highest peak at 8,167 meters, looms over its remote base camp.\nThe trek is one of Nepal’s most challenging, crossing high passes and glaciers.'
    },
    {
      id: 33,
      name: 'Shivapuri National Park',
      lat: 27.8000,
      lng: 85.3900,
      imageUrl: '/images/shivapuri-national-park.jpg',
      funFact: 'Shivapuri National Park, near Kathmandu, is a biodiversity hotspot with over 500 species.\nIt’s the source of the holy Bagmati River and a popular hiking destination.'
    },
    {
      id: 34,
      name: 'World Peace Pagoda (Pokhara)',
      lat: 28.1960,
      lng: 83.9460,
      imageUrl: '/images/world-peace-pagoda.jpg',
      funFact: 'The World Peace Pagoda in Pokhara was built by Japanese monks to promote harmony.\nIt offers stunning views of Phewa Lake and the Annapurna range.'
    },
    {
      id: 35,
      name: 'Gokyo Lakes',
      lat: 27.9500,
      lng: 86.6900,
      imageUrl: '/images/gokyo-lakes.jpg',
      funFact: 'The Gokyo Lakes, a series of six turquoise pools, sit at 4,700-5,000 meters.\nThey’re sacred to Hindus and Buddhists, with Gokyo Ri offering Everest views.'
    },
    {
      id: 36,
      name: 'Makalu Base Camp',
      lat: 27.8900,
      lng: 87.0900,
      imageUrl: '/images/makalu-base-camp.jpg',
      funFact: 'Makalu, the fifth-highest peak at 8,485 meters, towers over its pristine base camp.\nThe trek through untouched wilderness offers solitude and rugged beauty.'
    },
    {
      id: 37,
      name: 'Pathibhara Temple',
      lat: 27.4300,
      lng: 87.7600,
      imageUrl: '/images/pathibhara-temple.jpg',
      funFact: 'Pathibhara Devi Temple in Taplejung is a revered Hindu site at 3,794 meters.\nPilgrims trek here for blessings and views of the Kanchenjunga range.'
    },
    {
      id: 38,
      name: 'Begnas Lake',
      lat: 28.1740,
      lng: 84.0970,
      imageUrl: '/images/begnas-lake.jpg',
      funFact: 'Begnas Lake, near Pokhara, is quieter than Phewa and spans 3 square kilometers.\nIt’s ideal for boating, fishing, and enjoying serene Himalayan reflections.'
    },
    {
      id: 39,
      name: 'Khaptad National Park',
      lat: 29.2700,
      lng: 80.9800,
      imageUrl: '/images/khaptad-national-park.jpg',
      funFact: 'Khaptad National Park features rolling meadows and unique flora in far-western Nepal.\nIt’s home to the ashram of Khaptad Baba, a revered spiritual figure.'
    },
    {
      id: 40,
      name: 'Shey Phoksundo Lake',
      lat: 29.2000,
      lng: 82.9500,
      imageUrl: '/images/shey-phoksundo-lake.jpg',
      funFact: 'Shey Phoksundo, Nepal’s deepest lake at 145 meters, glows turquoise in Dolpo.\nIts remote location and nearby monasteries make it a trekker’s paradise.'
    },
    {
      id: 41,
      name: 'Panauti',
      lat: 27.5850,
      lng: 85.5200,
      imageUrl: '/images/panauti.jpg',
      funFact: 'Panauti, an ancient Newari town, boasts well-preserved temples and a historic charm.\nIt’s known for traditional festivals like the Makar Mela every 12 years.'
    },
    {
      id: 42,
      name: 'Kanchenjunga Base Camp',
      lat: 27.7000,
      lng: 88.1500,
      imageUrl: '/images/kanchenjunga-base-camp.jpg',
      funFact: 'Kanchenjunga, the third-highest peak at 8,586 meters, dominates its base camp.\nThe remote trek passes through diverse ecosystems, from forests to alpine meadows.'
    },
    {
      id: 43,
      name: 'Dhorpatan Hunting Reserve',
      lat: 28.5000,
      lng: 83.0700,
      imageUrl: '/images/dhorpatan-hunting-reserve.jpg',
      funFact: 'Dhorpatan is Nepal’s only hunting reserve, established in 1987 for regulated hunting.\nIt’s also a scenic trekking spot with views of Dhaulagiri and wildlife like blue sheep.'
    },
    {
      id: 44,
      name: 'Changu Narayan Temple',
      lat: 27.7160,
      lng: 85.4280,
      imageUrl: '/images/changu-narayan-temple.jpg',
      funFact: 'Changu Narayan, a UNESCO site, dates to the 4th century and honors Lord Vishnu.\nIts intricate stone carvings are among the oldest in the Kathmandu Valley.'
    },
    {
      id: 45,
      name: 'Mahendra Cave',
      lat: 28.2700,
      lng: 83.9800,
      imageUrl: '/images/mahendra-cave.jpg',
      funFact: 'Mahendra Cave in Pokhara is a limestone cavern with dramatic stalactites and stalagmites.\nNamed after King Mahendra, it’s a natural wonder drawing local explorers.'
    },
    {
      id: 46,
      name: 'Davis Falls',
      lat: 28.1900,
      lng: 83.9650,
      imageUrl: '/images/davis-falls.jpg',
      funFact: 'Davis Falls in Pokhara plunges into an underground tunnel, creating a misty spectacle.\nIt’s named after a Swiss tourist who tragically fell in during the 1960s.'
    },
    {
      id: 47,
      name: 'Bindhyabasini Temple',
      lat: 28.2380,
      lng: 83.9860,
      imageUrl: '/images/bindhyabasini-temple.jpg',
      funFact: 'Bindhyabasini Temple in Pokhara is dedicated to Goddess Durga and sits on a hilltop.\nIt offers Himalayan views and is a spiritual hub for locals and visitors.'
    },
    {
      id: 48,
      name: 'Shuklaphanta National Park',
      lat: 28.8500,
      lng: 80.1800,
      imageUrl: '/images/shuklaphanta-national-park.jpg',
      funFact: 'Shuklaphanta National Park hosts the world’s largest herd of swamp deer, over 2,000 strong.\nThis Terai reserve also shelters tigers and rare birds in its grasslands.'
    },
    {
      id: 49,
      name: 'Gorkha Durbar',
      lat: 28.0000,
      lng: 84.6300,
      imageUrl: '/images/gorkha-durbar.jpg',
      funFact: 'Gorkha Durbar was the palace of King Prithvi Narayan Shah, who unified Nepal in 1768.\nIts hilltop fortress offers views of the Manaslu and Annapurna ranges.'
    },
    {
      id: 50,
      name: 'Taudaha Lake',
      lat: 27.6500,
      lng: 85.2800,
      imageUrl: '/images/taudaha-lake.jpg',
      funFact: 'Taudaha Lake near Kathmandu is tied to a legend of a serpent king banished here.\nIt’s a peaceful spot for birdwatching, with migratory birds in winter.'
    },
    {
      id: 51,
      name: 'Halesi Mahadev Temple',
      lat: 27.1900,
      lng: 86.6200,
      imageUrl: '/images/halesi-mahadev-temple.jpg',
      funFact: 'Halesi Mahadev is a sacred cave temple in eastern Nepal, revered by Hindus and Buddhists.\nIts three caves symbolize birth, life, and death in spiritual lore.'
    },
    {
      id: 52,
      name: 'Bhairahawa',
      lat: 27.5000,
      lng: 83.4500,
      imageUrl: '/images/bhairahawa.jpg',
      funFact: 'Bhairahawa serves as a gateway to Lumbini, just 20 kilometers away.\nThis bustling trade hub near the Indian border thrives with cross-border activity.'
    },
    {
      id: 53,
      name: 'Sundarijal',
      lat: 27.7700,
      lng: 85.4200,
      imageUrl: '/images/sundarijal.jpg',
      funFact: 'Sundarijal, near Kathmandu, is a popular hiking spot with cascading waterfalls.\nIts lush forests in Shivapuri National Park offer a quick nature escape.'
    },
    {
      id: 54,
      name: 'Kagbeni',
      lat: 28.8370,
      lng: 83.7800,
      imageUrl: '/images/kagbeni.jpg',
      funFact: 'Kagbeni, a medieval village in Mustang, sits at the confluence of two rivers.\nIts ancient monasteries and stark landscapes feel like a step back in time.'
    },
    {
      id: 55,
      name: 'Lo Manthang',
      lat: 29.1800,
      lng: 83.9600,
      imageUrl: '/images/lo-manthang.jpg',
      funFact: 'Lo Manthang, the walled capital of Upper Mustang, dates to the 14th century.\nIts mud-brick architecture and Tibetan heritage are preserved in isolation.'
    },
    {
      id: 56,
      name: 'Tengboche Monastery',
      lat: 27.8360,
      lng: 86.6980,
      imageUrl: '/images/tengboche-monastery.jpg',
      funFact: 'Tengboche Monastery, at 3,867 meters, offers stunning views of Everest and Ama Dablam.\nIt hosts the colorful Mani Rimdu festival every October or November.'
    },
    {
      id: 57,
      name: 'Khopra Ridge',
      lat: 28.4200,
      lng: 83.6800,
      imageUrl: '/images/khopra-ridge.jpg',
      funFact: 'Khopra Ridge is an off-the-beaten-path trek with views of Dhaulagiri and Annapurna.\nAt 3,660 meters, it’s less crowded than Poon Hill but equally scenic.'
    },
    {
      id: 58,
      name: 'Mardi Himal Base Camp',
      lat: 28.4100,
      lng: 83.9000,
      imageUrl: '/images/mardi-himal-base-camp.jpg',
      funFact: 'Mardi Himal Base Camp offers a quieter trek with close views of Machhapuchhre.\nAt 4,500 meters, it’s a hidden gem in the Annapurna region.'
    },
    {
      id: 59,
      name: 'Rani Pokhari',
      lat: 27.7050,
      lng: 85.3150,
      imageUrl: '/images/rani-pokhari.jpg',
      funFact: 'Rani Pokhari, built in 1670 by King Pratap Malla, is a historic pond in Kathmandu.\nIt was created to console his queen after their son’s untimely death.'
    },
    {
      id: 60,
      name: 'Chandragiri Hills',
      lat: 27.6700,
      lng: 85.2050,
      imageUrl: '/images/chandragiri-hills.jpg',
      funFact: 'Chandragiri Hills, at 2,551 meters, offers a cable car ride from Kathmandu.\nIts summit provides panoramic views of the valley and Himalayan peaks.'
    },
    {
      id: 61,
      name: 'Bungmati',
      lat: 27.6300,
      lng: 85.3000,
      imageUrl: '/images/bungmati.jpg',
      funFact: 'Bungmati, a traditional Newari village, is renowned for its woodcarving heritage.\nIt’s home to the Rato Machhindranath Temple, linked to a famous chariot festival.'
    },
    {
      id: 62,
      name: 'Kirtipur',
      lat: 27.6800,
      lng: 85.2750,
      imageUrl: '/images/kirtipur.jpg',
      funFact: 'Kirtipur, an ancient hill town, resisted conquest by Prithvi Narayan Shah in the 1700s.\nIts narrow streets and temples reflect a rich Newari cultural legacy.'
    },
    {
      id: 63,
      name: 'Sagarmatha National Park',
      lat: 27.9650,
      lng: 86.9150,
      imageUrl: '/images/sagarmatha-national-park.jpg',
      funFact: 'Sagarmatha National Park, a UNESCO site, encompasses Everest and rugged peaks.\nIt shelters rare wildlife like snow leopards and Himalayan tahrs.'
    },
    {
      id: 64,
      name: 'Annapurna Conservation Area',
      lat: 28.3500,
      lng: 83.9000,
      imageUrl: '/images/annapurna-conservation-area.jpg',
      funFact: 'The Annapurna Conservation Area spans 7,629 square kilometers across five districts.\nIt protects ecosystems from subtropical forests to alpine peaks like Annapurna I.'
    },
    {
      id: 65,
      name: 'Thorong La Pass',
      lat: 28.7930,
      lng: 83.9380,
      imageUrl: '/images/thorong-la-pass.jpg',
      funFact: 'Thorong La Pass, at 5,416 meters, is the highest point on the Annapurna Circuit.\nTrekkers cross it for breathtaking views and a sense of triumph.'
    },
    {
      id: 66,
      name: 'Baraha Chhetra',
      lat: 26.8700,
      lng: 87.1500,
      imageUrl: '/images/baraha-chhetra.jpg',
      funFact: 'Baraha Chhetra is a sacred Hindu site where Vishnu appeared as a boar, per legend.\nIt lies along the Koshi River, drawing pilgrims to its ancient temple.'
    },
    {
      id: 67,
      name: 'Kali Gandaki Gorge',
      lat: 28.7100,
      lng: 83.6500,
      imageUrl: '/images/kali-gandaki-gorge.jpg',
      funFact: 'The Kali Gandaki Gorge, carved by the Kali Gandaki River, is the world’s deepest canyon.\nIt separates the Annapurna and Dhaulagiri massifs, a geological marvel.'
    },
    {
      id: 68,
      name: 'Budhanilkantha Temple',
      lat: 27.7780,
      lng: 85.3620,
      imageUrl: '/images/budhanilkantha-temple.jpg',
      funFact: 'Budhanilkantha Temple features a 5-meter reclining Vishnu statue from a single stone.\nDating to the 7th century, it’s a key pilgrimage site near Kathmandu.'
    },
    {
      id: 69,
      name: 'Champadevi Hill',
      lat: 27.6300,
      lng: 85.2500,
      imageUrl: '/images/champadevi-hill.jpg',
      funFact: 'Champadevi Hill, at 2,278 meters, is a popular day hike from Kathmandu.\nIt rewards trekkers with views of the valley and distant Himalayan peaks.'
    },
    {
      id: 70,
      name: 'Pharping',
      lat: 27.6100,
      lng: 85.2700,
      imageUrl: '/images/pharping.jpg',
      funFact: 'Pharping hosts the sacred Dakshinkali Temple, dedicated to Goddess Kali.\nIt’s also known for ancient Buddhist sites like the Asura Cave.'
    },
    {
      id: 71,
      name: 'Daman',
      lat: 27.6100,
      lng: 85.0900,
      imageUrl: '/images/daman.jpg',
      funFact: 'Daman, at 2,322 meters, offers one of the widest Himalayan views in Nepal.\nOn clear days, you can see eight of the world’s highest peaks, including Everest.'
    },
    {
      id: 72,
      name: 'Nuwakot Durbar',
      lat: 27.9100,
      lng: 85.1600,
      imageUrl: '/images/nuwakot-durbar.jpg',
      funFact: 'Nuwakot Durbar, a seven-story palace, was a strategic fort during Nepal’s unification.\nBuilt in the 18th century, it overlooks the Trishuli River valley.'
    },
    {
      id: 73,
      name: 'Rupse Falls',
      lat: 28.6700,
      lng: 83.6200,
      imageUrl: '/images/rupse-falls.jpg',
      funFact: 'Rupse Falls is a dramatic 300-meter waterfall along the Kali Gandaki River.\nIt’s a striking sight for trekkers on the Annapurna Circuit route.'
    },
    {
      id: 74,
      name: 'Muktinath Temple',
      lat: 28.8160,
      lng: 83.8700,
      imageUrl: '/images/muktinath-temple.jpg',
      funFact: 'Muktinath is a sacred site for Hindus and Buddhists at 3,710 meters in Mustang.\nIts eternal flame and 108 water spouts draw pilgrims seeking liberation.'
    },
    {
      id: 75,
      name: 'Tatopani Hot Springs',
      lat: 28.5000,
      lng: 83.6500,
      imageUrl: '/images/tatopani-hot-springs.jpg',
      funFact: 'Tatopani’s natural hot springs offer relaxation for Annapurna Circuit trekkers.\nThe name "Tatopani" means "hot water" in Nepali, reflecting its geothermal pools.'
    },
    {
      id: 76,
      name: 'Bhedetar',
      lat: 26.8800,
      lng: 87.3000,
      imageUrl: '/images/bhedetar.jpg',
      funFact: 'Bhedetar, a hill station in eastern Nepal, enjoys cool weather year-round.\nIts viewpoint offers sweeping vistas of the Terai plains and distant hills.'
    },
    {
      id: 77,
      name: 'Antu Danda',
      lat: 26.9300,
      lng: 87.9300,
      imageUrl: '/images/antu-danda.jpg',
      funFact: 'Antu Danda in Ilam is famous for its sunrise views over the Kanchenjunga range.\nThe surrounding tea gardens add to its scenic allure in eastern Nepal.'
    },
    {
      id: 78,
      name: 'Lukla',
      lat: 27.6860,
      lng: 86.7310,
      imageUrl: '/images/lukla.jpg',
      funFact: 'Lukla’s Tenzing-Hillary Airport, at 2,845 meters, is one of the world’s most dangerous.\nIt serves as the starting point for trekkers heading to Everest Base Camp.'
    },
    {
      id: 79,
      name: 'Rukumkot',
      lat: 28.6300,
      lng: 82.6200,
      imageUrl: '/images/rukumkot.jpg',
      funFact: 'Rukumkot is home to Kamal Dhaha, a serene lake reflecting the surrounding hills.\nThis remote village in mid-western Nepal offers a tranquil escape.'
    },
    {
      id: 80,
      name: 'Dolakha Bhimsen Temple',
      lat: 27.6700,
      lng: 86.0700,
      imageUrl: '/images/dolakha-bhimsen-temple.jpg',
      funFact: 'Dolakha Bhimsen Temple is famed for a statue that sweats before major events.\nLocals see it as a divine omen, drawing crowds to this eastern Nepal site.'
    },
    {
      id: 81,
      name: 'Tsho Rolpa Lake',
      lat: 27.8700,
      lng: 86.4700,
      imageUrl: '/images/tsho-rolpa-lake.jpg',
      funFact: 'Tsho Rolpa, one of Nepal’s largest glacial lakes, formed from the Rolwaling Glacier.\nAt 4,580 meters, it’s a stunning yet remote Himalayan wonder.'
    },
    {
      id: 82,
      name: 'Syangja',
      lat: 28.0900,
      lng: 83.8300,
      imageUrl: '/images/syangja.jpg',
      funFact: 'Syangja is known for its terraced hills and the historic Kalika Temple.\nIt offers picturesque views of the Annapurna and Manaslu ranges.'
    },
    {
      id: 83,
      name: 'Hile',
      lat: 27.0300,
      lng: 87.3100,
      imageUrl: '/images/hile.jpg',
      funFact: 'Hile is a charming hill town in eastern Nepal, en route to Basantapur.\nIts cool climate and proximity to tea estates make it a refreshing stop.'
    },
    {
      id: 84,
      name: 'Lamjung Durbar',
      lat: 28.2000,
      lng: 84.4000,
      imageUrl: '/images/lamjung-durbar.jpg',
      funFact: 'Lamjung Durbar was once the seat of a small kingdom in central Nepal.\nIts hilltop location offers sweeping views of the Annapurna range.'
    },
    {
      id: 85,
      name: 'Phewa Tal Barahi Temple',
      lat: 28.2110,
      lng: 83.9530,
      imageUrl: '/images/phewa-tal-barahi-temple.jpg',
      funFact: 'Phewa Tal Barahi Temple sits on an island in Phewa Lake, reachable only by boat.\nDedicated to Goddess Barahi, it’s a serene spiritual spot in Pokhara.'
    },
    {
      id: 86,
      name: 'Kulekhani Reservoir',
      lat: 27.5900,
      lng: 85.1500,
      imageUrl: '/images/kulekhani-reservoir.jpg',
      funFact: 'Kulekhani Reservoir, or Indra Sarobar, is a man-made lake near Kathmandu.\nIt’s popular for boating, fishing, and its scenic dam backdrop.'
    },
    {
      id: 87,
      name: 'Manang Village',
      lat: 28.6700,
      lng: 84.0200,
      imageUrl: '/images/manang-village.jpg',
      funFact: 'Manang Village, at 3,519 meters, lies on the Annapurna Circuit route.\nIts Tibetan culture and arid landscape reflect life beyond the Himalayas.'
    },
    {
      id: 88,
      name: 'Rolwaling Valley',
      lat: 27.8500,
      lng: 86.3500,
      imageUrl: '/images/rolwaling-valley.jpg',
      funFact: 'Rolwaling Valley is a hidden gem with rugged peaks and Tsho Rolpa Lake.\nIts remote trails offer solitude and views of Gaurishankar and other peaks.'
    },
    {
      id: 89,
      name: 'Tilaurakot',
      lat: 27.5700,
      lng: 83.0600,
      imageUrl: '/images/tilaurakot.jpg',
      funFact: 'Tilaurakot is an archaeological site thought to be Kapilvastu’s ancient palace.\nIt’s linked to Buddha’s early life, with ruins dating back over 2,500 years.'
    },
    {
      id: 90,
      name: 'Dhangadhi',
      lat: 28.7000,
      lng: 80.5900,
      imageUrl: '/images/dhangadhi.jpg',
      funFact: 'Dhangadhi is a gateway to western Nepal’s Terai, near the Indian border.\nIt’s close to Ghodaghodi Lake, a Ramsar site for birdwatching.'
    },
    {
      id: 91,
      name: 'Surkhet',
      lat: 28.6000,
      lng: 81.6000,
      imageUrl: '/images/surkhet.jpg',
      funFact: 'Surkhet Valley hosts the Kakrebihar Temple, blending Hindu and Buddhist styles.\nThis mid-western hub is surrounded by hills and fertile plains.'
    },
    {
      id: 92,
      name: 'Galeshwor Mahadev Temple',
      lat: 28.5700,
      lng: 83.7100,
      imageUrl: '/images/galeshwor-mahadev-temple.jpg',
      funFact: 'Galeshwor Mahadev Temple is carved into a cliff near the Kali Gandaki River.\nDedicated to Lord Shiva, it’s a spiritual stop in Myagdi district.'
    },
    {
      id: 93,
      name: 'Dhampus Village',
      lat: 28.3100,
      lng: 83.8500,
      imageUrl: '/images/dhampus-village.jpg',
      funFact: 'Dhampus, a scenic Gurung village, offers close views of Machhapuchhre and Annapurna.\nIt’s a short trek from Pokhara, blending culture and nature.'
    },
    {
      id: 94,
      name: 'Basantapur Tower',
      lat: 27.7040,
      lng: 85.3070,
      imageUrl: '/images/basantapur-tower.jpg',
      funFact: 'Basantapur Tower, part of Kathmandu Durbar Square, is a nine-story Malla-era structure.\nIt offers a glimpse into royal history and intricate craftsmanship.'
    },
    {
      id: 95,
      name: 'Chitlang',
      lat: 27.6600,
      lng: 85.1800,
      imageUrl: '/images/chitlang.jpg',
      funFact: 'Chitlang, a rural retreat near Kathmandu, is famous for organic farming and goat cheese.\nIts peaceful trails and village life contrast with the capital’s bustle.'
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