import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import * as React from 'react';
import Home from './src/screens/Home/Home';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn/SignIn';
import IndexPersonagens from './src/screens/Personagens/IndexPersonagens';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/images/colors';
import ForgotPassWord from './src/screens/ForgotPassWord/ForgotPassWord';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryBlue} />
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Home" component={Home} options={homeStyle} />
        <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
        <Stack.Screen name="SignUp" component={SignUp} options={SignUpStyle} />
        <Stack.Screen
          name="ForgotPassWord"
          component={ForgotPassWord}
          options={forgotPassWordStyle}
        />
        <Stack.Screen name="Personagens" component={IndexPersonagens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const signInStyle = {
  title: 'Bem vindo!',
  headerStyle: {backgroundColor: COLORS.primaryWhite},
  headerTitleStyle: {color: COLORS.primaryBlue, fontSize: 23},
};

const homeStyle = {
  title: 'Inicio',
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
