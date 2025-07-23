import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TravelItinerary } from '~/types/travel';

interface TravelState {
  itineraries: TravelItinerary[];
  selectedItinerary: TravelItinerary | null;
}

const initialState: TravelState = {
  itineraries: [],
  selectedItinerary: null,
};


const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    setItineraries: (state, action: PayloadAction<TravelItinerary[]>) => {
      state.itineraries = action.payload;
    },
    setSelectedItinerary: (state, action: PayloadAction<TravelItinerary | null>) => {
      state.selectedItinerary = action.payload;
    },
    addItinerary: (state, action: PayloadAction<TravelItinerary>) => {
      state.itineraries.unshift(action.payload);
    },
    updateItinerary: (state, action: PayloadAction<TravelItinerary>) => {
      const index = state.itineraries.findIndex(itinerary => itinerary.id === action.payload.id);
      if (index !== -1) {
        state.itineraries[index] = action.payload;
      }
      if (state.selectedItinerary?.id === action.payload.id) {
        state.selectedItinerary = action.payload;
      }
    },
    deleteItinerary: (state, action: PayloadAction<string>) => {
      state.itineraries = state.itineraries.filter(itinerary => itinerary.id !== action.payload);
      if (state.selectedItinerary?.id === action.payload) {
        state.selectedItinerary = null;
      }
    },
    clearSelectedItinerary: (state) => {
      state.selectedItinerary = null;
    },
  }
});

export const {
  setItineraries,
  setSelectedItinerary,
  addItinerary,
  updateItinerary,
  deleteItinerary,
  clearSelectedItinerary,
} = travelSlice.actions;

export default travelSlice.reducer;