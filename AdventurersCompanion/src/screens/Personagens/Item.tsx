import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/images/colors';

type ItemProps = {
  item: {
    nome: string;
    classe: string;
    subclasse: string;
    nivel: number;
  };
  onPress: () => void;
};

const Button = styled.TouchableHighlight`
  background-color: ${COLORS.primaryBlue};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextName = styled.Text`
  font-size: 24px;
  color: ${COLORS.primaryWhite};
`;

const TextInfo = styled.Text`
  font-size: 16px;
  color: ${COLORS.grey};
`;

const Item = ({item, onPress}: ItemProps) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <TextName>{item.nome}</TextName>,<TextInfo>{item.classe}</TextInfo>,
      <TextInfo>{item.subclasse}</TextInfo>, <TextInfo>{item.nivel}</TextInfo>,
    </Button>
  );
};

export default Item;
