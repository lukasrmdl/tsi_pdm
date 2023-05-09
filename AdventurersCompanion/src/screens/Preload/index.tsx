import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect} from 'react';
import {Container, Image} from './styles';
import {CommonActions} from '@react-navigation/native';
import {PersonagensContext} from '../../context/PersonagemProvider';

const Preload = ({navigation}: {navigation: any}) => {
  console.log(navigation);
  const {getPersonagens} = useContext(PersonagensContext);
  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      //Alert.alert(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('SignIn: erro em getUserCache(): ' + e);
    }
  };

  const loginUser = async () => {
    const user = await getUserCache();
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Personagens'}],
        }),
      );
    } else {
      //navigation.dispatch(
      //  CommonActions.reset({
      //    index: 0,
      //   routes: [{name: 'SignIn'}],
      //  }),
      //);
    }
  };

  useEffect(() => {
    loginUser();
    const unsubscribePersonagens = getPersonagens();

    return () => {
      unsubscribePersonagens;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
