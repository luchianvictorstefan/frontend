import { apiClient } from './api-client';
import { mapApiToFrontend } from './mappers';

export async function tripsLoader() {
  try {
    const apiTrips = await apiClient.getAllTrips();
    return apiTrips.map(mapApiToFrontend);
  } catch (error) {
    console.error('Failed to load trips:', error);
    throw new Response('Failed to load trips', { status: 500 });
  }
}

export async function tripDetailLoader({ params }: { params: { tripId?: string } }) {
  const { tripId } = params;

  if (!tripId) {
    throw new Response('Trip ID is required', { status: 400 });
  }

  try {
    const apiTrip = await apiClient.getTripById(tripId);
    return mapApiToFrontend(apiTrip);
  } catch (error) {
    console.error('Failed to load trip:', error);
    throw new Response('Trip not found', { status: 404 });
  }
}