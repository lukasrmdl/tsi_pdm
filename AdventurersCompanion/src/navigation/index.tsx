import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {PersonagemProvider} from '../context/PersonagemProvider';
import {UserProvider} from '../context/UserProvider';
import Navigator from './Navigator';

export default function Providers() {
  return (
    <AuthUserProvider>
      <UserProvider>
        <PersonagemProvider>
          <Navigator />
        </PersonagemProvider>
      </UserProvider>
    </AuthUserProvider>
  );
}
