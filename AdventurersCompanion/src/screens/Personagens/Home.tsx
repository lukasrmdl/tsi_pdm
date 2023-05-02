import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/images/colors';
import LogoutButton from '../../components/LogoutButton';

const Personagens = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeftShown: false,
      title: 'Personagens',
      headerStyle: {backgroundColor: COLORS.primaryBlue},
      headerTitleStyle: {color: COLORS.primaryWhite},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textoMain}>Personagens</Text>
    </View>
  );
};

export default Personagens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoMain: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 10,
  },
});
