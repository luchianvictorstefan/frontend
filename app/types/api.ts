// API Types based on swagger.json schema

// For creating new trips - no id field
export interface CreateTripDto {
  name: string;
  description: string;
  estimatedPrice: number;
  duration: number;
  budget: string;
  travelStyle: string;
  interests: string;
  groupType: string;
  country: string;
  imageUrls?: string[];
  itinerary: string;
  bestTimeToVisit: string[];
  weatherInfo: string[];
  locationCity: string;
  locationLatitude?: number;
  locationLongitude?: number;
  locationOpenStreetMap?: string;
  paymentLink?: string;
}

// For updating existing trips - includes id
export interface UpdateTripDto extends CreateTripDto {
  id: string;
}

// For retrieving trips - includes id
export interface TripDto extends CreateTripDto {
  id: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}