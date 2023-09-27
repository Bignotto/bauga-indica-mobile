import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View``;

export const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
`;

export const InputComponent = styled(TextInput).attrs<TextInput>({
  //TODO: get color from theme
  placeholderTextColor: "#4A5568",
})`
  padding: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme }) => theme.colors.text};
  /* border-color: ${({ theme }) => theme.colors.text_disabled};
  border-width: 1px; */
`;
