/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassWord from '../screens/ForgotPassWord/ForgotPassWord';
import {COLORS} from '../assets/images/colors';
import Personagens from '../screens/Personagens/Personagens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Grimorio from '../screens/Grimorio/Grimorio';
import {StatusBar} from 'react-native';
import Preload from '../screens/Preload';
import Personagem from '../screens/Personagem';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Preload">
    <Stack.Screen name="Preload" component={Preload} options={signInStyle} />
    <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
    <Stack.Screen name="SignUp" component={SignUp} options={SignUpStyle} />
    <Stack.Screen
      name="ForgotPassWord"
      component={ForgotPassWord}
      options={forgotPassWordStyle}
    />
  </Stack.Navigator>
);

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
  Personagem: {
    iconName: 'people-outline',
    iconNameFocused: 'people',
  },
};

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Personagens"
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
      tabBarHideOnKeyboard: true,
    })}>
    <Tab.Screen name="Personagens" component={Personagens} />
    <Tab.Screen name="Grimorio" component={Grimorio} />
  </Tab.Navigator>
);

const Navigator = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={COLORS.primaryBlue} />
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
      <Stack.Screen
        component={Personagem}
        name="Personagem"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default Navigator;

const signInStyle = {
  title: 'Bem vindo!',
  headerStyle: {backgroundColor: COLORS.primaryWhite},
  headerTitleStyle: {color: COLORS.primaryBlue, fontSize: 23},
};

const forgotPassWordStyle = {
  title: 'Recuperação de Senha',
  headerStyle: {backgroundColor: COLORS.primaryWhite},
  headerTitleStyle: {color: COLORS.primaryBlue, fontSize: 23},
};

const SignUpStyle = {
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primaryWhite},
  headerTitleStyle: {
    color: COLORS.primaryBlue,
    fontSize: 23,
  },
  headerTintColor: COLORS.primaryBlue,
};
