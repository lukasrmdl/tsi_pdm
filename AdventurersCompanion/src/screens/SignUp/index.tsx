import React from 'react';
import {Alert} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import {Body, Text, TextInput} from './styles';

const SignUp = () => {
  const cadastrar = () => {
    Alert.alert('foi');
  };

  return (
    <Body>
      <Text>Preencha os campos para se cadastrar!</Text>
      <TextInput />
      <TextInput />
      <TextInput />
      <TextInput />
      <PrimaryButton texto="Cadastrar" onClick={cadastrar} />
    </Body>
  );
};

export default SignUp;
