import styled from 'styled-components/native';
import {COLORS} from '../../assets/images/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.primaryWhite};
`;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
`;
