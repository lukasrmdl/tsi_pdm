/* eslint-disable semi */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useState, useEffect, createContext} from 'react';
import {QuerySnapshot} from '@firebase/firestore-types';

export default interface PersonagemData {
  uid: string;
  Nome: string;
  Classe: string;
  Subclasse: string;
  Nivel: string;
}

interface PersonagemContextType {
  personagens: any | null;
  setPersonagens: (user: any | null) => void;
  save: ({personagem}: {personagem: any}) => Promise<boolean>;
  del: ({uid}: {uid: any}) => Promise<boolean>;
}

export const PersonagensContext = createContext<PersonagemContextType>({
  personagens: null,
  setPersonagens: () => {},
  save: function ({personagem}: {personagem: any}): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  del: function ({uid}: {uid: any}): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
});

export const PersonagemProvider = ({children}: {children: any}) => {
  const [personagens, setPersonagens] = useState<PersonagemData[]>([]);
  const db = firebase.firestore();
  const colPersonagens = db.collection('Personagens');

  useEffect(() => {
    const listener = firestore()
      .collection('Personagens')
      .orderBy('Nome')
      .onSnapshot(snapShot => {
        let data: PersonagemData[] = [];
        snapShot.forEach(doc => {
          data.push({
            uid: doc.id,
            Nome: doc.data().Nome,
            Classe: doc.data().Classe,
            Subclasse: doc.data().Subclasse,
            Nivel: doc.data().Nivel,
          });
        });
        setPersonagens(data);
      });

    return () => {
      listener();
    };
  }, []);

  const save = async ({personagem}: {personagem: any}) => {
    try {
      await firestore().collection('Personagens').doc(personagem.uid).set(
        {
          Nome: personagem.Nome,
          Classe: personagem.Classe,
          Subclasse: personagem.Subclasse,
          Nivel: personagem.Nivel,
        },
        {merge: true},
      );
      return true;
    } catch (e) {
      console.error('PersonagemProvider, salvar: ' + e);
      return false;
    }
  };

  const del = async ({uid}: {uid: any}) => {
    try {
      await firestore().collection('Personagens').doc(uid).delete();
      return true;
    } catch (e) {
      console.error('PersonagemProvider, del: ', e);
      return false;
    }
  };

  return (
    <PersonagensContext.Provider
      value={{personagens, setPersonagens, save, del}}>
      {children}
    </PersonagensContext.Provider>
  );
};
