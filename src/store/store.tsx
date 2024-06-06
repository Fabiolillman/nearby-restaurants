import { configureStore } from '@reduxjs/toolkit';
import restaurantSlices from '../features/restaurant-slices';

const store = configureStore({
  reducer: {
    restaurants: restaurantSlices,
  },
});

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Restaurant = {
  title: string;
  position: Coordinates;
  distance: number; // Add distance property to include distance information
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
