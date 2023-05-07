import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthUserContext} from '../context/AuthUserProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {COLORS} from '../assets/images/colors';
import {StatusBar} from 'react-native';

export default function Routes() {
  const {user, setUser} = useContext(AuthUserContext);
  console.log(AppStack, AuthStack, user);

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null);
    });
    return unsubscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryBlue} />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
