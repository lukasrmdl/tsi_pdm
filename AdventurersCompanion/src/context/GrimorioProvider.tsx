/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ApiContext} from '../context/ApiProvider';

export interface Magia {
  uid: string;
  Escola: string;
  Nivel: string;
  Nome: string;
}

interface GrimorioContextProps {
  GrimorioMagias: any | null;
  saveMagic: (val: Magia) => Promise<boolean>;
  updateMagic: (val: Magia) => Promise<boolean>;
  deleteMagic: (val: string) => Promise<boolean>;
}

interface GrimorioProviderProps {
  children: React.ReactNode;
}

interface APIResponse {
  documents: {
    uid: string;
    fields: {
      Escola: {stringValue: string};
      Nivel: {stringValue: string};
      Nome: {stringValue: string};
    };
  }[];
}

export const GrimorioContext = createContext<GrimorioContextProps>({
  GrimorioMagias: null,
  saveMagic: async () => false,
  updateMagic: async () => false,
  deleteMagic: async () => false,
});

export const GrimorioProvider: React.FC<GrimorioProviderProps> = ({
  children,
}) => {
  const [GrimorioMagias, setGrimorio] = useState<Magia[] | null>(null);
  const {api} = useContext(ApiContext);

  useEffect(() => {
    if (api) {
      getMagics();
    }
  }, [api]);

  const getMagics = async () => {
    try {
      const response = await api?.get<APIResponse>('/Grimorio');
      let data: Magia[] = [];
      response?.data?.documents.forEach((d: APIResponse['documents'][0]) => {
        if (d.fields && d.fields.Escola && d.fields.Nivel && d.fields.Nome) {
          data.push({
            uid: d.uid,
            Escola: d.fields.Escola.stringValue,
            Nivel: d.fields.Nivel.stringValue,
            Nome: d.fields.Nome.stringValue,
          });
        }
      });
      data.sort((a: Magia, b: Magia) => {
        return a.Nome.toUpperCase().localeCompare(b.Nome.toUpperCase());
      });
      setGrimorio(data);
    } catch (response) {
      console.error('Erro em getMagics via API:');
      console.error(response);
    }
  };

  const saveMagic = async (val: Magia) => {
    try {
      await api?.post('/Grimorio/', {
        fields: {
          uid: {stringValue: val.uid},
          Escola: {stringValue: val.Escola},
          Nivel: {stringValue: val.Nivel},
          Nome: {stringValue: val.Nome},
        },
      });
      getMagics();
      return true;
    } catch (error) {
      console.error('Erro em saveMagic via API:', error);
      return false;
    }
  };

  const updateMagic = async (val: Magia) => {
    try {
      await api?.patch('/Grimorio/' + val.uid, {
        fields: {
          uid: {stringValue: val.uid},
          Escola: {stringValue: val.Escola},
          Nivel: {stringValue: val.Nivel},
          Nome: {stringValue: val.Nome},
        },
      });
      getMagics();
      return true;
    } catch (error) {
      console.error('Erro em updateMagic via API:', error);
      return false;
    }
  };

  const deleteMagic = async (val: string) => {
    try {
      await api?.delete('/Grimorio/' + val);
      getMagics();
      return true;
    } catch (error) {
      console.error('Erro em deleteMagic via API:', error);
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
