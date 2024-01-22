import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const TagWrapper = styled.View`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Tag = styled.View`
  padding: 4px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-self: flex-start;
  padding-left: 8px;
  padding-right: 12px;
`;

export const TagText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.white};
`;
