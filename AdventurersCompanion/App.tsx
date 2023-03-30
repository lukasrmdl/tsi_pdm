import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import * as React from 'react';
import Home from './src/screens/Home/Home';
import SignUp from './src/screens/SignUp/SignUp';
import SignIn from './src/screens/SignIn/SignIn';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/images/colors';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryBlue} />
      <Stack.Navigator initialRouteName="Bem vindo">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Bem vindo"
          component={SignIn}
          options={singInStyle}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const singInStyle = {
  tittle: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.primaryWhite},
  headerTittleStyle: {color: COLORS.primaryBlue},
};
