import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';

import {COLORS} from '../assets/images/colors';

interface DeleteProps {
  texto: string;
  onClick: () => void;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: COLORS.primaryBlue,
  },
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0',
    padding: 10,
    margin: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
  },
});

const DeleteButton = ({texto, onClick}: DeleteProps) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{texto}</Text>
    </TouchableHighlight>
  );
};
export default DeleteButton;
