import React, {createContext, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {DocumentData} from '@firebase/firestore-types';

interface AuthUserContextProps {
  user: any;
  signUp: (localUser: {[x: string]: any}, pass: string) => Promise<any>;
  signIn: (email: string, pass: string) => Promise<any>;
  getUser: (LocalUser: string) => Promise<any>;
  signOut: () => Promise<any>;
  retrieveUserSession: () => Promise<any>;
  forgotPass: (email: string) => Promise<any>;
}

export const AuthUserContext = createContext<AuthUserContextProps>({
  user: '',
  getUser: async () => false,
  signOut: async () => {},
  signUp: async () => {},
  signIn: async () => {},
  retrieveUserSession: async () => {},
  forgotPass: async () => false,
});

export const AuthUserProvider = ({children}: {children: any}) => {
  const [user, setUser] = useState<null | DocumentData>(null);

  async function storeUserSession(localEmail: any, pass: any) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email: localEmail,
          pass,
        }),
      );
    } catch (e) {
      console.error('AuthUserProvider, storeUserSession: ' + e);
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('AuthUserProvider, retrieveUserSession: ' + e);
    }
  }

  async function signUp(localUser: {[x: string]: any}, pass: string) {
    try {
      await auth().createUserWithEmailAndPassword(localUser.email, pass);
      await auth().currentUser?.sendEmailVerification();
      await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .set(localUser);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signIn(email: string, pass: string) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
      if (!auth().currentUser?.emailVerified) {
        return 'Você deve validar seu email para continuar.';
      }
      await storeUserSession(email, pass);
      if (await getUser(pass)) {
        return 'ok';
      } else {
        return 'Problemas ao buscar o seu perfil. Contate o administrador.';
      }
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function forgotPass(email: string) {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signOut() {
    try {
      setUser(null);
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async function getUser(pass: string) {
    try {
      let doc = await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .get();
      if (doc.exists) {
        doc!.data()!.uid = auth().currentUser?.uid;
        doc!.data()!.pass = pass;
        let docData = doc!.data();
        setUser(docData!);
        return doc.data();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  //função utilitária
  function launchServerMessageErro(e: any) {
    switch (e.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return (
    <AuthUserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        retrieveUserSession,
        forgotPass,
        signOut,
        getUser,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
