import React, {createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthUserContext} from './AuthUserProvider';

export const UserContext = createContext({});

export const UserProvider = ({children}: {children: any}) => {
  const {getUser, signOut} = useContext(AuthUserContext);

  const save = async (user: {
    uid: string | undefined;
    nome: any;
    pass: any;
  }) => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({nome: user.nome}, {merge: true});
      //renew user in session
      if (await getUser(user.pass)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const del = async (uid: string | undefined) => {
    try {
      await firestore().collection('users').doc(uid).delete();
      await auth().currentUser!.delete();
      await signOut();
      return true;
    } catch (e) {
      return false;
    }
  };

  async function updatePassword(pass: string) {
    try {
      await auth().currentUser!.updatePassword(pass);
      return true;
    } catch (e) {
      console.error('updatePassword' + e);
      return false;
    }
  }

  return (
    <UserContext.Provider value={{save, del, updatePassword}}>
      {children}
    </UserContext.Provider>
  );
};
