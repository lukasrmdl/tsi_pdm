import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/images/colors';

type ItemProps = {
  item: {
    Nome: string;
    Classe: string;
    Subclasse: string;
    Nível: number;
  };
  onPress: () => void;
};

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 120px;
  background-color: ${COLORS.primaryBlue};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const Div = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
`;

const TextName = styled.Text`
  font-size: 24px;
  color: ${COLORS.primaryWhite};
`;

const TextInfo = styled.Text`
  font-size: 16px;
  color: ${COLORS.grey};
  text-align: justify;
`;

const Item = ({item, onPress}: ItemProps) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <TextName>{item.Nome}</TextName>
      <Div>
        <TextInfo>{item.Classe}</TextInfo>,<TextInfo>{item.Subclasse}</TextInfo>
        ,<TextInfo>{item.Nível}</TextInfo>,
      </Div>
    </Button>
  );
};

export default Item;
