'use client';
import { useState, useEffect } from 'react';
import { Festival } from '../../../types';
import GuessFestivalHeader from '../components/GuessFestivalHeader';
import ScoreBoard from '../components/ScoreBoard';
import QuizSection from '../components/QuizSection';
import AnswerReveal from '../components/AnswerReveal';

export default function Home() {
  const festivals: Festival[] = [
    {
      name: 'Dashain',
      question: 'Which Nepali festival is celebrated for 15 days and involves flying kites, receiving tika, and enjoying feasts?',
      clues: [
        'A plate of khasi ko masu and kodo ko raksi.',
        'Kites fill the sky above the valley.',
        'Grandma insists on tika at 7 a.m. sharp!',
      ],
      fact: "Dashain's 15 days make it Nepal's longest festival!",
      sound: '/sounds/kite_wind.mp3',
      image: '/images/dashain.jpg',
    },
    {
      name: 'Tihar',
      question: 'Which festival is known as the festival of lights and honors crows, dogs, and cows?',
      clues: [
        'A plate of sel roti.',
        'Dogs with garlands around their necks.',
        'Bhailo songs echo at night.',
      ],
      fact: 'Tihar honors animals like crows, dogs, and cows!',
      sound: '/sounds/bhailo_song.mp3',
      image: '/images/tihar.jpg',
    },
    {
      name: 'Chhath',
      question: 'Which festival is dedicated to the Sun God and involves standing in the river at sunrise?',
      clues: [
        'Devotees stand in the river at sunrise.',
        'Offerings of fruits, sugarcane, and thekua.',
        'Worship of the Sun God for blessings.',
      ],
      fact: 'Chhath Puja is mainly celebrated in the Terai region of Nepal.',
      sound: '/sounds/chhath_chant.mp3',
      image: '/images/chhath.jpg',
    },
    {
      name: 'Maghe Sankranti',
      question: 'Which festival marks the end of the coldest month and is celebrated with til ko laddu, ghee, and yam?',
      clues: [
        'Til ko laddu, ghee, and yam are must-haves.',
        'Marks the end of the coldest month.',
        'Celebrated with family gatherings and feasting.',
      ],
      fact: 'Maghe Sankranti is a New Year festival for the Tharu community.',
      sound: '/sounds/maghe_feast.mp3',
      image: '/images/maghe_sankranti.jpg',
    },
    {
      name: 'Holi',
      question: 'Which Nepali festival is known as the festival of colors and involves playing with water balloons and powder?',
      clues: [
        'Colors flying everywhere.',
        'Water balloons and pichkaris in action.',
        'Loud music and dance in the streets.',
      ],
      fact: 'Holi is known as the festival of colors and joy.',
      sound: '/sounds/holi_cheers.mp3',
      image: '/images/holi.jpg',
    },
    {
      name: 'Buddha Jayanti',
      question: 'Which festival celebrates the birth, enlightenment, and passing of Gautam Buddha?',
      clues: [
        'Pilgrims gather at Lumbini.',
        'Monks chanting in monasteries.',
        'Butter lamps glow in the evening.',
      ],
      fact: 'Buddha Jayanti celebrates the birth, enlightenment, and passing of Gautam Buddha.',
      sound: '/sounds/buddhist_chant.mp3',
      image: '/images/buddha_jayanti.jpg',
    },
    {
      name: 'Indra Jatra',
      question: 'Which festival features the Living Goddess Kumari, masked dancers, and chariot processions in Kathmandu?',
      clues: [
        'The Living Goddess Kumari is carried on a chariot.',
        'Masked dancers perform in Kathmandu Durbar Square.',
        'Samay Baji and chhyang are popular treats.',
      ],
      fact: 'Indra Jatra marks the end of the monsoon and honors Indra, the rain god.',
      sound: '/sounds/indra_jatra_drums.mp3',
      image: '/images/indra_jatra.jpg',
    },
    {
      name: 'Gai Jatra',
      question: 'Which festival involves a parade, people in funny costumes, and remembering loved ones who have passed away?',
      clues: [
        'A parade of people dressed in funny costumes.',
        'Families commemorate deceased loved ones.',
        'Newar communities celebrate with jokes and satire.',
      ],
      fact: 'Gai Jatra was started by a Malla king to help his queen overcome grief.',
      sound: '/sounds/gai_jatra_parade.mp3',
      image: '/images/gai_jatra.jpg',
    },
    {
      name: 'Teej',
      question: 'Which festival is celebrated by women wearing red, dancing, and fasting for marital happiness?',
      clues: [
        'Women dressed in red and singing Teej songs.',
        'A day-long fasting for marital happiness.',
        'Dancing and celebrating in temples.',
      ],
      fact: 'Teej is a major festival for Hindu women, dedicated to Lord Shiva and Goddess Parvati.',
      sound: '/sounds/teej_dance.mp3',
      image: '/images/teej.jpg',
    },
    {
      name: 'Janai Purnima',
      question: 'Which festival involves Hindu men changing their sacred thread (janai) and celebrating Rakshya Bandhan?',
      clues: [
        'Men change their sacred thread (janai).',
        'Rakshya Bandhan, where sisters tie rakhi to their brothers.',
        'People visit Gosainkunda for a holy dip.',
      ],
      fact: 'Janai Purnima is celebrated by Hindus and Buddhists across Nepal.',
      sound: '/sounds/janai_purnima_chant.mp3',
      image: '/images/janai_purnima.jpg',
    },
    {
      name: 'Yomari Purnima',
      question: 'Which Newar festival celebrates the full moon with rice flour dumplings filled with sweet ingredients?',
      clues: [
        'Families gather to make dumplings called yomari.',
        'Celebrated on the full moon day of Margashirsha.',
        'A time to pray for prosperity and share treats with neighbors.',
      ],
      fact: 'Yomari Purnima is a Newar tradition marking the end of the rice harvest with sweet-filled dumplings!',
      sound: '/sounds/yomari_feast.mp3',
      image: '/images/yomari_purnima.jpg',
    },
    {
      name: 'Rato Machhendranath Jatra',
      question: 'Which festival in Patan involves pulling a massive chariot to welcome the monsoon season?',
      clues: [
        'A giant chariot is paraded through the streets of Lalitpur.',
        'Celebrates the rain god Machhendranath.',
        'Takes weeks to build and lasts for days.',
      ],
      fact: 'Rato Machhendranath Jatra is one of Nepal’s longest chariot festivals, honoring the god of rain!',
      sound: '/sounds/chariot_rattle.mp3',
      image: '/images/rato_machhendranath.jpg',
    },
    {
      name: 'Sindoor Jatra',
      question: 'Which festival in Bhaktapur uses orange powder and chariot processions to celebrate the Nepali New Year?',
      clues: [
        'People throw sindoor (orange powder) in Madhyapur Thimi.',
        'Features Newari music and dance.',
        'Marks the start of Bisket Jatra festivities.',
      ],
      fact: 'Sindoor Jatra is a colorful celebration tied to the Nepali New Year in Bhaktapur!',
      sound: '/sounds/sindoor_cheers.mp3',
      image: '/images/sindoor_jatra.jpg',
    },
    {
      name: 'Tamu Lhosar',
      question: 'Which festival celebrates the New Year for the Gurung community with traditional dances and feasts?',
      clues: [
        'Gurung people wear traditional attire and perform dances.',
        'Celebrated in December or January.',
        'Involves family gatherings and cultural performances.',
      ],
      fact: 'Tamu Lhosar is the Gurung community’s vibrant New Year celebration in the Himalayas!',
      sound: '/sounds/tamu_dance.mp3',
      image: '/images/tamu_lhosar.jpg',
    },
    {
      name: 'Naga Panchami',
      question: 'Which Hindu festival honors snakes with offerings of milk and prayers for protection?',
      clues: [
        'Images of snakes are placed on doorways.',
        'Devotees offer milk and honey to serpent deities.',
        'Celebrated during the monsoon in Shravan.',
      ],
      fact: 'Naga Panchami worships snakes as protectors during Nepal’s rainy season!',
      sound: '/sounds/naga_chant.mp3',
      image: '/images/naga_panchami.jpg',
    }
];

  const translations: Record<string, string> = {
    Dashain: 'दशैं',
    Tihar: 'तिहार',
    'Next Clue': 'अर्को संकेत',
    'Submit Guess': 'अनुमान पेश गर्नुहोस्',
    'Next Festival': 'अर्को चाड',
    'Your guess...': 'तपाईंको अनुमान...',
    Score: 'अंक',
    'Correct!': 'सही!',
    'Try again!': 'फेरि प्रयास गर्नुहोस्!',
    'Standard Mode': 'टाइमर बिना',
    'Timed Mode': 'समय मोड',
    'Time Left': 'बाँकी समय',
    'Restart Game': 'खेल पुन: सुरु गर्नुहोस्',
    'Yomari Purnima': 'योमरी पूर्णिमा',
  'Rato Machhendranath Jatra': 'रातो मच्छेन्द्रनाथ जात्रा',
  'Sindoor Jatra': 'सिन्दूर जात्रा',
  'Tamu Lhosar': 'तमु ल्होसार',
  'Naga Panchami': 'नाग पञ्चमी',
  };

  const [currentFestival, setCurrentFestival] = useState<Festival>(festivals[0]);
  const [clueIndex, setClueIndex] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isNepali, setIsNepali] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [gameMode, setGameMode] = useState<'standard' | 'timed'>('standard');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [festivalHistory, setFestivalHistory] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const handleShareScore = async () => {
    const shareMessage = `I scored ${score} points in the Nepali Festival Quiz! Can you beat me? Try it at: [your-app-url] #NepaliFestivals`;
    const shareData = {
      title: 'Nepali Festival Quiz Score',
      text: shareMessage,
      url: 'https://piromomo.com', // Replace with your app’s URL
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareMessage);
        alert('Score copied to clipboard! Paste it to share.');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      // Fallback on error
      await navigator.clipboard.writeText(shareMessage);
      alert('Score copied to clipboard! Paste it to share.');
    }
  };

  const generateOptions = (correctFestival: string) => {
    const allFestivals = festivals.map(f => f.name);
    const distractors = allFestivals.filter(name => name !== correctFestival);
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([correctFestival, ...shuffledDistractors].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    shuffleFestivals();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (gameMode === 'timed' && timerActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (gameMode === 'timed' && timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
    return () => { if (timer) clearInterval(timer); };
  }, [timeLeft, timerActive, gameMode, isAnswered]);

  useEffect(() => {
    if (isAnswered) {
      const audio = new Audio(isCorrect ? currentFestival.sound : '/sounds/wrong_answer.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => console.log('Audio play failed'));
    }
  }, [isAnswered, isCorrect, currentFestival]);

  const shuffleFestivals = () => {
    const randomIndex = Math.floor(Math.random() * festivals.length);
    setCurrentFestival(festivals[randomIndex]);
    generateOptions(festivals[randomIndex].name);
    setClueIndex(0);
    setGuess('');
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback('');
    if (gameMode === 'timed') {
      setTimeLeft(30);
      setTimerActive(true);
    }
  };

  const handleNextClue = () => {
    if (clueIndex < currentFestival.clues.length - 1) {
      setClueIndex(clueIndex + 1);
    }
  };

  const handleGuess = (selectedOption: string) => {
    if (isAnswered) return;
    const isGuessCorrect = selectedOption.toLowerCase() === currentFestival.name.toLowerCase();
    if (isGuessCorrect) {
      const cluePoints = 3 - clueIndex;
      const newPoints = Math.max(1, cluePoints) * (gameMode === 'timed' ? 2 : 1);
      setScore(prevScore => prevScore + newPoints);
      setFeedback(`+${newPoints} points!`);
      setIsCorrect(true);
    } else {
      setFeedback(isNepali ? translations['Try again!'] : 'Try again!');
      setIsCorrect(false);
    }
    setGuess(selectedOption);
    setIsAnswered(true);
    setFestivalHistory(prev => [...prev, currentFestival.name]);
    if (gameMode === 'timed') setTimerActive(false);
  };

  const handleNextFestival = () => {
    let availableFestivals = festivals.filter(
      f => !festivalHistory.slice(-Math.min(3, festivals.length - 1)).includes(f.name)
    );
    if (availableFestivals.length === 0) {
      setFestivalHistory([currentFestival.name]);
      availableFestivals = festivals.filter(f => f.name !== currentFestival.name);
    }
    const nextIndex = Math.floor(Math.random() * availableFestivals.length);
    setCurrentFestival(availableFestivals[nextIndex]);
    generateOptions(availableFestivals[nextIndex].name);
    setClueIndex(0);
    setGuess('');
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedback('');
    if (gameMode === 'timed') {
      setTimeLeft(30);
      setTimerActive(true);
    }
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    setFeedback('Time\'s up!');
    setTimerActive(false);
  };

  const toggleLanguage = () => setIsNepali(!isNepali);

  const switchGameMode = (mode: 'standard' | 'timed') => {
    setGameMode(mode);
    restartGame();
  };

  const restartGame = () => {
    setScore(0);
    setFestivalHistory([]);
    shuffleFestivals();
    if (gameMode === 'timed') {
      setTimeLeft(30);
      setTimerActive(true);
    }
  };

  return (
    <div className="flex py-12 justify-center items-center ">
    <div className="flex flex-col py-16 px-8 bg-gradient-to-b from-[#FFFFFF] via-[#F5F9F1] to-[#F0F7F4] rounded-xl shadow-2xl">
    <GuessFestivalHeader
  isNepali={isNepali}
  toggleLanguage={toggleLanguage}
  gameMode={gameMode}
  switchGameMode={switchGameMode}
  translations={translations}
/>
      <ScoreBoard
        score={score}
        gameMode={gameMode}
        timeLeft={timeLeft}
        isNepali={isNepali}
        translations={translations}
      />
      <div className="border-gray-800 border-2 rounded-md p-8 max-w-2xl w-full">
        <QuizSection
          currentFestival={currentFestival}
          isAnswered={isAnswered}
          options={options}
          handleGuess={handleGuess}
          isNepali={isNepali}
          translations={translations}
        />
        <AnswerReveal
  isAnswered={isAnswered}
  isCorrect={isCorrect}
  feedback={feedback}
  currentFestival={currentFestival}
  isNepali={isNepali}
  translations={translations}
  handleNextFestival={handleNextFestival}
  restartGame={restartGame}
  handleShareScore={handleShareScore} // Add this
  score={score} // Add this
/>
      </div>
    </div>
    </div>
  );
}