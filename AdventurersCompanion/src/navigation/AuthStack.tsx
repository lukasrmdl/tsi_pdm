import 'react-native-gesture-handler';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {COLORS} from '../assets/images/colors';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassWord from '../screens/ForgotPassWord/ForgotPassWord';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />
      <Stack.Screen name="SignUp" component={SignUp} options={SignUpStyle} />
      <Stack.Screen
        name="ForgotPassWord"
        component={ForgotPassWord}
        options={forgotPassWordStyle}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

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
