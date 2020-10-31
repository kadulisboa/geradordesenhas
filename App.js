import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import Home from './Home';
import Pass from './Pass';

const App = createSwitchNavigator({
  Home: {
    screen: Home,
  },
  Pass: {
    screen: Pass,
  },
});

export default createAppContainer(App);
