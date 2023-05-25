import React, {createContext, useEffect, useState} from 'react';
import {create, ApisauceInstance} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext<any>({});

export const ApiProvider = ({children}: {children: React.ReactNode}) => {
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

            setApi(apiLocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, getApi: ' + e);
        });
    }
  };

  useEffect(() => {
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        getApi();
      }
    });

    return unsubscriber;
  }, []);

  return <ApiContext.Provider value={{api}}>{children}</ApiContext.Provider>;
};
