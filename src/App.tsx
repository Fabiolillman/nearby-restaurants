import React from 'react';
import { Provider } from 'react-redux'; 
import RestaurantFetcher from './components/restaurant-list';

import store from './store/store'; 

const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <div>
        <RestaurantFetcher /> 
      </div>
    </Provider>
  );
};

export default App;
