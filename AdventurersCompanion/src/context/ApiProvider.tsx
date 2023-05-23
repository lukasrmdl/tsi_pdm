import React, {createContext, useEffect, useState} from 'react';
import {ApisauceInstance, create} from 'apisauce';
import auth from '@react-native-firebase/auth';

interface ApiProviderProps {
  children: React.ReactNode;
}

interface ApiContextProps {
  api: ApisauceInstance | null;
}

export const ApiContext = createContext<ApiContextProps>({api: null});

export const ApiProvider: React.FC<ApiProviderProps> = ({children}) => {
  const [api, setApi] = useState<ApisauceInstance | null>(null);

  const getApi = () => {
    if (auth().currentUser) {
      auth()
        .currentUser?.getIdToken(true)
        .then(idToken => {
          if (idToken) {
            const apiLocal = create({
              baseURL:
                'https://firestore.googleapis.com/v1/projects/adventurer-s-companion-36c8c/databases/(default)/documents/',
              headers: {Authorization: 'Bearer ' + idToken},
            });

            apiLocal.addResponseTransform(response => {
              if (!response.ok) {
                throw response;
              }
            });

            // coloca no state
            setApi(apiLocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, getApi: ' + e);
        });
    }
  };

  useEffect(() => {
    // cria um listener para o estado da sessão
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        getApi();
      }
    });

    return () => {
      unsubscriber(); // unsubscribe o listener ao desmontar
    };
  }, []);

  return <ApiContext.Provider value={{api}}>{children}</ApiContext.Provider>;
};
