import React from 'react';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {PersonagemProvider} from '../context/PersonagemProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <PersonagemProvider>
        <Routes />
      </PersonagemProvider>
    </AuthUserProvider>
  );
}
