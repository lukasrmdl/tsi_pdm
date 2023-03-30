import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import {COLORS} from '../../assets/images/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const SignIn = (props: any) => {
  console.log(props, app, auth);
  const recuperarSenha = () => {
    Alert.alert('abrir modal recuperar senha');
  };
  const entrar = () => {
    Alert.alert('logar no sistema');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <PrimaryButton texto="Acessar" onClick={entrar} />
        </View>

        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOut}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textCadastrarSe}>Cadastre-se</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.primaryBlue,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: COLORS.primaryWhite,
    borderRadius: 5,
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: COLORS.primaryWhite,
    borderRadius: 5,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    MarginBottom: 5,
  },
  input: {
    width: '85%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: COLORS.primaryBlue,
    alignSelf: 'flex-end',
    marginTop: 15,
    marginBottom: 30,
    marginRight: 25,
  },
  divOuHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: -7,
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
  },
  textOut: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    color: COLORS.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: COLORS.accentBlue,
    marginLeft: 5,
  },
});
