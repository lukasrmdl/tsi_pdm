import 'react-native-gesture-handler';
import * as React from 'react';

import Preload from '../screens/Preload';
import Personagens from '../screens/Personagens/Personagens';
import Grimorio from '../screens/Grimorio/Grimorio';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Preload">
      <Stack.Screen name="Preload" component={Preload} options={PreloadStyle} />
      <Stack.Screen name="Personagens" component={Personagens} />
      <Stack.Screen name="Grimorio" component={Grimorio} />
    </Stack.Navigator>
  );
};

export default AppStack;

const PreloadStyle = {
  headerShown: false,
};
