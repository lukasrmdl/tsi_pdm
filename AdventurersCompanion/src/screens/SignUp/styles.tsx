import styled from 'styled-components/native';
import {COLORS} from '../../assets/images/colors';

export const Body = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 30px;
`;

export const TextInput = styled.TextInput`
  width: 85%;
  height: 50px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 13px;
`;

export const Text = styled.Text`
  font-size: 30px;
  margin-left: 25px;
  margin-right: 15px;
  margin-bottom: 45px;
  color: ${COLORS.primaryWhite};
  text-align: left;
  font-weight: bold;
`;
