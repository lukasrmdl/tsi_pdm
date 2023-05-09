/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {CommonActions} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../../assets/images/colors';
import LogoutButton from '../../components/LogoutButton';
import Item from './Item';
import {PersonagensContext} from '../../context/PersonagemProvider';
import {Container, FlatList} from './styles';

const Personagens = ({navigation}: {navigation: any}) => {
  const [data, setData] = useState([]);
  const {personagens} = useContext(PersonagensContext);

  useEffect(() => {
    setData(personagens);
  }, []);

  console.log(setData, personagens);

  const routePersonagens = ({item}: {item: any}) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Personagem',
        params: {personagem: item},
      }),
    );
  };
  const renderItem = ({item}: {item: any}) => (
    <Item item={item} onPress={() => routePersonagens(item)} />
  );
  const keyExtractor = (item: any, _index: number) => item.id.toString();

  useEffect(() => {
    navigation.setOptions({
      headerLeftShown: false,
      title: 'Personagens',
      headerStyle: {backgroundColor: COLORS.primaryBlue},
      headerTitleStyle: {color: COLORS.primaryWhite},
      headerRight: () => <LogoutButton />,
    });
  }, []);

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Container>
  );
};

export default Personagens;
