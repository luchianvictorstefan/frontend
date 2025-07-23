export interface Activity {
  time: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  location: string;
  activities: Activity[];
}

export interface Location {
  city: string;
  coordinates: [number | undefined, number | undefined];
  openStreetMap: string | undefined;
}

export interface TravelItinerary extends TravelFormData {
  id: string;
  payment_link: string | undefined;
}

export interface TravelFormData {
  name: string;
  description: string;
  estimatedPrice: string;
  duration: number;
  budget: string;
  travelStyle: string;
  interests: string;
  groupType: string;
  country: string;
  imageUrls: string[] | undefined;
  itinerary: string;
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: Location;
}