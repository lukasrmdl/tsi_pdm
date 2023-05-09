/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect, createContext} from 'react';
import {QuerySnapshot} from '@firebase/firestore-types';

interface PersonagemData {
  id: string;
  nome: string;
  classe: string;
  subclasse: string;
  nivel: number;
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
                id: doc.id,
                nome: doc.data().nome,
                classe: doc.data().classe,
                subclasse: doc.data().subclasse,
                nivel: doc.data().nivel,
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
