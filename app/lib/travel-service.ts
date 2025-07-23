import type { TripDto, CreateTripDto, UpdateTripDto, PaginatedResponse } from '~/types/api'
import { ApiClient } from './api-client';

class TravelService extends ApiClient {

    constructor() {
        super();
    }
    // Trip API methods
    async getAllTrips() {
        return this.request<TripDto[]>('/trips');
    }

    async getTripById(id: string) {
        return this.request<TripDto>(`/trips/${id}`);
    }

    async getTripsByTravelStyle(style: string) {
        return this.request<TripDto[]>(`/trips/travel-style/${encodeURIComponent(style)}`);
    }

    async getTripsByCountry(country: string) {
        return this.request<TripDto[]>(`/trips/country/${encodeURIComponent(country)}`);
    }

    async searchTrips(query: string) {
        return this.request<TripDto[]>(`/trips/search?query=${encodeURIComponent(query)}`);
    }

    async getTripsPaged(page = 0, size = 20, sort?: string[]) {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
        });

        if (sort?.length) {
            sort.forEach(s => params.append('sort', s));
        }

        return this.request<PaginatedResponse<TripDto>>(`/trips/paged?${params}`);
    }

    async createTrip(trip: CreateTripDto) {
        return this.request<TripDto>('/trips', {
            method: 'POST',
            body: JSON.stringify(trip),
        });
    }

    async updateTrip(id: string, trip: UpdateTripDto) {
        return this.request<TripDto>(`/trips/${id}`, {
            method: 'PUT',
            body: JSON.stringify(trip),
        });
    }

    async deleteTrip(id: string) {
        return this.request<void>(`/trips/${id}`, {
            method: 'DELETE',
        });
    }
}

export const travelService = new TravelService();