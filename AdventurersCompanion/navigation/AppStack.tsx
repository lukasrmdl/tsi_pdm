import 'react-native-gesture-handler';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Preload from '../src/screens/Preload';
import Personagens from '../src/screens/Personagens/Home';
import Grimorio from '../src/screens/Grimorio';

const Stack = createNativeStackNavigator();

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
