import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}: {navigation: any}) => {
  //1.ComponentDidMount
  useEffect(() => {
    console.log('Montou o componente.');
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      //Alert.alert(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('SignIn: erro em getUserCache(): ' + e);
    }
  };

  //2.ComponentDidUpdate
  useEffect(() => {
    console.log('Atualizou o componente.');
  }, []);

  const entrarPersonagens = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Personagens'}],
      }),
    );
  };
  return (
    <View>
      <Text style={styles.textoMain}>Olá Aventureiro, Bem vindo!</Text>
      <PrimaryButton texto="Personagens" onClick={entrarPersonagens} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  textoMain: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10,
  },
});
