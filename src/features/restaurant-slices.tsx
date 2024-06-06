import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRestaurants, Location, Restaurant } from '../api/google-api';

interface RestaurantState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  currentLocation?: Location;
}

const initialState: RestaurantState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const fetchNearbyRestaurants = createAsyncThunk(
  'restaurants/fetchNearbyRestaurants',
  async (location: Location, { rejectWithValue }) => {
    try {
      const restaurants = await fetchRestaurants(location);
      return restaurants;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchNearbyRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default restaurantSlice.reducer;
export type { Location };
