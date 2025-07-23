const API_BASE_URL = 'http://localhost:8081/api';

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

import type { TripDto, CreateTripDto, UpdateTripDto, PaginatedResponse } from '~/types/api';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorData = await response.json();
          // Handle Spring Boot validation errors
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }

          // Handle field validation errors
          if (errorData.errors) {
            const fieldErrors = Object.entries(errorData.errors)
              .map(([field, message]) => `${field}: ${message}`)
              .join(', ');
            errorMessage = `${errorMessage}. ${fieldErrors}`;
          }
        } catch {
          // If response is not JSON, use response text
          const text = await response.text();
          if (text) errorMessage = text;
        }

        throw {
          message: errorMessage,
          status: response.status,
          details: null
        } as ApiError;
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      // Re-throw if it's already our ApiError
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }

      // Network or other errors
      const errorMessage = error instanceof Error
        ? (error.message.includes('fetch') ? 'Unable to connect to the server' : error.message)
        : 'Something went wrong on our end. Please try again later.';

      throw {
        message: errorMessage,
        status: 0,
      } as ApiError;
    }
  }

}
