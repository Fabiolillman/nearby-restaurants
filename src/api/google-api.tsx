import axios from 'axios';

const API_KEY = 'TNjxnuqwaU-6Ck4rnXiOaax0eVyMD5zYEjtMJOxRSIY';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Restaurant {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
  distance: number; 
}

export const fetchRestaurants = async (location: Location): Promise<Restaurant[]> => {
  try {
    const response = await axios.get('https://discover.search.hereapi.com/v1/discover', {
      params: {
        q: 'restaurants',
        at: `${location.latitude},${location.longitude}`,
        limit: 10,
        apiKey: API_KEY,
      },
    });

    return response.data.items.map((item: any) => ({
      title: item.title,
      position: {
        lat: item.position.lat,
        lng: item.position.lng,
      },
      distance: item.distance,
    }));
  } catch (error: any) {
    throw new Error(error.response.data.error || 'Error fetching restaurants');
  }
};
