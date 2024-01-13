import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const SearchInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => "#F9F9F9"};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.border};
  border-width: 1px;
  padding: 10px;
`;

export const InputWrapper = styled.View`
  flex: 1;
`;

export const InputComponent = styled.TextInput`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;
