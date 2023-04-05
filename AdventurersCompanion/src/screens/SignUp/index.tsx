/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {Alert} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import {Body, Text, TextInput} from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const SignUp = ({navigation}: {navigation: any}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          let userF = auth().currentUser;
          userF
            ?.sendEmailVerification()
            .then(() => {
              Alert.alert(
                'Informação',
                'Foi enviado um email para o endereço: ' +
                  email +
                  '  para a verificação.',
              );
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'SignIn'}],
                }),
              );
            })
            .catch(e => {
              console.log('SignUp: erro em cadastrar(): ' + e);
            });
        })
        .catch(e => {
          console.log('SignUp: erro em cadastrar(): ' + e);
          switch (e.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Erro', 'O email já está em uso!');
              break;
            case 'auth/operation-not-allowed':
              Alert.alert(
                'Erro',
                'foram encontrados problemas ao realizar o cadastro!',
              );
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido!');
              break;
            case 'auth/weak-password':
              Alert.alert(
                'Erro',
                'A senha escolhida é fraca, por favor digite uma senha forte!',
              );
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Por favor, verifique e digite todos os campos.');
    }
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
function then(arg0: () => void) {
  throw new Error('Function not implemented.');
}
