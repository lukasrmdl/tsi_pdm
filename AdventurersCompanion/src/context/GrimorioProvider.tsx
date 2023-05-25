/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ApiContext} from '../context/ApiProvider';

interface Magic {
  Nome: string;
  Escola: string;
  Nivel: string;
  uid: string;
}

export const GrimorioContext = createContext<any>({});

export const GrimorioProvider = ({children}: {children: React.ReactNode}) => {
  const [GrimorioMagias, setGrimorioMagias] = useState<Magic[]>([]);
  const {api} = useContext(ApiContext);

  useEffect(() => {
    if (api) {
      getMagics();
    }
  }, [api]);

  const getMagics = async () => {
    try {
      const response = await api.get('/Grimorio');

      let data: Magic[] = [];
      response.data.documents.forEach((d: any) => {
        let k = d.name.split(
          'projects/adventurer-s-companion-36c8c/databases/(default)/documents/Grimorio/',
        );

        data.push({
          Nome: d.fields.Nome.stringValue,
          Escola: d.fields.Escola.stringValue,
          Nivel: d.fields.Nivel.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => {
        if (a.Nome.toUpperCase() < b.Nome.toUpperCase()) {
          return -1;
        }
        if (a.Nome.toUpperCase() > b.Nome.toUpperCase()) {
          return 1;
        }
        // nomes iguais
        return 0;
      });
      setGrimorioMagias(data);
    } catch (response) {
      console.error('Erro em getCompanies via API:');
      console.error(response);
    }
  };

  const saveMagic = async (val: Magic) => {
    try {
      await api.post('/Grimorio/', {
        fields: {
          Nome: {stringValue: val.Nome},
          Escola: {stringValue: val.Escola},
          Nivel: {stringValue: val.Nivel},
        },
      });
      getMagics();
      return true;
    } catch (response) {
      console.error('Erro em saveMagic via API: ' + response);
      return false;
    }
  };

  const updateMagic = async (val: Magic) => {
    try {
      await api.patch('/Grimorio/' + val.uid, {
        fields: {
          Nome: {stringValue: val.Nome},
          Escola: {stringValue: val.Escola},
          Nivel: {stringValue: val.Nivel},
        },
      });
      getMagics();
      return true;
    } catch (response) {
      // console.error('Erro em updateMagic via API: ' + response);
      return false;
    }
  };

  const deleteMagic = async (val: Magic) => {
    try {
      await api.delete('/Grimorio/' + val);
      getMagics();
      return true;
    } catch (response) {
      console.error('Erro em deleteMagic via API: ' + response);
      return false;
    }
  };

  return (
    <GrimorioContext.Provider
      value={{
        GrimorioMagias,
        saveMagic,
        updateMagic,
        deleteMagic,
      }}>
      {children}
    </GrimorioContext.Provider>
  );
};
