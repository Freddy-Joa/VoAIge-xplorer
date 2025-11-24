export interface TripRequest {
  destination: string;
  origin: string;
  dates: string;
  budget: 'Budget' | 'Moderate' | 'Luxury';
  travelers: string;
  interests: string;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'food' | 'sightseeing' | 'transport' | 'relax';
  location?: string;
  imagePrompt: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface Suggestion {
  name: string;
  description: string;
  priceRange: string;
  imagePrompt: string;
}

export interface Itinerary {
  destination: string;
  summary: string;
  days: DayPlan[];
  accommodation: Suggestion;
  transport: Suggestion;
  localDish: Suggestion;
}

export interface LogisticsData {
  markdown: string;
  sources: { title: string; uri: string }[];
}

export interface Translation {
  original: string;
  translated: string;
  pronunciation: string;
}