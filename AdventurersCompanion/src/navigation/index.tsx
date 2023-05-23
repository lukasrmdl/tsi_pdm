import React from 'react';
import {ApiProvider} from '../context/ApiProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {PersonagemProvider} from '../context/PersonagemProvider';
import {UserProvider} from '../context/UserProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <UserProvider>
          <PersonagemProvider>
            <Navigator />
          </PersonagemProvider>
        </UserProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
