import React from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';

const ButtonExit = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  width: 45px;
  height: 45px;
`;

const LogoutButton = () => {
  const signOut = () => {
    Alert.alert('Saiu!');
  };
  return (
    <ButtonExit onPress={signOut} underlayColor="transparent">
      <Image
        source={require('../assets/images/exit.png')}
        accessibilityLabel="botão sair"
      />
    </ButtonExit>
  );
};

export default LogoutButton;
