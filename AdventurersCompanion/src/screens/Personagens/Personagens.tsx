/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../../assets/images/colors';
import LogoutButton from '../../components/LogoutButton';
import Item from './Item';
import {PersonagensContext} from '../../context/PersonagemProvider';
import {View, StyleSheet, FlatList} from 'react-native';
import AddFloatButton from '../../components/AddFloatButton';
import SearchBar from '../../components/SearchBar';

interface PersonagensProps {
  navigation: any;
}

interface Personagem {
  uid: string;
  Nome: string;
  Classe: string;
  Subclasse: string;
  Nivel: string;
}

const Personagens: React.FC<PersonagensProps> = ({navigation}) => {
  const {personagens} = useContext(PersonagensContext);
  const [personagensTemp, setPersonagensTemp] = useState<any[]>([]);

  console.log(personagens, personagensTemp);

  const filterByName = (text: string) => {
    if (text !== '') {
      const filteredEstudantes = personagens.filter((e: Personagem) =>
        e.Nome.toLowerCase().includes(text.toLowerCase()),
      );
      setPersonagensTemp(filteredEstudantes);
    } else {
      setPersonagensTemp([]);
    }
  };

  const routePersonagem = (value: any) => {
    navigation.navigate('Personagem', {
      value,
    });
  };

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
    <View style={styles.container}>
      <SearchBar setSearch={filterByName} />
      <FlatList
        data={personagensTemp.length > 0 ? personagensTemp : personagens}
        renderItem={({item}) => (
          <Item
            item={item}
            onPress={() => routePersonagem(item)}
            key={item.uid}
          />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routePersonagem(null)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default Personagens;
