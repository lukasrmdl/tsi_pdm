import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/images/colors';

const Button = styled.TouchableOpacity`
  border-width: 0px;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 13px;
  right: 10px;
  background-color: ${COLORS.accentBlue};
  border-radius: 100px;
`;

const AddFloatButton = ({onClick}: {onClick: any}) => {
  return (
    <Button onPress={() => onClick()}>
      <Icon name="add" size={30} color={COLORS.primaryWhite} />
    </Button>
  );
};
export default AddFloatButton;
