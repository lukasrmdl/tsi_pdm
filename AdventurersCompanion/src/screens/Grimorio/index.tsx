/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {COLORS} from '../../assets/images/colors';
import LogoutButton from '../../components/LogoutButton';
import Item from './Item';
import {GrimorioContext} from '../../context/GrimorioProvider';
import {View, StyleSheet, FlatList} from 'react-native';
import AddFloatButton from '../../components/AddFloatButton';
import SearchBar from '../../components/SearchBar';

interface GrimorioProps {
  navigation: any;
}

interface Grimorio {
  uid: string;
  Nome: string;
  Classe: string;
  Subclasse: string;
  Nivel: string;
}

const Grimorio: React.FC<GrimorioProps> = ({navigation}) => {
  const {GrimorioMagias} = useContext(GrimorioContext);
  const [GrimorioTemp, setGrimorioTemp] = useState<any[]>([]);

  console.log(GrimorioMagias, GrimorioTemp);

  const filterByName = (text: string) => {
    if (text !== '') {
      const filteredGrimorio = GrimorioMagias.filter((e: Grimorio) =>
        e.Nome.toLowerCase().includes(text.toLowerCase()),
      );
      setGrimorioTemp(filteredGrimorio);
    } else {
      setGrimorioTemp([]);
    }
  };

  const routeGrimorio = (value: any) => {
    navigation.navigate('Magia', {
      value,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeftShown: false,
      title: 'Grimorio',
      headerStyle: {backgroundColor: COLORS.primaryBlue},
      headerTitleStyle: {color: COLORS.primaryWhite},
      headerRight: () => <LogoutButton />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar setSearch={filterByName} />
      <FlatList
        data={GrimorioTemp.length > 0 ? GrimorioTemp : GrimorioMagias}
        renderItem={({item}) => (
          <Item
            item={item}
            onPress={() => routeGrimorio(item)}
            key={item.uid}
          />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routeGrimorio(null)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});

export default Grimorio;
