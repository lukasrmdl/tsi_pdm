import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';
import {COLORS} from '../assets/images/colors';

const PrimaryButton = (props: any) => {
  //console.log(props);
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
      <Text style={styles.text}>{props.texto}</Text>
    </TouchableHighlight>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: COLORS.primaryWhite,
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlue,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '90%',
    height: 55,
    justifyContent: 'center',
  },
});
