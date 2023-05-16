import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/images/colors';

type ItemProps = {
  item: {
    uid: string;
    Nome: string;
    Classe: string;
    Subclasse: string;
    Nivel: string;
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

const TextName = styled.Text`
  font-size: 24px;
  color: ${COLORS.primaryWhite};
`;
const TextInfoContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0px;
`;

const TextInfoClasse = styled.Text`
  font-size: 13px;
  color: ${COLORS.grey};
  text-align: justify;
`;
const TextInfoSubclasse = styled.Text`
  font-size: 13px;
  color: ${COLORS.grey};
  text-align: justify;
  margin-left: 10px;
`;
const TextInfoNivel = styled.Text`
  font-size: 13px;
  color: ${COLORS.grey};
  text-align: justify;
  margin-top: 5px;
`;

const Item = ({item, onPress}: ItemProps) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextName>{item.Nome}</TextName>
        <TextInfoContainer>
          <TextInfoClasse>Classe: {item.Classe} </TextInfoClasse>
          <TextInfoSubclasse>Subclasse: {item.Subclasse} </TextInfoSubclasse>
        </TextInfoContainer>
        <TextInfoNivel>Nível: {item.Nivel}</TextInfoNivel>
      </>
    </Button>
  );
};

export default Item;
