import styled from 'styled-components/native';
import {COLORS} from '../../assets/images/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 130px;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  border-bottom-color: ${COLORS.grey};
  border-bottom-width: 2px;
  font-size: 20px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 15px;
  text-align: center;
`;

export const Text = styled.Text`
  width: 95%;
  height: 26px;
  font-size: 16px;
  color: ${COLORS.primaryBlue};
  border: 0px solid ${COLORS.grey};
  border-bottom-width: 2px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
