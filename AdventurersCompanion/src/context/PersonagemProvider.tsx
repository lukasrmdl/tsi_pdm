/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect, createContext} from 'react';
import {QuerySnapshot} from '@firebase/firestore-types';

interface PersonagemData {
  uid: string;
  Nome: string;
  Classe: string;
  Subclasse: string;
  Nível: number;
}

interface PersonagemContextType {
  personagens: any | null;
  setPersonagens: (user: any | null) => void;
  getPersonagens: () => void;
}

export const PersonagensContext = createContext<PersonagemContextType>({
  personagens: null,
  setPersonagens: () => {},
  getPersonagens: () => {},
});

export const PersonagemProvider = ({children}: {children: any}) => {
  const [personagens, setPersonagens] = useState<PersonagemData[]>([]);

  const getPersonagens = () => {
    useEffect(() => {
      const unsubscribe = firestore()
        .collection('Personagens')
        .onSnapshot(
          querySnapshot => {
            let d: PersonagemData[] = [];
            querySnapshot.forEach(doc => {
              const val: PersonagemData = {
                uid: doc.id,
                Nome: doc.data().Nome,
                Classe: doc.data().Classe,
                Subclasse: doc.data().Subclasse,
                Nível: doc.data().Nível,
              };
              d.push(val);
            });
            setPersonagens(d);
          },
          (e: Error) => {
            console.log('Personagens, getPersonagens: ' + e);
          },
        );
      return unsubscribe;
    }, []);
    return personagens;
  };
  return (
    <PersonagensContext.Provider
      value={{personagens, setPersonagens, getPersonagens}}>
      {children}
    </PersonagensContext.Provider>
  );
};
