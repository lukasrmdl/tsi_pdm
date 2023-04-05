import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native';
import {COLORS} from '../../assets/images/colors';
import PrimaryButton from '../../components/PrimaryButton';
import auth from '@react-native-firebase/auth';

const ForgotPassWord = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      console.log(email);
      auth()
        .sendPasswordResetEmail(email)
        .then(_r => {
          Alert.alert(
            'Atenção',
            'Enviamos um email de recuperação de senha para o seguinte endereço: ' +
              email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          console.log('ForgotPassWord, erro em recover(): ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não encontrado!');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido!');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário Desabilitado!');
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Por favor, digite o email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTittle}>Esqueceu sua senha?</Text>
      <Text style={styles.textNormal}>
        Informe seu e-mail cadastrado para podermos recuperar.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <PrimaryButton texto="Recuperar" onClick={recover} />
    </View>
  );
};

export default ForgotPassWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '85%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 40,
  },
  textNormal: {
    fontSize: 15,
    color: COLORS.primaryBlue,
    alignSelf: 'center',
    marginTop: 15,
    marginRight: 25,
    marginLeft: 4,
  },
  textTittle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryBlue,
    alignSelf: 'center',
    marginTop: 15,
    marginRight: 25,
  },
});
