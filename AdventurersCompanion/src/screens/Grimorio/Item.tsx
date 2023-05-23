import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/images/colors';

export interface ItemProps {
  item: {
    uid: string;
    Escola: string;
    Nome: string;
    Nivel: string;
  };
  onPress: () => void;
}

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 100px;
  background-color: ${COLORS.primaryWhite};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextNome = styled.Text`
  font-size: 24px;
  color: ${COLORS.primaryBlue};
`;
const TextInfoContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0px;
`;

const TextEscola = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${COLORS.primaryBlue};
`;
const TextNivel = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${COLORS.primaryBlue};
  margin-left: 10px;
`;
const Item = ({item, onPress}: ItemProps) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextNome>{item.Nome}</TextNome>
        <TextInfoContainer>
          <TextEscola>{item.Escola}</TextEscola>
          <TextNivel>{item.Nivel}</TextNivel>
        </TextInfoContainer>
      </>
    </Button>
  );
};

export default Item;
