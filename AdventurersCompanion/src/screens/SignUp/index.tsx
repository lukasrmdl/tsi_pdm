/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {Alert} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import {Body, Text, TextInput} from './styles';

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirPass, setConfirmPass] = useState('');

  const cadastrar = () => {
    Alert.alert('foi');
  };

  return (
    <Body>
      <Text>Preencha os campos para se cadastrar!</Text>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
      />
      <TextInput
        placeholder="Email "
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha "
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar Senha "
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setConfirmPass(t)}
      />
      <PrimaryButton texto="Cadastrar" onClick={cadastrar} />
    </Body>
  );
};

export default SignUp;
