import type { CreateTripDto, TripDto } from '~/types/api';
import type { TravelItinerary } from '~/types/travel';

// Map API TripDto to frontend TravelItinerary
export function mapApiToFrontend(apiTrip: TripDto): TravelItinerary {
  return {
    id: (apiTrip as any).id || '',
    name: apiTrip.name,
    description: apiTrip.description,
    estimatedPrice: `$${apiTrip.estimatedPrice.toLocaleString()}`,
    duration: apiTrip.duration,
    budget: apiTrip.budget,
    travelStyle: apiTrip.travelStyle,
    interests: apiTrip.interests,
    groupType: apiTrip.groupType,
    country: apiTrip.country,
    imageUrls: apiTrip.imageUrls,
    itinerary: apiTrip.itinerary || '',
    bestTimeToVisit: apiTrip.bestTimeToVisit || [],
    weatherInfo: apiTrip.weatherInfo || [],
    location: {
      city: apiTrip.locationCity,
      coordinates: [apiTrip.locationLatitude, apiTrip.locationLongitude],
      openStreetMap: apiTrip.locationOpenStreetMap
    },
    payment_link: apiTrip.paymentLink
  };
}

// Map frontend TravelItinerary to API CreateTripDto (for creating new trips)
export function mapFrontendToCreateApi(frontendTrip: Omit<TravelItinerary, 'id'>): CreateTripDto {
  return {
    name: frontendTrip.name,
    description: frontendTrip.description,
    estimatedPrice: parseFloat(frontendTrip.estimatedPrice.replace(/[$,]/g, '')),
    duration: frontendTrip.duration,
    budget: frontendTrip.budget,
    travelStyle: frontendTrip.travelStyle,
    interests: frontendTrip.interests,
    groupType: frontendTrip.groupType,
    country: frontendTrip.country,
    imageUrls: frontendTrip.imageUrls,
    locationCity: frontendTrip.location.city,
    locationLatitude: frontendTrip.location.coordinates?.[0],
    locationLongitude: frontendTrip.location.coordinates?.[1],
    locationOpenStreetMap: frontendTrip.location.openStreetMap,
    paymentLink: frontendTrip.payment_link,
    itinerary: frontendTrip.itinerary || '',
    bestTimeToVisit: frontendTrip.bestTimeToVisit || [],
    weatherInfo: frontendTrip.weatherInfo || []
  };
}

// Map frontend TravelItinerary to API TripDto (for updating existing trips)
export function mapFrontendToApi(frontendTrip: TravelItinerary): TripDto {
  return {
    id: frontendTrip.id,
    name: frontendTrip.name,
    description: frontendTrip.description,
    estimatedPrice: parseFloat(frontendTrip.estimatedPrice.replace(/[$,]/g, '')),
    duration: frontendTrip.duration,
    budget: frontendTrip.budget,
    travelStyle: frontendTrip.travelStyle,
    interests: frontendTrip.interests,
    groupType: frontendTrip.groupType,
    country: frontendTrip.country,
    imageUrls: frontendTrip.imageUrls,
    locationCity: frontendTrip.location.city,
    locationLatitude: frontendTrip.location.coordinates?.[0],
    locationLongitude: frontendTrip.location.coordinates?.[1],
    locationOpenStreetMap: frontendTrip.location.openStreetMap,
    paymentLink: frontendTrip.payment_link,
    itinerary: frontendTrip.itinerary || '',
    bestTimeToVisit: frontendTrip.bestTimeToVisit || [],
    weatherInfo: frontendTrip.weatherInfo || []
  };
}

// Convenience functions for arrays
export function mapApiListToFrontend(apiTrips: TripDto[]): TravelItinerary[] {
  return apiTrips.map(mapApiToFrontend);
}

export function mapFrontendListToApi(frontendTrips: TravelItinerary[]): TripDto[] {
  return frontendTrips.map(mapFrontendToApi);
}