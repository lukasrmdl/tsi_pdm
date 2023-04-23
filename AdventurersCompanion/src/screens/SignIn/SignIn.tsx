import React, {useState} from 'react';
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
import {CommonActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}: {navigation: any}) => {
  console.log(app, AsyncStorage);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const recuperarSenha = () => {
    navigation.navigate('ForgotPassWord');
  };
  const storeUserCache = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      console.log('SignIn: erro em storeUserCache(): ' + e);
    }
  };
  const getUser = () => {
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          storeUserCache(doc.data());
        } else {
          console.log('O documento não existe na base de dados!');
        }
      })
      .catch(e => {
        console.log('SignIn: erro em getUser(): ' + e);
      });
  };
  const cadastrar = () => {
    navigation.navigate('SignUp');
  };
  const entrar = () => {
    if (email !== '' && pass !== '') {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          if (!auth().currentUser?.emailVerified) {
            Alert.alert(
              'Alerta',
              'Você deve verificar o seu email para prosseguir.',
            );
            return;
          }
          getUser();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        })
        .catch(e => {
          console.log('SignIn: erro em entrar(): ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não encontrado!');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Senha inválida!');
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
      Alert.alert('Erro', 'Por favor, digite os campos de email e senha.');
    }
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPass(t)}
          />
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
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>
              Cadastre-se
            </Text>
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
    marginBottom: 5,
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
