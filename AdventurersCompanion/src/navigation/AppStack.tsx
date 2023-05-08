/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import * as React from 'react';

import Preload from '../screens/Preload';
import Personagens from '../screens/Personagens/Personagens';
import Grimorio from '../screens/Grimorio/Grimorio';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../assets/images/colors';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PreloadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Preload"
        component={Preload}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const icons: {
  [key: string]: {
    iconName: string;
    iconNameFocused: string;
  };
} = {
  Preload: {
    iconName: 'reload-outline',
    iconNameFocused: 'reload',
  },
  Personagens: {
    iconName: 'happy-outline',
    iconNameFocused: 'happy',
  },
  Grimorio: {
    iconName: 'book-outline',
    iconNameFocused: 'book',
  },
};

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="PreloadStack"
      screenOptions={({route}) => ({
        tabBarLabelStyle: {
          fontSize: 15,
          marginBottom: 3,
        },
        tabBarIcon: ({focused, color, size}) => {
          const {name} = route;
          const {iconName, iconNameFocused} = icons[name];
          const icon = focused ? iconNameFocused : iconName;

          return (
            <Ionicons
              name={icon}
              size={30}
              color={color}
              style={{marginTop: 5}}
            />
          );
        },
        tabBarStyle: {
          width: '100%',
          height: '9%',
          backgroundColor: COLORS.primaryBlue,
        },
        tabBarActiveTintColor: COLORS.primaryWhite,
        tabBarInactiveTintColor: COLORS.grey,
      })}>
      <Tab.Screen name="Personagens" component={Personagens} />
      <Tab.Screen name="Grimorio" component={Grimorio} />
    </Tab.Navigator>
  );
};

export default AppStack;
