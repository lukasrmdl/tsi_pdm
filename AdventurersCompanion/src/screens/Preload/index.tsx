import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Container, Image} from './styles';
// import auth from '@react-native-firebase/auth';
// import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

const Preload = ({navigation}: {navigation: any}) => {
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
      /* auth()
        .signInWithEmailAndPassword(user.email, user.pass)
        .then(() => {
        })
        .catch(e => {
          console.log('SignIn: erro em entrar: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Erro na senha.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        }); */
    } else {
      //navigation.dispatch(
      //  CommonActions.reset({
      //    index: 0,
      //    routes: [{name: 'SignIn'}],
      //  }),
      //);
    }
  };

  useEffect(() => {
    loginUser();
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
