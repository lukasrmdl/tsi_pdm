/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import {GrimorioContext} from '../../context/GrimorioProvider';
import SearchBar from '../../components/SearchBar';
import {FlatList, StyleSheet, View} from 'react-native';
import {COLORS} from '../../assets/images/colors';
import LogoutButton from '../../components/LogoutButton';

interface Grimorio {
  uid: string;
  Escola: string;
  Nivel: string;
  Nome: string;
}

interface Props {
  navigation: any;
}

const Grimorio: React.FC<Props> = ({navigation}) => {
  const {GrimorioMagias} = useContext(GrimorioContext);
  console.log('Magias:', GrimorioMagias);
  const [grimorioTemp, setGrimorioTemp] = useState<any[]>([]);

  console.log(GrimorioMagias, grimorioTemp);

  const filterByName = (text: string) => {
    if (text !== '') {
      const filteredGrimorio = GrimorioMagias?.filter((item: any) =>
        item.Nome.toLowerCase().includes(text.toLowerCase()),
      );
      setGrimorioTemp(filteredGrimorio || []);
    } else {
      setGrimorioTemp([]);
    }
  };

  const routeMagic = (value: any) => {
    navigation.dispatch(
      navigation.navigate({
        value,
      }),
    );
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

  const routeAddMagic = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Magia',
        params: {magic: null},
      }),
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar setSearch={filterByName} />
      <FlatList
        data={grimorioTemp.length > 0 ? grimorioTemp : GrimorioMagias}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeMagic(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton onClick={() => routeMagic(routeAddMagic)} />
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
