import React from 'react';
import { Provider } from 'react-redux'; 
import RestaurantFetcher from './components/restaurant-list';

import store from './store/store'; 

const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <div>
        <h1>Restaurant Finder</h1>
        <RestaurantFetcher /> 
      </div>
    </Provider>
  );
};

export default App;
