export interface Temple {
  id: string;
  name: string;
  location: string;
  district: string;
  type: string;
  built?: string;
  deity?: string;
  description?: string;
  imagePath: string;
  alternativeNames?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  acceptableAnswers?: string[];  // Common variations of the temple name that should be accepted
  category?: 'all' | 'kathmandu_valley';  // Category of the temple
  points?: number;  // Points awarded for correct guess
} 