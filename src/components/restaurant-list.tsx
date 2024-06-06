import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearbyRestaurants, Location } from '../features/restaurant-slices';
import { RootState, AppDispatch } from '../store/store';
import styled from 'styled-components';

const RestaurantFetcher: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { restaurants, loading, error } = useSelector((state: RootState) => state.restaurants);

  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  useEffect(() => {
    const uniqueCategories = [...new Set(restaurants.map((restaurant) => restaurant.category))];
    setCategories(uniqueCategories);
  }, [restaurants]);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = restaurants.filter((restaurant) => restaurant.category === selectedCategory);
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [restaurants, selectedCategory]);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <Wrapper>
        <div>Loading...</div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <div>{error}</div>
      </Wrapper>
    );
  }

  if (filteredRestaurants.length === 0) {
    return (
      <Wrapper>
        <div>No restaurants found.</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
      <h1>Restaurant Finder</h1>
        
        <div>
          <h3>Category filter</h3>
          <button onClick={handleClearFilter}>Clear Filter</button>
          {categories.map((category, index) => (
            <button key={index} onClick={() => handleCategoryFilter(category)}>
              {category}
            </button>
          ))}
        </div>

        <h2>Nearby restaurants</h2>

        <ul>
          {filteredRestaurants.map((restaurant, index) => (
            <li key={index}>
              <strong>{restaurant.title}</strong> - {(restaurant.distance / 1000).toFixed(2)} km away
              <p>Category: {restaurant.category}</p>
              {restaurant.contact !== 'Unknown' && <p>Contact: {restaurant.contact}</p>}
              {/* {restaurant.contact && <p>Contact: {restaurant.contact}</p>} */}
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  background-color: #dbd8d8;
  padding: 20px;
  font-family: 'Roboto', sans-serif;

  div {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;

    h1 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    h2 {
      margin: 3rem 0;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
    }

    strong {
      font-weight: bold;
    }

    p {
      margin-bottom: 10px;
      color: #555;
      font-size: 18px;
      line-height: 1.4;
    }

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      margin-right: 10px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
      font-size: 16px;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .filter-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    button {
      margin-right: 10px;
    }
  }

  .clear-filter {
    margin-left: auto;
    background-color: #dc3545;
    font-size: 16px;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #c82333;
    }
  }

  .category-filter {
    display: flex;
    flex-wrap: wrap;

    button {
      background-color: #6c757d;
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 16px;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #5a6268;
      }
    }

    .active {
      background-color: #007bff;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

export default RestaurantFetcher;
