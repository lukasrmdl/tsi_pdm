import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';

const Home = () => {
  const [contador, setContador] = useState(0);

  //1.ComponentDidMount
  useEffect(() => {
    console.log('Montou o componente.');
  }, []);

  //2.ComponentDidUpdate
  useEffect(() => {
    console.log('Atualizou o componente.');
  }, []);

  //3.ComponentDidUpdate_contador
  useEffect(() => {
    console.log('Atualizou o componente do contador.');
  }, [contador]);

  const contar = () => {
    setContador(contador + 1);
  };
  const resetar = () => {
    setContador(0);
  };

  return (
    <View>
      <Text style={styles.textoMain}>Olá Aventureiro, Bem vindo!</Text>
      <Text style={styles.textoMain}>Contador = {contador}</Text>
      <PrimaryButton texto="Contar" onClick={contar} />
      <PrimaryButton texto="Resetar" onClick={resetar} />
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
