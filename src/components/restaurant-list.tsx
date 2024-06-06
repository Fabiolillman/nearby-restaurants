import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearbyRestaurants, Location } from '../features/restaurant-slices';
import { RootState, AppDispatch } from '../store/store';

const RestaurantFetcher: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            dispatch(fetchNearbyRestaurants(location));
          },
          (error) => {
            console.error('Error getting current location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getCurrentLocation();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div>
      <h1>Nearby Restaurants</h1>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={index}>
            <strong>{restaurant.title}</strong> - {restaurant.distance} meters away
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantFetcher;
