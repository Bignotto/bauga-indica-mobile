import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TextInput).attrs<TextInput>({
  //TODO: get color from theme
  placeholderTextColor: "#4A5568",
})`
  padding: 10px 12px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.shape};
  /* border-color: ${({ theme }) => theme.colors.text_disabled};
  border-width: 1px; */

  border-radius: 5px;
`;
