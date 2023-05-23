import React from 'react';
import {View, TextInput} from 'react-native';

export default function ({setSearch}: {setSearch: any}) {
  return (
    <View>
      <TextInput
        placeholder="Buscar por nome..."
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setSearch(t)}
      />
    </View>
  );
}
